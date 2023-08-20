import { bounce, rect, Output } from "../lib/game";
import { VELOCITY } from "../shared";

export const ball = (output : Output) => rect({
	x : output.getWidth() / 2,
	y : output.getHeight() / 2,
	anchor : {
		x : .5,
		y : .5,
	},
	width : 10,
	height : 10,
	fill : "white",
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