import { text } from "../lib/game.js";
import { State } from "../state.js";
import { Output } from "../lib/types.js";

const SCORE = {
	// DRAW
	name : "score",
	fill : "white",
	y : 10,
};

export const leftScore = text<State>({
	...SCORE,
	// DRAW
	x : 10,
	// UPDATE
	events : {
		update : ({ entity, game }) => {
			entity.text = `${game.state.pong.left}`;
		},
	},
});

export const rightScore = (output : Output) => text<State>({                
	...SCORE,
	// DRAW
	x : output.getWidth() - 10,
	align : "right",
	// UPDATE
	events : {
		update : ({ entity, game }) => {
			entity.text = `${game.state.pong.right}`;
		},
	},
});