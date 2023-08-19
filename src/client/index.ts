import { game, BrowserOutput } from "./lib/game.js";
import { pong } from "./pong/index.js";
import { State, state } from "./state.js";

const output = BrowserOutput(document.querySelector("canvas")!);

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
})(output);