import { GameConfig, Output } from "./types";

export const handleUserInput = <T>(config : GameConfig<T>, output : Output) => {
	output.onEvent(event => {
		config.scenes[config.scene].layers.forEach(layer => {
			layer.entities.forEach(entity => {
				const entityEvents = entity.events;
				if(entityEvents) {
					const name = event.name;
					if(name === "keydown" || name === "keyup") {
						const keyEvent = entityEvents[name];
						if(keyEvent) {
							const fun = keyEvent[event.key];
							if(fun) {
								fun({
									entity,
									game: config,
									data: null,
								});
							}
						}
					}
				}
			});
		});
	});
};
