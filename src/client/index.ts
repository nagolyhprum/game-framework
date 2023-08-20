import { game, BrowserOutput } from "./lib/game";
import { pong } from "./pong/index";
import { State, state } from "./state";

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