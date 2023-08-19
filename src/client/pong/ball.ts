import { bounce, rect } from "../lib/game.js";
import { VELOCITY } from "../shared.js";
import { Output } from "../types.js";

export const ball = (output : Output) => rect({
	// DRAW
	x : output.getWidth() / 2,
	y : output.getHeight() / 2,
	anchor : {
		x : .5,
		y : .5,
	},
	width : 10,
	height : 10,
	fill : "white",
	// COLLISION
	name : "ball",
	events : {
		collision : {
			wall : bounce,
			paddle : bounce,
		},
	},
	velocity : {
		x : VELOCITY,
		y : VELOCITY,
	},
});