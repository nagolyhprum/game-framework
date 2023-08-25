import { COORDINATES, GameConfig, Output } from "./types";

export const update = (game : GameConfig<unknown>, output : Output, delta : number) => {
	game.scenes[game.scene]?.layers.forEach(layer => {
		layer.entities.forEach(entity => {
			COORDINATES.forEach(coordinate => entity.update({
				entity,
				game,
				output,
				layer,
				data: {
					delta,
					coordinate,
				},
			}));
		});
	});
};