use std::str::FromStr;

use bencher_json::{
    project::{
        alert::{JsonAlert, JsonSide},
        benchmark::JsonBenchmarkMetric,
    },
    JsonBenchmark,
};
use diesel::{ExpressionMethods, Insertable, QueryDsl, Queryable, RunQueryDsl};
use uuid::Uuid;

use super::QueryThreshold;
use crate::{
    context::DbConnection,
    error::api_error,
    model::project::{
        benchmark::QueryBenchmark, metric::QueryMetric, perf::QueryPerf, report::QueryReport,
    },
    schema,
    schema::alert as alert_table,
    util::query::fn_get_id,
    ApiError,
};

#[derive(Queryable)]
pub struct QueryAlert {
    pub id: i32,
    pub uuid: String,
    pub perf_id: i32,
    pub threshold_id: i32,
    pub statistic_id: i32,
    pub side: bool,
    pub boundary: f32,
    pub outlier: f32,
}

impl QueryAlert {
    fn_get_id!(alert);

    pub fn get_uuid(conn: &mut DbConnection, id: i32) -> Result<Uuid, ApiError> {
        let uuid: String = schema::alert::table
            .filter(schema::alert::id.eq(id))
            .select(schema::alert::uuid)
            .first(conn)
            .map_err(api_error!())?;
        Uuid::from_str(&uuid).map_err(api_error!())
    }

    pub fn into_json(self, conn: &mut DbConnection) -> Result<JsonAlert, ApiError> {
        let Self {
            uuid,
            perf_id,
            threshold_id,
            statistic_id,
            side,
            boundary,
            outlier,
            ..
        } = self;

        let perf = QueryPerf::get(conn, perf_id)?;
        let mut threshold = QueryThreshold::get(conn, threshold_id)?;
        // IMPORTANT: Set the statistic ID to the one from the alert, and not the current value!
        threshold.statistic_id = statistic_id;

        Ok(JsonAlert {
            uuid: Uuid::from_str(&uuid).map_err(api_error!())?,
            report: QueryReport::get_uuid(conn, perf.report_id)?,
            iteration: perf.iteration as u32,
            benchmark: get_benchmark_metric(
                conn,
                perf.id,
                threshold.metric_kind_id,
                perf.benchmark_id,
            )?,
            threshold: threshold.into_json(conn)?,
            side: Side::from(side).into(),
            boundary: boundary.into(),
            outlier: outlier.into(),
        })
    }
}

fn get_benchmark_metric(
    conn: &mut DbConnection,
    perf_id: i32,
    metric_kind_id: i32,
    benchmark_id: i32,
) -> Result<JsonBenchmarkMetric, ApiError> {
    let json_benchmark = schema::benchmark::table
        .filter(schema::benchmark::id.eq(benchmark_id))
        .first::<QueryBenchmark>(conn)
        .map_err(api_error!())?
        .into_json(conn)?;
    let JsonBenchmark {
        uuid,
        project,
        name,
    } = json_benchmark;

    let metric = schema::metric::table
        .filter(schema::metric::perf_id.eq(perf_id))
        .filter(schema::metric::metric_kind_id.eq(metric_kind_id))
        .first::<QueryMetric>(conn)
        .map_err(api_error!())?
        .into_json();

    Ok(JsonBenchmarkMetric {
        uuid,
        project,
        name,
        metric,
    })
}

pub enum Side {
    Left = 0,
    Right = 1,
}

impl From<bool> for Side {
    fn from(side: bool) -> Self {
        if side {
            Self::Right
        } else {
            Self::Left
        }
    }
}

impl From<Side> for bool {
    fn from(side: Side) -> Self {
        match side {
            Side::Left => false,
            Side::Right => true,
        }
    }
}

impl From<Side> for JsonSide {
    fn from(side: Side) -> Self {
        match side {
            Side::Left => Self::Left,
            Side::Right => Self::Right,
        }
    }
}

#[derive(Insertable)]
#[diesel(table_name = alert_table)]
pub struct InsertAlert {
    pub uuid: String,
    pub perf_id: i32,
    pub threshold_id: i32,
    pub statistic_id: i32,
    pub side: bool,
    pub boundary: f32,
    pub outlier: f32,
}
