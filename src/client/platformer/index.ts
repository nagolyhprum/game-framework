import { Output, horizontal, jump, rect, stop } from "../lib/game";

export const platformer = (output : Output) => ({
	layers: [{
		entities: [
			rect({
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
				weight: 1,
				events: {
					collision: {
						platform: stop,
					},
					keydown: {
						...horizontal.move(100),
						...jump(250 * 3),
					},
					keyup: horizontal.stop,
				},
			}),
			rect({
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
			rect({
				name: "platform",
				x: 100,
				y: 100,
				width: output.getWidth() - 200,
				height: 100,
				fill: "white",
			}),
			rect({
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