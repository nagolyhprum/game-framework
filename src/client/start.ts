import { game } from "./lib/game";
import { platformer } from "./platformer/index";
import { pong } from "./pong/index";
import { State, state } from "./state";

export const start = game<State>(output => {       
	return {
		state,
		debug: true,
		background: "black",
		scene: "platformer",
		gravity: {
			y: 10000 * 3,
		},
		scenes: {
			pong: pong(output),
			platformer: platformer(output),
		},
	};
});