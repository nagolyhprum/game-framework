import { rect } from "../lib/game.js";
import { Output } from "../types.js";

const WALL = (output : Output) => ({
	name : "wall",
	x : 0,
	width : output.getWidth(),
	height : 10,
	fill : "white",
});

export const topWall = (output : Output) => rect({
	...WALL(output),
	y : 30,
});

export const bottomWall = (output : Output) => rect({
	...WALL(output),
	y : output.getHeight() - 30,
	anchor : {
		y : 1,
	},
});