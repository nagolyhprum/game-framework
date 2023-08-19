import { text } from "../lib/game.js";
import { State } from "../state.js";
import { Output } from "../types.js";

const SCORE = {
	name : "score",
	fill : "white",
	y : 10,
};

export const leftScore = text<State>({
	...SCORE,
	x : 10,
	events : {
		update : ({ entity, state }) => {
			entity.text = `${state.pong.left}`;
		},
	},
});

export const rightScore = (output : Output) => text<State>({                
	...SCORE,
	x : output.getWidth() - 10,
	align : "right",
	events : {
		update : ({ entity, state }) => {
			entity.text = `${state.pong.right}`;
		},
	},
});