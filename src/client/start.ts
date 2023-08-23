import { animation } from "./animation/index";
import { game } from "./lib/index";
import { platformer } from "./platformer/index";
import { pong } from "./pong/index";
import { State, state } from "./state";

import Ninja from "./images/ninja.png";

export const start = game<State>(output => {       
	return {
		state,
		debug: true,
		background: "white",
		scene: "animation",
		images: {
			ninja: Ninja,
		},
		gravity: {
			y: 1,
		},
		scenes: {
			pong: pong(output),
			platformer: platformer(output),
			animation: animation(output),
		},
	};
});