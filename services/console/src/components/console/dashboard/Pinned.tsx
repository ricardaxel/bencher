import {
	Match,
	Switch,
	createMemo,
	createSignal,
	type Accessor,
	type Resource,
} from "solid-js";
import type {
	JsonAuthUser,
	JsonPlot,
	JsonProject,
} from "../../../types/bencher";
import { plotQueryString } from "./util";
import DeleteButton from "../deck/hand/DeleteButton";
import type { Params } from "astro";
import DeckCard from "../deck/hand/card/DeckCard";
import { Card, Display } from "../../../config/types";
import { isAllowedProjectManage } from "../../../util/auth";
import { plotFields } from "../../../config/project/plot";
import FieldKind from "../../field/kind";

enum PinnedState {
	Front = "front",
	Settings = "settings",
}

const Pinned = (props: {
	apiUrl: string;
	params: Params;
	user: JsonAuthUser;
	project: Resource<JsonProject>;
	plot: JsonPlot;
	index: Accessor<number>;
	refresh: () => JsonPlot[] | Promise<JsonPlot[]> | null | undefined;
}) => {
	const [state, setState] = createSignal(PinnedState.Front);

	return (
		<div id={props.plot?.uuid} class="box">
			<Switch>
				<Match when={state() === PinnedState.Front}>
					<PinnedFront plot={props.plot} handleState={setState} />
				</Match>
				<Match when={state() === PinnedState.Settings}>
					<PinnedSetting
						apiUrl={props.apiUrl}
						params={props.params}
						user={props.user}
						project={props.project}
						plot={props.plot}
						refresh={props.refresh}
						handleState={setState}
					/>
				</Match>
			</Switch>
		</div>
	);
};

const PinnedFront = (props: {
	plot: JsonPlot;
	handleState: (state: PinnedState) => void;
}) => {
	return (
		<>
			<PinnedPlot plot={props.plot} />
			<PinnedButtons plot={props.plot} handleState={props.handleState} />
		</>
	);
};

const PinnedPlot = (props: { plot: JsonPlot }) => {
	return (
		<iframe
			loading="lazy"
			src={`/perf/${props.plot?.project}/embed?embed_logo=false&embed_title=${
				props.plot?.title ?? ""
			}&embed_header=false&embed_key=false&${plotQueryString(props.plot)}`}
			title={props.plot?.title ?? "Perf Plot"}
			width="100%"
			height="600px"
		/>
	);
};

const PinnedButtons = (props: {
	plot: JsonPlot;
	handleState: (state: PinnedState) => void;
}) => {
	return (
		<div class="buttons is-right">
			<a
				type="button"
				class="button is-small"
				title="View this Perf Plot"
				href={`/console/projects/${props.plot?.project}/perf?${plotQueryString(
					props.plot,
				)}`}
			>
				<span class="icon is-small">
					<i class="fas fa-external-link-alt" />
				</span>
			</a>
			<button
				type="button"
				class="button is-small"
				onClick={(e) => {
					e.preventDefault();
					props.handleState(PinnedState.Settings);
				}}
			>
				<span class="icon is-small">
					<i class="fas fa-cog" />
				</span>
			</button>
		</div>
	);
};

const PinnedSetting = (props: {
	apiUrl: string;
	params: Params;
	user: JsonAuthUser;
	project: Resource<JsonProject>;
	plot: JsonPlot;
	refresh: () => JsonPlot[] | Promise<JsonPlot[]> | null | undefined;
	handleState: (state: PinnedState) => void;
}) => {
	const path = createMemo(
		() => `/v0/projects/${props.plot?.project}/plots/${props.plot?.uuid}`,
	);

	return (
		<>
			<button
				type="button"
				class="button is-small is-fullwidth"
				onClick={(e) => {
					e.preventDefault();
					props.handleState(PinnedState.Front);
				}}
			>
				<span class="icon is-small">
					<i class="fas fa-arrow-left" />
				</span>
				<span>Back to Plot</span>
			</button>
			<br />
			<DeckCard
				apiUrl={props.apiUrl}
				params={props.params}
				user={props.user}
				path={path}
				card={{
					kind: Card.FIELD,
					label: "Title",
					key: "title",
					display: Display.RAW,
					is_allowed: isAllowedProjectManage,
					field: {
						kind: FieldKind.INPUT,
						label: "Title",
						key: "title",
						value: props.plot?.title ?? "",
						valid: null,
						validate: true,
						nullable: true,
						config: plotFields(props.project()).title,
					},
				}}
				data={() => props.plot}
				handleRefresh={props.refresh}
				handleLoopback={props.refresh}
			/>
			<br />
			<DeleteButton
				apiUrl={props.apiUrl}
				user={props.user}
				path={path}
				data={() => props.plot}
				subtitle="This plot will no longer appear in your dashboard."
				redirect={(pathname, _data) => pathname}
			/>
		</>
	);
};

export default Pinned;