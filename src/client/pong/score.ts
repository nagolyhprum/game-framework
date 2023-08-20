import { text } from "../lib/game";
import { State } from "../state";
import { Output } from "../lib/types";

const SCORE = {
	name: "score",
	fill: "white",
	y: 10,
};

export const leftScore = text<State>({
	...SCORE,
	x: 10,
	events: {
		update: ({ entity, game }) => {
			entity.text = `${game.state.pong.left}`;
		},
	},
});

export const rightScore = (output : Output) => text<State>({                
	...SCORE,
	x: output.getWidth() - 10,
	align: "right",
	events: {
		update: ({ entity, game }) => {
			entity.text = `${game.state.pong.right}`;
		},
	},
});