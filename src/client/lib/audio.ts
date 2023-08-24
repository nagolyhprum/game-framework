import { AudioPlayConfig, AudioStopConfig, EventConfig } from "./types";

export const audio = {    
	play: (config : AudioPlayConfig) => (event : EventConfig<unknown>) => {
		event.output.play(config.name, config.loop ?? false);
	},
	stop: (config : AudioStopConfig) => (event : EventConfig<unknown>) =>{
		event.output.stop(config.name);
	},
};