import { flip, image, keyboard, entity, id, KEY, Output, all, animation, audio } from "../lib/index";

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

export const ninja = (output : Output) => entity({
	x: output.getWidth() / 2,
	y: output.getHeight() / 2,
	width: 512,
	height: 512,
	anchor: {
		x: 0.5,
		y: 0.5,
	},
	draw: image,
	update: all(
		audio.play({
			name: "background",
			loop: true,
			id,
		}),
		animate.stand,
		keyboard.keyhold(KEY.ArrowLeft, all(
			animate.walk,
			flip({
				x: true,
			}),
		)),
		keyboard.keydown(KEY.ArrowLeft, audio.play({
			name: "walk",
			loop: true,
			id,
		})),
		keyboard.keyup(KEY.ArrowLeft, audio.stop({
			name: "walk",
			id,
		})),
		keyboard.keyhold(KEY.ArrowRight, all(
			animate.walk,
			flip(),
			audio.play({
				name: "walk",
				loop: true,
				id,
			}),
		)),
		keyboard.keydown(KEY.ArrowRight, audio.play({
			name: "walk",
			loop: true,
			id,
		})),
		keyboard.keyup(KEY.ArrowRight, audio.stop({
			name: "walk",
			id,
		})),
		keyboard.keyhold(KEY.Space, animate.jump),
		keyboard.keydown(KEY.Space, audio.play({
			name: "jump",
			id: () => crypto.randomUUID(),
		})),
		keyboard.keyup(KEY.Space, animate.fall),
		animate,
	),
});