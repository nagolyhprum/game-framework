import { Output, GameConfig, RecursivePartial } from "./types";
import { draw } from "./draw";
import { update } from "./update";
import { handleUserInput } from "./user-input";

export * from "./types";
export * from "./text";
export * from "./rect";
export * from "./image";
export * from "./collision";
export * from "./browser-output";
export * from "./movement";
export * from "./helper";
export * from "./animation";
export * from "./audio";
export * from "./keyboard";
export * from "./entity";

export const game = (generate  : (output : Output) => RecursivePartial<GameConfig>) => async (output : Output) => {
	const input = generate(output);
	const config : GameConfig = {		
		audio: input.audio ?? {},
		images: input.images ?? {},
		scenes: input.scenes ?? {},
		keys: input.keys ?? {},
		scene: input.scene ?? "",
		background: input.background ?? "transparent",
		state: input.state ?? {},
		debug: input.debug ?? false,			
		findNode: (name) => {
			for(const layer of config.scenes[config.scene]?.layers ?? [])  {
				for(const entity of layer.entities) {
					if(entity.name === name) {
						return entity;
					}
				}
			}
			return null;
		},
		trigger: (name, data) => {
			for(const layer of config.scenes[config.scene]?.layers ?? [])  {
				for(const entity of layer.entities) {
					entity.events?.[name]?.({
						data,
						entity,
						game: config,
						output,
						layer,
					});
				}
			}
		},	
	};
	await Promise.all(Object.entries(config.images).map(([key, url]) => url && output.loadImage(key, url)));
	await Promise.all(Object.entries(config.audio).map(([key, url]) => url && output.loadAudio(key, url)));
	handleUserInput(config, output);
	process(config, output, Date.now());
};

const process = (config : GameConfig, output : Output, lastUpdate : number) => {
	const now = Date.now();
	const delta = (now - lastUpdate) / 1000;
	requestAnimationFrame(() => process(config, output, now));
	if(delta > 1) return;
	update(config, output, delta);
	draw(config, output, delta);
};