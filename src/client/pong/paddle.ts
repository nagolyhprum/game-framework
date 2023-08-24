import { entity } from "../lib/entity";
import { Output, all, collision, movement } from "../lib/index";
import { VELOCITY } from "../shared";

const update = all(
	movement.update,
	collision.detect({
		wall: all(
			collision.resolve,
			collision.stop,
		),
	}),
);

const PADDLE = (output : Output) => ({
	y: output.getHeight() / 2,
	anchor: {
		y: .5,
	},
	width: 10,
	height: output.getHeight() / 4,
	fill: "white",
	name: "paddle",        
	velocity: {
		y: 0,
	},
});

export const leftPaddle = (output : Output) => entity({
	...PADDLE(output),
	x: 10,
	update: all(
		update,
		movement.vertical(VELOCITY),
	),
});

export const rightPaddle = (output : Output) => entity({
	...PADDLE(output),
	x: output.getWidth() - 10,
	anchor: {
		x: 1,
		y: .5,
	},
	update: all(
		update,
		movement.follow("ball", {
			x: 0,
			y: VELOCITY,
		}),
	),
});