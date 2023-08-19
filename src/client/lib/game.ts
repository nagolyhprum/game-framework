import { Output, GameConfig, WithoutFind } from "./types.js";
import { draw } from "./draw.js";
import { update } from "./update.js";
import { handleUserInput } from "./user-input.js";

export * from "./types.js";
export * from "./text.js";
export * from "./rect.js";
export * from "./collision.js";
export * from "./browser-output.js";
export * from "./movement.js";

export const game = <T>(generate  : (output : Output) => WithoutFind<GameConfig<T>>) => (output : Output) => {
	const config : GameConfig<T> = {
		...generate(output),
		findNode: (name) => {
			for(const layer of config.scenes[config.scene].layers)  {
				for(const entity of layer.entities) {
					if(entity.name === name) {
						return entity;
					}
				}
			}
			return null;
		},
	};
	process(config, output, Date.now());
	handleUserInput(config, output);
};

const process = <T>(config : GameConfig<T>, output : Output, lastUpdate : number) => {
	const now = Date.now();
	const delta = (now - lastUpdate) / 1000;
	requestAnimationFrame(() => process(config, output, now));
	update(config, delta);
	draw(config, output, delta);
};