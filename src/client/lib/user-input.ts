import { GameConfig, Output } from "./types";

export const handleUserInput = (config : GameConfig, output : Output) => {
	output.onEvent(event => {
		const name = event.name;
		if(name === "keydown" || name === "keyup") {
			config.keys[event.key] = name === "keydown";
		}
	});
};
