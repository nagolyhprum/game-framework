import { rect } from "../lib/game.js";
import { State } from "../state.js";
import { Output } from "../types.js";

const GOAL = (output : Output) => ({
	name : "goal",
	y : 0,
	width : 10,
	height : output.getHeight(),
});

export const topGoal = (output : Output) => rect<State>({
	...GOAL(output),
	x : 0,
	events : {
		collision : {
			ball : ({ state, data : { other : ball } }) => {
				state.pong.left++;
				ball.x = output.getWidth() / 2;
				ball.y = output.getHeight() / 2;
				ball.velocity.x = -ball.velocity.x;
			},
		},
	},   
});

export const bottomGoal = (output : Output) => rect<State>({
	...GOAL(output),
	x : output.getWidth(),
	anchor : { 
		x : 1,
	},
	events : {
		collision : {
			ball : ({ state, data : { other : ball } }) => {
				state.pong.right++;
				ball.x = output.getWidth() / 2;
				ball.y = output.getHeight() / 2;
				ball.velocity.x = -ball.velocity.x;
			},
		},
	},                        
});