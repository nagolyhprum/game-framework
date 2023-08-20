import { game } from "./lib/game";
import { pong } from "./pong/index";
import { State, state } from "./state";

export const start = game<State>(output => {       
	return {
		state,
		debug: true,
		background: "black",
		scene: "pong",
		scenes: {
			pong: pong(output),
		},
	};
});