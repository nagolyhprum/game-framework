import { Output, GameConfig } from "../types.js";
import { draw } from "./draw.js";
import { update } from "./update.js";
import { handleUserInput } from "./user-input.js";

export * from "../types.js";
export * from "./text.js";
export * from "./rect.js";
export * from "./collision.js";

export const game = <T>(generate  : (output : Output) => GameConfig<T>) => (output : Output) => {
	const config = generate(output);
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