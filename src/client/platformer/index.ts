import { entity, Output, all, collision, movement } from "../lib/index";

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
				width: 10,
				height: 10,
				fill: "white",
				update: all(
					movement.horizontal(100),
					movement.jump(250),
					movement.slide(10),
					movement.gravity({
						x: 0,
						y: 10000,
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
				fill: "white",
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
				fill: "white",
			}),
			entity({
				name: "platform",
				x: 100,
				y: 100,
				width: 100,
				height: output.getHeight() - 200,
				fill: "white",
			}),
		],
	}],
});