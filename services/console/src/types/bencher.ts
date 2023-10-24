/*
 Generated by typeshare 1.6.0
*/

export type VersionNumber = number;

export type Iteration = number;

export type NonEmpty = string;

export type Slug = string;

export type DateTime = string;

export interface JsonMetricKind {
	uuid: Uuid;
	project: Uuid;
	name: NonEmpty;
	slug: Slug;
	units: NonEmpty;
	created: string;
	modified: string;
}

export enum StatisticKind {
	Z = "z",
	T = "t",
}

export type SampleSize = number;

export type Window = number;

export type Boundary = number;

export interface JsonStatistic {
	uuid: Uuid;
	threshold: Uuid;
	test: StatisticKind;
	min_sample_size?: SampleSize;
	max_sample_size?: SampleSize;
	window?: Window;
	lower_boundary?: Boundary;
	upper_boundary?: Boundary;
	created: string;
}

export interface JsonThresholdStatistic {
	uuid: Uuid;
	project: Uuid;
	statistic: JsonStatistic;
	created: string;
}

export type BenchmarkName = string;

export interface JsonMetric {
	value: number;
	lower_value?: number;
	upper_value?: number;
}

export interface JsonBoundary {
	lower_limit?: number;
	upper_limit?: number;
}

export interface JsonBenchmarkMetric {
	uuid: Uuid;
	project: Uuid;
	name: BenchmarkName;
	slug: Slug;
	metric: JsonMetric;
	boundary: JsonBoundary;
	created: string;
	modified: string;
}

export interface JsonReportResult {
	metric_kind: JsonMetricKind;
	threshold?: JsonThresholdStatistic;
	benchmarks: JsonBenchmarkMetric[];
}

export type JsonReportIteration = JsonReportResult[];

export type JsonReportResults = JsonReportIteration[];

export type BranchName = string;

export interface JsonBranch {
	uuid: Uuid;
	project: Uuid;
	name: BranchName;
	slug: Slug;
	created: string;
	modified: string;
}

export interface JsonTestbed {
	uuid: Uuid;
	project: Uuid;
	name: NonEmpty;
	slug: Slug;
	created: string;
	modified: string;
}

export interface JsonThreshold {
	uuid: Uuid;
	project: Uuid;
	metric_kind: JsonMetricKind;
	branch: JsonBranch;
	testbed: JsonTestbed;
	statistic: JsonStatistic;
	created: string;
	modified: string;
}

export enum BoundaryLimit {
	Lower = "lower",
	Upper = "upper",
}

export enum AlertStatus {
	Active = "active",
	Dismissed = "dismissed",
}

export interface JsonAlert {
	uuid: Uuid;
	report: Uuid;
	iteration: Iteration;
	threshold: JsonThreshold;
	benchmark: JsonBenchmarkMetric;
	limit: BoundaryLimit;
	status: AlertStatus;
	modified: string;
}

export type JsonReportAlerts = JsonAlert[];

export type Uuid = string;

export type DateTimeMillis = number;

export type Email = string;

export type GitHash = string;

export type Jwt = string;

export type CardCvc = string;

export type Entitlements = number;

export type LastFour = string;

export type ExpirationMonth = number;

export type CardNumber = string;

export type MeteredPlanId = string;

export type LicensedPlanId = string;

export type ExpirationYear = number;

export type ResourceId = string;

export type Secret = string;

export type Url = string;

export type UserName = string;

export interface JsonOrganization {
	uuid: Uuid;
	name: NonEmpty;
	slug: Slug;
	license?: Jwt;
	created: string;
	modified: string;
}

export interface JsonCard {
	number: CardNumber;
	exp_month: ExpirationMonth;
	exp_year: ExpirationYear;
	cvc: CardCvc;
}

export enum PlanLevel {
	Free = "free",
	Team = "team",
	Enterprise = "enterprise",
}

export interface JsonNewPlan {
	card: JsonCard;
	level: PlanLevel;
	entitlements?: Entitlements;
	organization?: Uuid;
}

export interface JsonCustomer {
	uuid: Uuid;
	name: UserName;
	email: Email;
}

export enum CardBrand {
	Amex = "amex",
	Diners = "diners",
	Discover = "discover",
	Jcb = "jcb",
	Mastercard = "mastercard",
	Unionpay = "unionpay",
	Visa = "visa",
	Unknown = "unknown",
}

export interface JsonCardDetails {
	brand: CardBrand;
	last_four: LastFour;
	exp_month: ExpirationMonth;
	exp_year: ExpirationYear;
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

export interface JsonLicense {
	key: Jwt;
	organization: Uuid;
	entitlements: Entitlements;
	issued_at: string;
	expiration: string;
	self_hosted: boolean;
}

export interface JsonPlan {
	organization: Uuid;
	customer: JsonCustomer;
	card: JsonCardDetails;
	level: PlanLevel;
	unit_amount: number;
	current_period_start: string;
	current_period_end: string;
	status: PlanStatus;
	license?: JsonLicense;
}

export enum UsageKind {
	CloudFree = "cloud_free",
	SelfHostedFree = "self_hosted_free",
	CloudMetered = "cloud_metered",
	CloudLicensed = "cloud_licensed",
	SelfHostedLicensedCloud = "self_hosted_licensed_cloud",
	SelfHostedLicensed = "self_hosted_licensed",
}

export interface JsonUsage {
	organization: Uuid;
	kind: UsageKind;
	plan?: JsonPlan;
	license?: JsonLicense;
	start_time: string;
	end_time: string;
	usage?: number;
}

export interface JsonAlertStats {
	active: number;
}

export interface JsonUpdateAlert {
	status?: AlertStatus;
}

export interface JsonPerfAlert {
	uuid: Uuid;
	limit: BoundaryLimit;
	status: AlertStatus;
	modified: string;
}

export interface JsonBenchmark {
	uuid: Uuid;
	project: Uuid;
	name: BenchmarkName;
	slug: Slug;
	created: string;
	modified: string;
}

export interface JsonVersion {
	number: VersionNumber;
	hash?: GitHash;
}

export interface JsonBranchVersion {
	uuid: Uuid;
	project: Uuid;
	name: BranchName;
	slug: Slug;
	version: JsonVersion;
	created: string;
	modified: string;
}

export enum Visibility {
	Public = "public",
	Private = "private",
}

export interface JsonProject {
	uuid: Uuid;
	organization: Uuid;
	name: NonEmpty;
	slug: Slug;
	url?: Url;
	visibility: Visibility;
	created: string;
	modified: string;
}

export interface JsonPerfMetric {
	report: Uuid;
	iteration: Iteration;
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

export interface JsonUser {
	uuid: Uuid;
	name: UserName;
	slug: Slug;
	email: Email;
	admin: boolean;
	locked: boolean;
}

export enum Adapter {
	Magic = "magic",
	Json = "json",
	Rust = "rust",
	RustBench = "rust_bench",
	RustCriterion = "rust_criterion",
	RustIai = "rust_iai",
	Cpp = "cpp",
	CppGoogle = "cpp_google",
	CppCatch2 = "cpp_catch2",
	Go = "go",
	GoBench = "go_bench",
	Java = "java",
	JavaJmh = "java_jmh",
	CSharp = "c_sharp",
	CSharpDotNet = "c_sharp_dot_net",
	Js = "js",
	JsBenchmark = "js_benchmark",
	JsTime = "js_time",
	Python = "python",
	PythonAsv = "python_asv",
	PythonPytest = "python_pytest",
	Ruby = "ruby",
	RubyBenchmark = "ruby_benchmark",
}

export interface JsonReport {
	uuid: Uuid;
	user: JsonUser;
	project: JsonProject;
	branch: JsonBranchVersion;
	testbed: JsonTestbed;
	start_time: string;
	end_time: string;
	adapter: Adapter;
	results: JsonReportResults;
	alerts: JsonReportAlerts;
	created: string;
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

export interface JsonAuthUser {
	user: JsonUser;
	token: Jwt;
}

export interface JsonToken {
	uuid: Uuid;
	user: Uuid;
	name: NonEmpty;
	token: Jwt;
	creation: string;
	expiration: string;
}

export enum OrganizationPermission {
	View = "view",
	Create = "create",
	Edit = "edit",
	Delete = "delete",
	Manage = "manage",
	ViewRole = "view_role",
	CreateRole = "create_role",
	EditRole = "edit_role",
	DeleteRole = "delete_role",
}

export enum ProjectPermission {
	View = "view",
	Create = "create",
	Edit = "edit",
	Delete = "delete",
	Manage = "manage",
	ViewRole = "view_role",
	CreateRole = "create_role",
	EditRole = "edit_role",
	DeleteRole = "delete_role",
}

