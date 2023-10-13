use bencher_json::{
    project::threshold::{JsonNewStatistic, JsonStatistic, StatisticKind},
    Boundary, DateTime, SampleSize, StatisticUuid, ThresholdUuid,
};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl};

use crate::{
    context::DbConnection,
    schema,
    schema::statistic as statistic_table,
    util::{
        map_u32,
        query::{fn_get, fn_get_id, fn_get_uuid},
    },
    ApiError,
};

use super::{QueryThreshold, ThresholdId};

crate::util::typed_id::typed_id!(StatisticId);

#[derive(Debug, Clone, diesel::Queryable, diesel::Selectable)]
#[diesel(table_name = statistic_table)]
pub struct QueryStatistic {
    pub id: StatisticId,
    pub uuid: StatisticUuid,
    pub threshold_id: ThresholdId,
    pub test: StatisticKind,
    pub min_sample_size: Option<SampleSize>,
    pub max_sample_size: Option<SampleSize>,
    pub window: Option<i64>,
    pub lower_boundary: Option<Boundary>,
    pub upper_boundary: Option<Boundary>,
    pub created: DateTime,
}

impl QueryStatistic {
    fn_get!(statistic, StatisticId);
    fn_get_id!(statistic, StatisticId, StatisticUuid);
    fn_get_uuid!(statistic, StatisticId, StatisticUuid);

    pub fn into_json(self, conn: &mut DbConnection) -> Result<JsonStatistic, ApiError> {
        let threshold = QueryThreshold::get_uuid(conn, self.threshold_id)?;
        self.into_json_for_threshold(threshold)
    }

    pub fn into_json_for_threshold(
        self,
        threshold: ThresholdUuid,
    ) -> Result<JsonStatistic, ApiError> {
        let Self {
            uuid,
            test,
            min_sample_size,
            max_sample_size,
            window,
            lower_boundary,
            upper_boundary,
            created,
            ..
        } = self;
        Ok(JsonStatistic {
            uuid,
            threshold,
            test,
            min_sample_size,
            max_sample_size,
            window: map_u32(window)?,
            lower_boundary,
            upper_boundary,
            created,
        })
    }
}

#[derive(diesel::Insertable)]
#[diesel(table_name = statistic_table)]
pub struct InsertStatistic {
    pub uuid: StatisticUuid,
    pub threshold_id: ThresholdId,
    pub test: StatisticKind,
    pub min_sample_size: Option<SampleSize>,
    pub max_sample_size: Option<SampleSize>,
    pub window: Option<i64>,
    pub lower_boundary: Option<Boundary>,
    pub upper_boundary: Option<Boundary>,
    pub created: DateTime,
}

impl From<QueryStatistic> for InsertStatistic {
    fn from(query_statistic: QueryStatistic) -> Self {
        let QueryStatistic {
            threshold_id,
            test,
            min_sample_size,
            max_sample_size,
            window,
            lower_boundary,
            upper_boundary,
            created,
            ..
        } = query_statistic;
        Self {
            uuid: StatisticUuid::new(),
            threshold_id,
            test,
            min_sample_size,
            max_sample_size,
            window,
            lower_boundary,
            upper_boundary,
            created,
        }
    }
}

impl InsertStatistic {
    pub fn from_json(
        threshold_id: ThresholdId,
        json_statistic: JsonNewStatistic,
    ) -> Result<Self, ApiError> {
        let JsonNewStatistic {
            test,
            min_sample_size,
            max_sample_size,
            window,
            lower_boundary,
            upper_boundary,
        } = json_statistic;
        Ok(Self {
            uuid: StatisticUuid::new(),
            threshold_id,
            test,
            min_sample_size,
            max_sample_size,
            window: window.map(Into::into),
            lower_boundary,
            upper_boundary,
            created: DateTime::now(),
        })
    }
}
