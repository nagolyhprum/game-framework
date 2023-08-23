import { rect, Output } from "../lib/index";

const WALL = (output : Output) => ({
	x: 0,
	width: output.getWidth(),
	height: 10,
	fill: "white",
	name: "wall",
});

export const topWall = (output : Output) => rect({
	...WALL(output),
	y: 30,
});

export const bottomWall = (output : Output) => rect({
	...WALL(output),
	y: output.getHeight() - 30,
	anchor: {
		y: 1,
	},
});