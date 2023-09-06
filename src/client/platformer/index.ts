import { entity, Output, all, collision, movement, audio, animation, image, id, random } from "../lib/index";

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

export const platformer = (output : Output) => ({
	layers: [{
		entities: [
			entity({
				name: "player",
				x: output.getWidth() / 2,
				y: output.getHeight() / 2,
				anchor: {
					x: .5,
					y: .5,
				},
				width: 50,
				height: 50,
				fill: "black",
				draw : image,
				update: all(
					animate.stand,
					animate,
					movement.horizontal(100),
					movement.jump(250),
					movement.slide(10),
					movement.gravity({
						x: 0,
						y: 500,
					}),
					movement.update,
					collision.detect({
						platform: all(
							collision.resolve,
							collision.stop,
							collision.checkWall,
							collision.checkGround,					
						),
					}),
				),
			}),
			entity({
				name: "platform",
				x: 100,
				y: output.getHeight() - 100,
				width: output.getWidth() - 200,
				height: 100,
				fill: "black",
				anchor: {
					y: 1,
				},
			}),
			entity({
				name: "platform",
				x: 100,
				y: 100,
				width: output.getWidth() - 200,
				height: 100,
				fill: "black",
			}),
			entity({
				name: "platform",
				x: 100,
				y: 100,
				width: 100,
				height: output.getHeight() - 200,
				fill: "black",
			}),
		],
	}],
});