import { entity, Output } from "../lib/index";

const WALL = (output : Output) => ({
	x: 0,
	width: output.getWidth(),
	height: 10,
	fill: "black",
	name: "wall",
});

export const topWall = (output : Output) => entity({
	...WALL(output),
	y: 30,
});

export const bottomWall = (output : Output) => entity({
	...WALL(output),
	y: output.getHeight() - 30,
	anchor: {
		y: 1,
	},
});