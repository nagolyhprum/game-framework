import { animation } from "./animation/index";
import { game } from "./lib/index";
import { platformer } from "./platformer/index";
import { pong } from "./pong/index";
import { state } from "./state";

import Ninja from "./images/ninja.png";
import Walk from "./audio/walk.ogg";
import Jump from "./audio/jump.flac";
import Background from "./audio/background.mp3";

export const start = game(output => {       
	return {
		state,
		debug: false,
		background: "white",
		scene: "animation",
		images: {
			ninja: Ninja,
		},
		audio: {
			walk: Walk,
			jump: Jump,
			background: Background,
		},
		scenes: {
			pong: pong(output),
			animation: animation(output),
			platformer: platformer(output),
		},
	};
});