#![feature(test)]

use std::{
    fs::File,
    io::{BufRead, BufReader, Write},
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
};

use bencher_adapter::{AdapterResults, JsonMetric};

extern crate test;

#[derive(Debug)]
pub struct EBpfBenchmark {
    pub name: &'static str,
    pub benchmark_fn: fn() -> f64,
}

inventory::collect!(EBpfBenchmark);

fn basic_benchmark() -> f64 {
    use tokio::runtime::Runtime;

    // Create the runtime
    let rt = Runtime::new().unwrap();

    let mut shutdown = Arc::new(AtomicBool::new(false));
    let ebpf_shutdown = shutdown.clone();
    let process = rt.block_on(async { ebpf::run("ens160", ebpf_shutdown).await.unwrap() });

    // Generate some network traffic
    // IRL this should probably be mocked
    let body = rt.block_on(async { reqwest::get("https://bencher.dev").await.unwrap() });

    let fd_info =
        std::fs::File::open(format!("/proc/{}/fdinfo/{}", process.pid, process.prog_fd)).unwrap();

    let reader = BufReader::new(fd_info);

    let mut run_time_ns = None;
    let mut run_ctn = None;
    for line in reader.lines().flatten() {
        if let Some(l) = line.strip_prefix("run_time_ns:") {
            run_time_ns = l.trim().parse::<u64>().ok();
        } else if let Some(l) = line.strip_prefix("run_cnt:") {
            run_ctn = l.trim().parse::<u64>().ok();
        }
    }

    shutdown.store(true, Ordering::Relaxed);

    if let (Some(run_time_ns), Some(run_ctn)) = (run_time_ns, run_ctn) {
        if run_ctn != 0 {
            return run_time_ns as f64 / run_ctn as f64;
        }
    }

    0.0
}

inventory::submit!(EBpfBenchmark {
    name: "basic",
    benchmark_fn: basic_benchmark
});

// From the root of the repo:
// `cargo xtask build-ebpf --release`
// Enable stats
// `sudo sysctl -w kernel.bpf_stats_enabled=1`
// From within the `ebpf` directory:
// `RUST_LOG=trace sudo -E $(which cargo) +nightly bench`
fn main() {
    let mut results = Vec::new();

    for benchmark in inventory::iter::<EBpfBenchmark> {
        let benchmark_name = benchmark.name.parse().unwrap();
        let json_metric = JsonMetric::new((benchmark.benchmark_fn)(), None, None);
        results.push((benchmark_name, json_metric));
    }

    let adapter_results = AdapterResults::new_latency(results).unwrap();
    let adapter_results_str = serde_json::to_string_pretty(&adapter_results).unwrap();
    println!("{}", adapter_results_str);

    // write to file
    // use the --file flag for the bencher CLI command
    let mut file = File::create("../target/results.json").unwrap();
    file.write_all(adapter_results_str.as_bytes()).unwrap();
}