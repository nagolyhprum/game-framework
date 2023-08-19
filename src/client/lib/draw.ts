import { GameConfig, Output } from "./types";

export const draw = <T>(config : GameConfig<T>, output : Output, delta : number) => {
	output.setFill(config.background);
	output.fillRect(0, 0, output.getWidth(), output.getHeight());
	config.scenes[config.scene].layers.forEach(layer => {
		layer.entities.forEach(entity => {
			output.save();
			output.translate(-entity.width * (entity.anchor?.x ?? 0), -entity.height * (entity.anchor?.y ?? 0));
			entity.draw({
				entity,
				output,
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
					context.lineTo(entity.x + (entity.velocity?.x ?? 0), entity.y + (entity.velocity?.y ?? 0));
					context.stroke();
				});
			}
		});
	});
	// FPS
	output.setFill("red");
	output.setTextAlign("right");
	output.fillText(`${Math.floor(1 / delta)}`, output.getWidth() - 10, output.getHeight() - 10);
};