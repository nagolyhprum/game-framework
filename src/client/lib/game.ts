import { Output, GameConfig, RectConfig, TextConfig, WithoutDraw, DrawEventConfig, EntityConfig, Rect, CollisionEventConfig } from "../types";

export * from "../types.js";

const toRect = (entity : EntityConfig<unknown, unknown>) : Rect => ({
	x : entity.x - (entity.width * (entity.anchor?.x ?? 0)),
	y : entity.y - (entity.height * (entity.anchor?.y ?? 0)),
	width : entity.width,
	height : entity.height,
});

const process = <T>(config : GameConfig<T>, output : Output, lastUpdate : number) => {
	const now = Date.now();
	const delta = (now - lastUpdate) / 1000;
	requestAnimationFrame(() => process(config, output, now));
	update(config, delta);
	draw(config, output, delta);
};

const collides = (a : Rect, b : Rect) => {
	const left = Math.max(a.x, b.x);
	const right = Math.min(a.x + a.width, b.x + b.width);
	const top = Math.max(a.y, b.y);
	const bottom = Math.min(a.y + a.height, b.y + b.height);
	const rect : Rect = {
		x : left,
		y : top,
		width : right - left,
		height : bottom - top,
	};
	return rect.width > 0 && rect.height > 0 ? rect : null;
};

const COMPLEMENTS = {
	x : "width",
	y : "height",
} as const;

const updateCoordinate = <T, U>({
	entity,
	delta,
	candidates,
	state,
	coordinate,
} : {
    entity : EntityConfig<T, U>;
    delta : number;
    candidates : EntityConfig<T, U>[];
    state : T;
    coordinate : "x" | "y";
}) => {         
	entity[coordinate] += (entity.velocity?.[coordinate] ?? 0) * delta;
	candidates.forEach(candidate => {
		const a = toRect(entity);
		const b = toRect(candidate);
		const collision = collides(a, b);
		if(collision) {
			const sign = Math.sign(entity.velocity?.[coordinate] ?? 0);
			entity[coordinate] -= collision[COMPLEMENTS[coordinate]] * sign;
			const fun = entity.events.collision[candidate.name];
			if(fun) {
				fun({
					entity,
					state : state,
					data : {
						other : candidate,
						coordinate,
					},
				});
			}
		}
	});
};

const update = <T>(config : GameConfig<T>, delta : number) => {
	config.scenes[config.scene].layers.forEach(layer => {
		layer.entities.forEach(entity => {
			entity.events?.update?.({
				entity,
				state : config.state,
				data : {
					delta,
				},
			});
			const collisions = new Set(Object.keys(entity.events?.collision ?? {}));
			const candidates = layer.entities.filter(entity => collisions.has(entity.name));   
			updateCoordinate({
				candidates,
				coordinate: "x",
				delta,
				entity,
				state: config.state,
			}); 
			updateCoordinate({
				candidates,
				coordinate: "y",
				delta,
				entity,
				state: config.state,
			});
		});
	});
};

const draw = <T>(config : GameConfig<T>, output : Output, delta : number) => {
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
				output.setStroke("red");
				output.setDash([5, 5]);
				output.strokeRect(entity.x, entity.y, entity.width, entity.height);
			}
			output.restore();
			if(config.debug) {
				// FPS
				output.setFill("red");
				output.fillRect(entity.x - 1, entity.y - 1, 3, 3);
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
	output.setFill("red");
	output.setTextAlign("right");
	output.fillText(`${Math.floor(1 / delta)}`, output.getWidth() - 10, output.getHeight() - 10);
};

export const game = <T>(generate  : (output : Output) => GameConfig<T>) => (output : Output) => {
	const config = generate(output);
	console.log(config);
	process(config, output, Date.now());
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
									state : config.state,
									data : null,
								});
							}
						}
					}
				}
			});
		});
	});
};

const drawText = <T>({
	entity,
	output,
} : DrawEventConfig<T, TextConfig<T>>) => {
	output.setFill(entity.fill);
	output.setTextAlign(entity.align ?? "left");
	output.setTextBaseline(entity.baseline ?? "top");
	output.fillText(entity.text, entity.x, entity.y);
};

export const text = <T>(config : WithoutDraw<TextConfig<T>>) : TextConfig<T> => {
	return {
		...config,
		draw : drawText,
	};
};

const drawRect = <T>({
	entity,
	output,
} : DrawEventConfig<T, TextConfig<T>>) => {
	output.setFill(entity.fill ?? "transparent");
	output.fillRect(entity.x, entity.y, entity.width, entity.height);
};

export const rect = <T>(config : WithoutDraw<RectConfig<T>>) : RectConfig<T> => {
	return {
		...config,
		draw : drawRect,
	};
};

export const bounce = <T, U>(event : CollisionEventConfig<T, U>) => {
	event.entity.velocity[event.data.coordinate] *= -1;
};

export const stop = <T, U>(event : CollisionEventConfig<T, U>) => {
	event.entity.velocity[event.data.coordinate] = 0;
};