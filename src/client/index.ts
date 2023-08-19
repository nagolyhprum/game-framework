import { BrowserOutput } from "./lib/browser-output.js";
import { game } from "./lib/game.js";
import { pong } from "./pong/index.js";
import { State, state } from "./state.js";

game<State>(output => {       
	return {
		state,
		debug : true,
		background : "black",
		scene : "pong",
		scenes : {
			pong : pong(output),
		},
	};
})(BrowserOutput(document.querySelector("canvas")!));