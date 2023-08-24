import { entity, Output, collision, CollisionEventConfig, WithState, PartialEntity } from "../lib/index";
import { State } from "../state";

const GOAL = (output : Output) : PartialEntity => ({
	y: 0,
	width: 10,
	height: output.getHeight(),
	name: "goal",
});

export const leftGoal = (output : Output) => entity({
	...GOAL(output),
	x: 0,
	update: collision.detect({
		ball: ({ game } : WithState<CollisionEventConfig, State>) => {
			game.state.pong.left++;
			game.trigger("goal");
		},
	}),
});

export const rightGoal = (output : Output) => entity({
	...GOAL(output),
	x: output.getWidth(),
	anchor: { 
		x: 1,
	},
	update: collision.detect({
		ball: ({ game } : WithState<CollisionEventConfig, State>) => {
			game.state.pong.left++;
			game.trigger("goal");
		},
	}),                  
});