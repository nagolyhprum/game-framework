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
	},
});

const background = audio.play({
	name: "background",
	loop: true,
	id,
});

const playWalk = audio.play({
	name: "walk",
	loop: true,
	id,
});

const stopWalk = audio.stop({
	name: "walk",
	id,
});

const jump = audio.play({
	name: "jump",
	id: random,
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
		// DEFAULT
		background,
		animate.stand,
		// LEFT
		keyboard.keyhold(KEY.ArrowLeft, all(
			animate.walk,
			flip({
				x: true,
			}),
		)),
		keyboard.keydown(KEY.ArrowLeft, playWalk),
		keyboard.keyup(KEY.ArrowLeft, stopWalk),
		// RIGHT
		keyboard.keyhold(KEY.ArrowRight, all(
			animate.walk,
			flip(),
			playWalk,
		)),
		keyboard.keydown(KEY.ArrowRight, playWalk),
		keyboard.keyup(KEY.ArrowRight, stopWalk),
		// JUMP
		keyboard.keyhold(KEY.Space, animate.jump),
		keyboard.keydown(KEY.Space, jump),
		// ANIMATE
		animate,
	),
});