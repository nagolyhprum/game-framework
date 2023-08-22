import { Output, GameConfig, WithoutGameFunctions } from "./types";
import { draw } from "./draw";
import { update } from "./update";
import { handleUserInput } from "./user-input";

export * from "./types";
export * from "./text";
export * from "./rect";
export * from "./collision";
export * from "./browser-output";
export * from "./movement";
export * from "./helper";

export const game = <T>(generate  : (output : Output) => WithoutGameFunctions<GameConfig<T>>) => (output : Output) => {
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
		trigger: (name, data) => {
			for(const layer of config.scenes[config.scene].layers)  {
				for(const entity of layer.entities) {
					entity.events?.custom?.[name]?.({
						data,
						entity,
						game: config,
					});
				}
			}
		},
	};
	handleUserInput(config, output);
	process(config, output, Date.now());
};

const process = <T>(config : GameConfig<T>, output : Output, lastUpdate : number) => {
	const now = Date.now();
	const delta = (now - lastUpdate) / 1000;
	requestAnimationFrame(() => process(config, output, now));
	update(config, delta);
	draw(config, output, delta);
};