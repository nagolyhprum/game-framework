import { bounce, rect, Output } from "../lib/game";
import { VELOCITY } from "../shared";

export const ball = (output : Output) => rect({
	x: output.getWidth() / 2,
	y: output.getHeight() / 2,
	anchor: {
		x: .5,
		y: .5,
	},
	width: 10,
	height: 10,
	fill: "white",
	name: "ball",
	events: {
		collision: {
			wall: bounce,
			paddle: bounce,
		},
		custom: {
			goal: ({ entity }) => {
				entity.x = output.getWidth() / 2;
				entity.y = output.getHeight() / 2;
				entity.velocity.x *= -1;
			},
		},
	},
	velocity: {
		x: VELOCITY,
		y: VELOCITY,
	},
});