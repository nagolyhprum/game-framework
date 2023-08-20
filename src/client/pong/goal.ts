import { rect, Output } from "../lib/game";
import { State } from "../state";

const GOAL = (output : Output) => ({
	// DRAW
	y : 0,
	width : 10,
	height : output.getHeight(),
	// COLLISION
	name : "goal",
});

export const topGoal = (output : Output) => rect<State>({
	...GOAL(output),
	// DRAW
	x : 0,
	// COLLISION
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

export const bottomGoal = (output : Output) => rect<State>({
	...GOAL(output),
	// DRAW
	x : output.getWidth(),
	anchor : { 
		x : 1,
	},
	// COLLISION
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