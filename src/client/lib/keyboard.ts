import { KeyValues, UpdateEventConfig } from "./types";

export const keyboard = {
	keydown: (key : KeyValues, callback : (event : UpdateEventConfig) => void) => (event : UpdateEventConfig) => {
		const keys = event.entity.data.keys = event.entity.data.keys ?? {};
		if(event.game.keys[key] && !keys[key]) {
			keys[key] = true;
			callback(event);
		}
	},
	keyup: (key : KeyValues, callback : (event : UpdateEventConfig) => void) => (event : UpdateEventConfig) => {
		const keys = event.entity.data.keys = event.entity.data.keys ?? {};
		if(!event.game.keys[key] && keys[key]) {
			keys[key] = false;
			callback(event);
		}
	},
	keyhold: (key : KeyValues, callback : (event : UpdateEventConfig) => void) => (event : UpdateEventConfig) => {
		if(event.game.keys[key]) {
			callback(event);
		}
	},
};