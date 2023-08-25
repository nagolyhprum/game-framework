import { AudioPlayConfig, AudioStopConfig, UpdateEventConfig } from "./types";

export const audio = {    
	play: (config : AudioPlayConfig) => (event : UpdateEventConfig<unknown, unknown>) => {
		event.output.play({
			name: config.name,
			loop: config.loop ?? false,
			id: config.id(event),
		});
	},
	stop: (config : AudioStopConfig) => (event : UpdateEventConfig<unknown, unknown>) =>{
		event.output.stop({
			name: config.name,
			id: config.id(event),
		});
	},
};