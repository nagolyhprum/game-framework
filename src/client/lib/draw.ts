import { GameConfig, Output } from "./types";

export const draw = (config : GameConfig, output : Output, delta : number) => {
	output.clear(config.background);
	config.scenes[config.scene]?.layers.forEach(layer => {
		layer.entities.forEach(entity => {
			output.save();
			output.translate(-entity.width * entity.anchor.x, -entity.height * entity.anchor.y);
			entity.draw({
				entity,
				output,
				game: config,
				data: null,
				layer,
			});
			if(config.debug) {
				// OUTLINE
				output.setStroke("green");
				output.setDash([5, 5]);
				output.strokeRect(entity.x, entity.y, entity.width, entity.height);
			}
			output.restore();
			if(config.debug) {
				// ANCHOR
				output.setFill("blue");
				output.fillRect(entity.x - 2, entity.y - 2, 5, 5);
				// VELOCITY
				output.setStroke("red");
				output.path(context => {
					context.moveTo(entity.x, entity.y);
					context.lineTo(entity.x + entity.velocity.x, entity.y + entity.velocity.y);
					context.stroke();
				});
			}
		});
	});
	if(config.debug) {
		// FPS
		output.setFill("red");
		output.setTextAlign("right");
		output.fillText(`${Math.floor(1 / delta)}`, output.getWidth() - 10, output.getHeight() - 10);
	}
};