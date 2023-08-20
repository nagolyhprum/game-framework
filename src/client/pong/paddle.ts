import { rect, Output, follow, stop, vertical } from "../lib/game";
import { VELOCITY } from "../shared";

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

export const leftPaddle = (output : Output) => rect({
	...PADDLE(output),
	x: 10,
	events: {
		keydown: vertical.move(VELOCITY),
		keyup: vertical.stop,
		collision: {
			wall: stop,
		},
	},
});

export const rightPaddle = (output : Output) => rect({
	...PADDLE(output),
	x: output.getWidth() - 10,
	anchor: {
		x: 1,
		y: .5,
	},
	events: {
		collision: {
			wall: stop,
		},
		update: follow("ball", {
			x: 0,
			y: VELOCITY,
		}),
	},
});