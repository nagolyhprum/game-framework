import { bounce, rect, Output, velocity, all, collides } from "../lib/index";
import { VELOCITY } from "../shared";

const collision = all(
	collides,
	bounce,
);

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
			wall: collision,
			paddle: collision,
		},
		custom: {
			goal: ({ entity }) => {
				entity.x = output.getWidth() / 2;
				entity.y = output.getHeight() / 2;
				velocity(entity).x = -(velocity(entity).x ?? 0);
			},
		},
	},
	velocity: {
		x: VELOCITY,
		y: VELOCITY,
	},
});