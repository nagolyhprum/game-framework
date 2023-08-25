import { AnimationAnimations, AnimationConfig, AnimationHandler, EventConfig, UpdateEventConfig } from "./types";

export const animation = <T extends AnimationAnimations>(config : AnimationConfig<T>) => {
	const handler = ((event : UpdateEventConfig) => {		
		const image = event.entity;
		if(image.animation.previous !== image.animation.name) {
			image.animation.progress = 0;
			image.animation.previous = image.animation.name;
		} else {
			image.animation.progress = image.animation.progress + event.data.delta;
		}
		const { frames, fps } = config.animations[image.animation.name];
		const index = Math.floor(image.animation.progress / fps) % frames.length;
		const frame = frames[index];
		image.src = {
			name: config.name,
			column: frame.column,
			row: frame.row,
			columns: config.columns,
			rows: config.rows,
		};
	}) as unknown as Record<string, (event : EventConfig<unknown>) => void>;

	Object.keys(config.animations).forEach(key => {
		handler[key] = (event : EventConfig<unknown>) => {
			const image = event.entity;
			image.animation.name = key;
		};
	});

	return handler as AnimationHandler<T>;
};

export const flip = (flip ?: {
	x ?: boolean;
	y ?: boolean;
}) => (event : EventConfig<unknown>) => {
	event.entity.flip = {
		x: flip?.x ?? false,
		y: flip?.y ?? false,
	};
};