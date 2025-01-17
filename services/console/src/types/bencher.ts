/*
 Generated by typeshare 1.7.0
*/

export type VersionNumber = number;

export type BenchmarkName = string;

export type NameId = string;

export type MeasureNameId = NameId;

export interface JsonMetric {
	value: number;
	lower_value?: number;
	upper_value?: number;
}

export type JsonMetricsMap = Record<MeasureNameId, JsonMetric>;

export type JsonResultsMap = Record<BenchmarkName, JsonMetricsMap>;

export type Iteration = number;

export type ResourceName = string;

export type Slug = string;

export type DateTime = string;

export interface JsonMeasure {
	uuid: Uuid;
	project: Uuid;
	name: ResourceName;
	slug: Slug;
	units: ResourceName;
	created: string;
	modified: string;
}

export enum ModelTest {
	Static = "static",
	Percentage = "percentage",
	ZScore = "z_score",
	TTest = "t_test",
	LogNormal = "log_normal",
	Iqr = "iqr",
	DeltaIqr = "delta_iqr",
}

export type SampleSize = number;

export type Window = number;

export type Boundary = number;

export interface JsonModel {
	uuid: ModelUuid;
	threshold: Uuid;
	test: ModelTest;
	min_sample_size?: SampleSize;
	max_sample_size?: SampleSize;
	window?: Window;
	lower_boundary?: Boundary;
	upper_boundary?: Boundary;
	created: string;
	replaced?: string;
}

export interface JsonThresholdModel {
	uuid: Uuid;
	project: Uuid;
	statistic?: JsonModel;
	model: JsonModel;
	created: string;
}

export interface JsonBoundary {
	baseline?: number;
	lower_limit?: number;
	upper_limit?: number;
}

export interface JsonBenchmarkMetric {
	uuid: Uuid;
	project: Uuid;
	name: BenchmarkName;
	slug: Slug;
	metric: JsonMetric;
	boundary?: JsonBoundary;
	created: string;
	modified: string;
}

export interface JsonReportResult {
	iteration: Iteration;
	measure: JsonMeasure;
	threshold?: JsonThresholdModel;
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
	start_point?: JsonStartPoint;
	created: string;
	modified: string;
}

export interface JsonTestbed {
	uuid: Uuid;
	project: Uuid;
	name: ResourceName;
	slug: Slug;
	created: string;
	modified: string;
}

export interface JsonThreshold {
	uuid: Uuid;
	project: Uuid;
	branch: JsonBranch;
	testbed: JsonTestbed;
	measure: JsonMeasure;
	statistic?: JsonModel;
	model: JsonModel;
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
	created: string;
	modified: string;
}

export type JsonReportAlerts = JsonAlert[];

export type Uuid = string;

export type DateTimeMillis = number;

export type Email = string;

export type GitHash = string;

export type Index = number;

export type Jwt = string;

export type NonEmpty = string;

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

export enum OrganizationRole {
	/** The organization leader role. */
	Leader = "leader",
}

export interface JsonNewMember {
	/** The user name for the invitee. */
	name?: UserName;
	/**
	 * The email for the invitee.
	 * This will be used to both send the invite
	 * and to create the user account if they do not exist.
	 */
	email: Email;
	/** The organization role for the invitee. */
	role: OrganizationRole;
}

export interface JsonOrganization {
	uuid: Uuid;
	name: ResourceName;
	slug: Slug;
	license?: Jwt;
	created: string;
	modified: string;
}

export enum PlanLevel {
	Free = "free",
	Team = "team",
	Enterprise = "enterprise",
}

export interface JsonNewPlan {
	checkout: NonEmpty;
	level: PlanLevel;
	entitlements?: Entitlements;
	self_hosted?: Uuid;
	remote?: boolean;
}

export interface JsonCustomer {
	uuid: Uuid;
	name: NonEmpty;
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
	level: PlanLevel;
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
	/** Bencher Cloud (Free) */
	CloudFree = "cloud_free",
	/** Bencher Cloud (Metered) */
	CloudMetered = "cloud_metered",
	/** Bencher Cloud (Licensed) */
	CloudLicensed = "cloud_licensed",
	/** Bencher Self-Hosted (Licensed) via Bencher Cloud */
	CloudSelfHostedLicensed = "cloud_self_hosted_licensed",
	/** Bencher Self-Hosted (Free) */
	SelfHostedFree = "self_hosted_free",
	/** Bencher Self-Hosted (Licensed) */
	SelfHostedLicensed = "self_hosted_licensed",
}

export interface JsonUsage {
	/** The organization UUID. */
	organization: Uuid;
	/** The kind of usage. */
	kind: UsageKind;
	/** The organization plan. */
	plan?: JsonPlan;
	/** The organization license. */
	license?: JsonLicense;
	/** The start time of the usage. */
	start_time: string;
	/** The end time of the usage. */
	end_time: string;
	/** The metrics usage amount. */
	usage?: number;
}

export interface JsonAlertStats {
	active: number;
}

export interface JsonUpdateAlert {
	/** The new status of the alert. */
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
	start_point?: JsonStartPoint;
	created: string;
	modified: string;
}

export enum Visibility {
	Public = "public",
	Private = "private",
}

export interface JsonNewProject {
	/**
	 * The name of the project.
	 * Maximum length is 64 characters.
	 */
	name: ResourceName;
	/**
	 * The preferred slug for the project.
	 * If not provided, the slug will be generated from the name.
	 * If the provided or generated slug is already in use, a unique slug will be generated.
	 * Maximum length is 64 characters.
	 */
	slug?: Slug;
	/**
	 * The URL for the project.
	 * If the project is public, the URL will be accessible listed on its Perf Page.
	 */
	url?: Url;
	/**
	 * ➕ Bencher Plus: Set the visibility of the project.
	 * Creating a `private` project requires a valid Bencher Plus subscription.
	 */
	visibility?: Visibility;
}

export interface JsonProject {
	uuid: Uuid;
	organization: Uuid;
	name: ResourceName;
	slug: Slug;
	url?: Url;
	visibility: Visibility;
	created: string;
	modified: string;
}

/**
 * `JsonPerfQuery` is the full, strongly typed version of `JsonPerfQueryParams`.
 * It should always be used to validate `JsonPerfQueryParams`.
 */
export interface JsonPerfQuery {
	branches: Uuid[];
	testbeds: Uuid[];
	benchmarks: Uuid[];
	measures: Uuid[];
	start_time?: string;
	end_time?: string;
}

export interface JsonPerfMetric {
	report: Uuid;
	iteration: Iteration;
	start_time: string;
	end_time: string;
	version: JsonVersion;
	threshold?: JsonThresholdModel;
	metric: JsonMetric;
	boundary?: JsonBoundary;
	alert?: JsonPerfAlert;
}

export interface JsonPerfMetrics {
	branch: JsonBranch;
	testbed: JsonTestbed;
	benchmark: JsonBenchmark;
	measure: JsonMeasure;
	metrics: JsonPerfMetric[];
}

export interface JsonPerf {
	project: JsonProject;
	start_time?: string;
	end_time?: string;
	results: JsonPerfMetrics[];
}

export enum XAxis {
	DateTime = "date_time",
	Version = "version",
}

export interface JsonNewPlot {
	/**
	 * The index of the plot.
	 * Maximum index is 64.
	 */
	index?: Index;
	/**
	 * The title of the plot.
	 * Maximum length is 64 characters.
	 */
	title?: ResourceName;
	/** Display metric lower values. */
	lower_value: boolean;
	/** Display metric upper values. */
	upper_value: boolean;
	/** Display lower boundary limits. */
	lower_boundary: boolean;
	/** Display upper boundary limits. */
	upper_boundary: boolean;
	/** The x-axis to use for the plot. */
	x_axis: XAxis;
	/**
	 * The window of time for the plot, in seconds.
	 * Metrics outside of this window will be omitted.
	 */
	window: Window;
	/**
	 * The branches to include in the plot.
	 * At least one branch must be specified.
	 */
	branches: Uuid[];
	/**
	 * The testbeds to include in the plot.
	 * At least one testbed must be specified.
	 */
	testbeds: Uuid[];
	/**
	 * The benchmarks to include in the plot.
	 * At least one benchmark must be specified.
	 */
	benchmarks: Uuid[];
	/**
	 * The measures to include in the plot.
	 * At least one measure must be specified.
	 */
	measures: Uuid[];
}

export interface JsonPlot {
	uuid: Uuid;
	project: Uuid;
	title?: ResourceName;
	lower_value: boolean;
	upper_value: boolean;
	lower_boundary: boolean;
	upper_boundary: boolean;
	x_axis: XAxis;
	window: Window;
	branches: Uuid[];
	testbeds: Uuid[];
	benchmarks: Uuid[];
	measures: Uuid[];
	created: string;
	modified: string;
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
	RustIaiCallgrind = "rust_iai_callgrind",
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
	Shell = "shell",
	ShellHyperfine = "shell_hyperfine",
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
	/** I agree to the Bencher Terms of Use (https://bencher.dev/legal/terms-of-use), Privacy Policy (https://bencher.dev/legal/privacy), and License Agreement (https://bencher.dev/legal/license) */
	i_agree: boolean;
}

export interface JsonLogin {
	email: Email;
	plan?: PlanLevel;
	invite?: Jwt;
}

export interface JsonOAuth {
	code: Secret;
	plan?: PlanLevel;
	invite?: Jwt;
}

export interface JsonConfirm {
	token: Jwt;
}

export interface JsonAccept {
	invite: Jwt;
}

export interface JsonAuthAck {
	email: Email;
}

export interface JsonAuthUser {
	user: JsonUser;
	token: Jwt;
	creation: string;
	expiration: string;
}

export interface JsonCard {
	number: CardNumber;
	exp_month: ExpirationMonth;
	exp_year: ExpirationYear;
	cvc: CardCvc;
}

export interface JsonNewPayment {
	customer: JsonCustomer;
	card: JsonCard;
}

export interface JsonPayment {
	customer: NonEmpty;
	payment_method: NonEmpty;
}

export interface JsonNewCheckout {
	organization: ResourceId;
	level: PlanLevel;
	entitlements?: Entitlements;
	self_hosted?: Uuid;
}

export interface JsonCheckout {
	session: string;
	url: string;
}

export interface JsonUpdateUser {
	/**
	 * The new name of the user.
	 * Maximum length is 64 characters.
	 * May only contain alphanumeric characters, non-leading or trailing spaces, and the following characters: , . - '
	 */
	name?: UserName;
	/**
	 * The preferred new slug for the user.
	 * Maximum length is 64 characters.
	 */
	slug?: Slug;
	/** The new email for the user. */
	email?: Email;
	/**
	 * Update whether the user is an admin.
	 * Must be an admin to update this field.
	 */
	admin?: boolean;
	/**
	 * Update whether the user is locked.
	 * Must be an admin to update this field.
	 */
	locked?: boolean;
}

export interface JsonNewToken {
	/**
	 * The name of the token.
	 * Maximum length is 64 characters.
	 */
	name: ResourceName;
	/**
	 * The time-to-live (TTL) for the token in seconds.
	 * If not provided, the token will not expire for over 128 years.
	 */
	ttl?: number;
}

export interface JsonToken {
	uuid: Uuid;
	user: Uuid;
	name: ResourceName;
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

export enum PerfQueryKey {
	Branches = "branches",
	Testbeds = "testbeds",
	Benchmarks = "benchmarks",
	Measures = "measures",
	StartTime = "start_time",
	EndTime = "end_time",
}

export enum PlotKey {
	LowerValue = "lower_value",
	UpperValue = "upper_value",
	LowerBoundary = "lower_boundary",
	UpperBoundary = "upper_boundary",
	XAxis = "x_axis",
}

