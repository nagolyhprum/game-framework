import { entity, text, Output } from "../lib/index";
import { State } from "../state";

const SCORE = {
	name: "score",
	fill: "white",
	y: 10,
	draw: text,
};

export const leftScore = entity<State>({
	...SCORE,
	x: 10,
	update: ({ entity, game }) => {
		entity.text = `${game.state.pong.left}`;
	},
});

export const rightScore = (output : Output) => entity<State>({                
	...SCORE,
	x: output.getWidth() - 10,
	align: "right",
	update: ({ entity, game }) => {
		entity.text = `${game.state.pong.right}`;
	},
});