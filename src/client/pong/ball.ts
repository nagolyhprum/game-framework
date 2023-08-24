import { entity, Output, all, collision, movement } from "../lib/index";
import { VELOCITY } from "../shared";

const react = all(
	collision.resolve,
	collision.bounce,
);

export const ball = (output : Output) => entity({
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
	update: all(
		movement.update,
		collision.detect({
			wall: react,
			paddle: react,
		}),
	),
	events: {
		goal: ({ entity }) => {
			entity.x = output.getWidth() / 2;
			entity.y = output.getHeight() / 2;
			entity.velocity.x = -entity.velocity.x;
		},
	},
	velocity: {
		x: VELOCITY,
		y: VELOCITY,
	},
});