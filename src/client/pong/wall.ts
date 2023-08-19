import { rect, Output } from "../lib/game.js";

const WALL = (output : Output) => ({
	// DRAW
	x : 0,
	width : output.getWidth(),
	height : 10,
	fill : "white",
	// COLLISION
	name : "wall",
});

export const topWall = (output : Output) => rect({
	...WALL(output),
	// DRAW
	y : 30,
});

export const bottomWall = (output : Output) => rect({
	...WALL(output),
	// DRAW
	y : output.getHeight() - 30,
	anchor : {
		y : 1,
	},
});