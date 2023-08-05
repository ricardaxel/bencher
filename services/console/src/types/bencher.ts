/*
 Generated by typeshare 1.6.0
*/

export type BenchmarkName = string;

export type Boundary = number;

export type BranchName = string;

export type Email = string;

export type GitHash = string;

export type Jwt = string;

export type NonEmpty = string;

export type ResourceId = string;

export type SampleSize = number;

export type Secret = string;

export type Slug = string;

export type Url = string;

export type UserName = string;

export interface JsonMetricKind {
	uuid: string;
	project: string;
	name: NonEmpty;
	slug: Slug;
	units: NonEmpty;
	created: string;
	modified: string;
}

export interface JsonBranch {
	uuid: string;
	project: string;
	name: BranchName;
	slug: Slug;
	created: string;
	modified: string;
}

export interface JsonTestbed {
	uuid: string;
	project: string;
	name: NonEmpty;
	slug: Slug;
	created: string;
	modified: string;
}

export enum JsonStatisticKind {
	Z = "z",
	T = "t",
}

export interface JsonStatistic {
	uuid: string;
	threshold: string;
	test: JsonStatisticKind;
	min_sample_size?: SampleSize;
	max_sample_size?: SampleSize;
	window?: number;
	lower_boundary?: Boundary;
	upper_boundary?: Boundary;
	created: string;
}

export interface JsonThreshold {
	uuid: string;
	project: string;
	metric_kind: JsonMetricKind;
	branch: JsonBranch;
	testbed: JsonTestbed;
	statistic: JsonStatistic;
	created: string;
	modified: string;
}

export interface JsonMetric {
	value: number;
	lower_bound?: number;
	upper_bound?: number;
}

export interface JsonBoundary {
	lower_limit?: number;
	upper_limit?: number;
}

export interface JsonBenchmarkMetric {
	uuid: string;
	project: string;
	name: BenchmarkName;
	slug: Slug;
	metric: JsonMetric;
	boundary: JsonBoundary;
	created: string;
	modified: string;
}

export enum JsonLimit {
	Lower = "lower",
	Upper = "upper",
}

export enum JsonAlertStatus {
	Active = "active",
	Dismissed = "dismissed",
}

export interface JsonAlert {
	uuid: string;
	report: string;
	iteration: number;
	threshold: JsonThreshold;
	benchmark: JsonBenchmarkMetric;
	limit: JsonLimit;
	status: JsonAlertStatus;
	modified: string;
}

export interface JsonAlertStats {
	active: number;
}

export interface JsonUpdateAlert {
	status?: JsonAlertStatus;
}

export interface JsonPerfAlert {
	uuid: string;
	limit: JsonLimit;
	status: JsonAlertStatus;
	modified: string;
}

export interface JsonBenchmark {
	uuid: string;
	project: string;
	name: BenchmarkName;
	slug: Slug;
	created: string;
	modified: string;
}

export interface JsonVersion {
	number: number;
	hash?: GitHash;
}

export enum JsonVisibility {
	Public = "public",
	Private = "private",
}

export interface JsonProject {
	uuid: string;
	organization: string;
	name: NonEmpty;
	slug: Slug;
	url?: Url;
	visibility: JsonVisibility;
	created: string;
	modified: string;
}

export interface JsonThresholdStatistic {
	uuid: string;
	project: string;
	statistic: JsonStatistic;
	created: string;
}

export interface JsonPerfMetric {
	report: string;
	iteration: number;
	start_time: string;
	end_time: string;
	version: JsonVersion;
	threshold?: JsonThresholdStatistic;
	metric: JsonMetric;
	boundary: JsonBoundary;
	alert?: JsonPerfAlert;
}

export interface JsonPerfMetrics {
	branch: JsonBranch;
	testbed: JsonTestbed;
	benchmark: JsonBenchmark;
	metrics: JsonPerfMetric[];
}

export interface JsonPerf {
	project: JsonProject;
	metric_kind: JsonMetricKind;
	start_time?: string;
	end_time?: string;
	results: JsonPerfMetrics[];
}

export enum PlanLevel {
	Free = "free",
	Team = "team",
	Enterprise = "enterprise",
}

export interface JsonSignup {
	name: UserName;
	slug?: Slug;
	email: Email;
	plan?: PlanLevel;
	invite?: Jwt;
}

export interface JsonLogin {
	email: Email;
	plan?: PlanLevel;
	invite?: Jwt;
}

export interface JsonAuthToken {
	token: Jwt;
}

export interface JsonUser {
	uuid: string;
	name: UserName;
	slug: Slug;
	email: Email;
	admin: boolean;
	locked: boolean;
}

export interface JsonAuthUser {
	user: JsonUser;
	token: Jwt;
}

export enum PlanStatus {
	Active = "active",
	Canceled = "canceled",
	Incomplete = "incomplete",
	IncompleteExpired = "incomplete_expired",
	PastDue = "past_due",
	Paused = "paused",
	Trialing = "trialing",
	Unpaid = "unpaid",
}

