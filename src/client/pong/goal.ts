import { rect, Output } from "../lib/game";
import { State } from "../state";

const GOAL = (output : Output) => ({
	y : 0,
	width : 10,
	height : output.getHeight(),
	name : "goal",
});

export const leftGoal = (output : Output) => rect<State>({
	...GOAL(output),
	x : 0,
	events : {
		collision : {
			ball : ({ game, data : { other : ball } }) => {
				game.state.pong.left++;
				ball.x = output.getWidth() / 2;
				ball.y = output.getHeight() / 2;
				ball.velocity.x = -ball.velocity.x;
			},
		},
	},   
});

export const rightGoal = (output : Output) => rect<State>({
	...GOAL(output),
	x : output.getWidth(),
	anchor : { 
		x : 1,
	},
	events : {
		collision : {
			ball : ({ game, data : { other : ball } }) => {
				game.state.pong.right++;
				ball.x = output.getWidth() / 2;
				ball.y = output.getHeight() / 2;
				ball.velocity.x = -ball.velocity.x;
			},
		},
	},                        
});