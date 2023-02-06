use nom::IResult;

pub mod c_sharp;
pub mod cpp;
pub mod go;
pub mod java;
pub mod js;
pub mod json;
pub mod magic;
pub mod python;
pub mod ruby;
pub mod rust;
mod util;

#[allow(dead_code, clippy::print_stdout, clippy::unnecessary_wraps)]
fn print_ln(input: &str) -> IResult<&str, ()> {
    println!("--- START ---");
    println!("{input}");
    println!("---  END  ---");
    Ok((input, ()))
}

#[cfg(test)]
pub(crate) mod test_util {
    use bencher_json::project::metric_kind::{LATENCY_SLUG_STR, THROUGHPUT_SLUG_STR};
    use ordered_float::OrderedFloat;
    use pretty_assertions::assert_eq;

    use crate::{
        results::{adapter_metrics::AdapterMetrics, adapter_results::AdapterResults},
        Adapter,
    };

    pub fn convert_file_path<A>(file_path: &str) -> AdapterResults
    where
        A: Adapter,
    {
        opt_convert_file_path::<A>(file_path)
            .unwrap_or_else(|| panic!("Failed to convert contents of {file_path}"))
    }

    pub fn opt_convert_file_path<A>(file_path: &str) -> Option<AdapterResults>
    where
        A: Adapter,
    {
        let contents = std::fs::read_to_string(file_path)
            .unwrap_or_else(|e| panic!("Failed to read test file {file_path}: {e}"));
        A::parse(&contents)
    }

    pub fn validate_latency(
        metrics: &AdapterMetrics,
        value: f64,
        lower_bound: Option<f64>,
        upper_bound: Option<f64>,
    ) {
        validate_metric(metrics, LATENCY_SLUG_STR, value, lower_bound, upper_bound);
    }

    pub fn validate_throughput(
        metrics: &AdapterMetrics,
        value: f64,
        lower_bound: Option<f64>,
        upper_bound: Option<f64>,
    ) {
        validate_metric(
            metrics,
            THROUGHPUT_SLUG_STR,
            value,
            lower_bound,
            upper_bound,
        );
    }

    pub fn validate_metric(
        metrics: &AdapterMetrics,
        key: &str,
        value: f64,
        lower_bound: Option<f64>,
        upper_bound: Option<f64>,
    ) {
        assert_eq!(metrics.inner.len(), 1);
        let metric = metrics.get(key).unwrap();
        assert_eq!(metric.value, OrderedFloat::from(value));
        assert_eq!(metric.lower_bound, lower_bound.map(OrderedFloat::from));
        assert_eq!(metric.upper_bound, upper_bound.map(OrderedFloat::from));
    }
}
