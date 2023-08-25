import { flip, image, keyboard, entity, id, KEY, Output, all, animation, audio, random } from "../lib/index";

const animate = animation({
	name: "ninja",
	columns: 7,
	rows: 12,
	animations: {
		stand: {
			fps: .3,
			frames: Array.from({ length: 4 }).map((_, i) => ({
				column: 0,
				row: i,
			})),
		},
		walk: {
			fps: .3,
			frames: Array.from({ length: 4 }).map((_, i) => ({
				column: 1,
				row: i,
			})),
		},
		jump: {
			fps: .3,
			frames: [{
				column: 2,
				row: 0,
			}],
		},
		fall: {
			fps: .3,
			frames: [{
				column: 2,
				row: 1,
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
			id: random,
		})),
		keyboard.keyup(KEY.Space, animate.fall),
		animate,
	),
});