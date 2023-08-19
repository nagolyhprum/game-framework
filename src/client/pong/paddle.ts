import { rect } from "../lib/game.js";
import { VELOCITY } from "../shared.js";
import { KEY, Output } from "../types.js";

const PADDLE = (output : Output) => ({
	// DRAW
	y : output.getHeight() / 2,
	anchor : {
		y  : .5,
	},
	width : 10,
	height : output.getHeight() / 4,
	fill : "white",
	// COLLISION
	name : "paddle",        
	velocity : {
		y : 0,
	},
});

export const leftPaddle = (output : Output) => rect({
	...PADDLE(output),
	// DRAW
	x : 10,
	// COLLISION
	events : {
		keydown : {
			[KEY.w] : ({ entity }) => {
				entity.velocity.y = -VELOCITY;
			},
			[KEY.s] : ({ entity }) => {
				entity.velocity.y = VELOCITY;
			},
		},
		keyup : {
			[KEY.w] : ({ entity }) => {
				entity.velocity.y = 0;
			},
			[KEY.s] : ({ entity }) => {
				entity.velocity.y = 0;
			},
		},
		collision : {
			wall : stop,
		},
	},
});

export const rightPaddle = (output : Output) => rect({
	...PADDLE(output),
	// DRAW
	x : output.getWidth() - 10,
	anchor : {
		x : 1,
		y  : .5,
	},
	// COLLISION
	events : {
		keydown : {
			[KEY.ArrowUp] : ({ entity }) => {
				entity.velocity.y = -VELOCITY;
			},
			[KEY.ArrowDown] : ({ entity }) => {
				entity.velocity.y = VELOCITY;
			},
		},
		keyup : {
			[KEY.ArrowUp] : ({ entity }) => {
				entity.velocity.y = 0;
			},
			[KEY.ArrowDown] : ({ entity }) => {
				entity.velocity.y = 0;
			},
		},
		collision : {
			wall : stop,
		},
	},
});