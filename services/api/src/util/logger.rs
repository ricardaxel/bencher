use slog::{Drain, Logger};

pub fn bootstrap_logger() -> Logger {
    let decorator = slog_term::TermDecorator::new().build();
    let drain = slog_term::FullFormat::new(decorator).build();
    let drain = std::sync::Mutex::new(drain).fuse();
    Logger::root(drain, slog::o!())
}
