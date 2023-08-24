import { animation } from "./animation/index";
import { game } from "./lib/index";
import { platformer } from "./platformer/index";
import { pong } from "./pong/index";
import { state } from "./state";

import Ninja from "./images/ninja.png";
import Walk from "./audio/walk.ogg";
import Jump from "./audio/jump.flac";

export const start = game(output => {       
	return {
		state,
		debug: true,
		background: "black",
		scene: "animation",
		images: {
			ninja: Ninja,
		},
		audio: {
			walk: Walk,
			jump: Jump,
		},
		scenes: {
			pong: pong(output),
			platformer: platformer(output),
			animation: animation(output),
		},
	};
});