import { flip, image } from "../lib/index";
import { KEY, Output, all, animation } from "../lib/index";

const width = 224 / 7;
const height = 384 / 12;

const animate = animation({
	name: "ninja",
	width,
	height,
	animations: {
		stand: {
			fps: .3,
			frames: Array.from({ length: 4 }).map((_, i) => ({
				x: 0,
				y: i,
			})),
		},
		walk: {
			fps: .3,
			frames: Array.from({ length: 4 }).map((_, i) => ({
				x: 1,
				y: i,
			})),
		},
		jump: {
			fps: .3,
			frames: [{
				x: 2,
				y: 0,
			}],
		},
		fall: {
			fps: .3,
			frames: [{
				x: 2,
				y: 1,
			}],
		},
	},
});

export const ninja = (output : Output) => image({
	x: output.getWidth() / 2,
	y: output.getHeight() / 2,
	width: 512,
	height: 512,
	anchor: {
		x: 0.5,
		y: 0.5,
	},
	events: {
		update: animate(animate.stand),
		keydown: {
			[KEY.ArrowLeft]: all(
				animate.walk,
				flip({
					x: true,
				}),
			),
			[KEY.ArrowRight]: all(
				animate.walk,
				flip({
					x: false,
				}),
			),
			[KEY.Space]: all(
				animate.jump,
			),
		},
		keyup: {
			[KEY.ArrowLeft]: all(
				animate.stand,
				flip({
					x: true,
				}),
			),
			[KEY.ArrowRight]: all(
				animate.stand,
				flip({
					x: false,
				}),
			),
			[KEY.Space]: all(
				animate.fall,
			),
		},
	},    
});