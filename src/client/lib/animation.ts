import { EventConfig, ImageConfig, UpdateEventConfig } from "./types";

type AnimationAnimations = Record<string, {
	fps : number;
    frames : Array<{
        x : number;
        y : number;
    }>;
}>;

type AnimationConfig<T extends AnimationAnimations> = {
    name : string;
    width : number;
    height : number;
    animations : T;
};

type AnimationHandler<T> = (
    (event : (event : EventConfig<unknown, unknown, unknown>) => void) => (event : EventConfig<unknown, unknown, unknown>) => void
) & {
    [K in keyof T] : (event : EventConfig<unknown, unknown, unknown>) => void;
};

export const animation = <T extends AnimationAnimations>(config : AnimationConfig<T>) => {
	const handler = ((
		init : (event : EventConfig<unknown, unknown, unknown>) => void,
	) => (event : UpdateEventConfig<unknown, ImageConfig<unknown>>) => {
		const image = event.entity;
		if(!image.animation) {
			init(event);
		}
		const { frames, fps } = config.animations[image.animation?.name ?? ""];
		const index = Math.floor((image.animation?.progress ?? 0) / fps) % frames.length;
		const frame = frames[index];
		image.src = {
			name: config.name,
			x: frame.x * config.width,
			y: frame.y * config.height,
			width: config.width,
			height: config.height,
		};
		const animation = image.animation;
		if(animation) {
			animation.progress = (animation.progress ?? 0) + event.data.delta;
		}
	}) as unknown as Record<string, (event : EventConfig<unknown, unknown, unknown>) => void>;

	Object.keys(config.animations).forEach(key => {
		handler[key] = (event : EventConfig<unknown, ImageConfig<unknown>, unknown>) => {
			const image = event.entity;
			image.animation = {
				name: key,
				progress: 0,
			};
		};
	});

	return handler as AnimationHandler<T>;
};

export const flip = (flip : {
	x ?: boolean;
	y ?: boolean;
}) => (event : EventConfig<unknown, ImageConfig<unknown>, unknown>) => {
	event.entity.flip = flip;
};