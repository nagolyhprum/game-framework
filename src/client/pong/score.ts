import { entity } from "../lib/entity";
import { text, Output, UpdateEventConfig, WithState } from "../lib/index";
import { State } from "../state";

const SCORE = {
	name: "score",
	fill: "white",
	y: 10,
	draw: text,
};

export const leftScore = entity({
	...SCORE,
	x: 10,
	update: ({ entity, game } : WithState<UpdateEventConfig, State>) => {
		entity.text = `${game.state.pong.left}`;
	},
});

export const rightScore = (output : Output) => entity({                
	...SCORE,
	x: output.getWidth() - 10,
	align: "right",
	update: ({ entity, game } : WithState<UpdateEventConfig, State>) => {
		entity.text = `${game.state.pong.right}`;
	},
});