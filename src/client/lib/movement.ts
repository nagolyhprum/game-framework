import { velocity } from "./helper";
import { KEY, UpdateEventConfig, EntityConfig } from "./types";

export const follow = (name : string, max : {
    x : number;
    y : number;
}) => <T, U>(config : UpdateEventConfig<T, U>) => {
	const self = config.entity;
	const other = config.game.findNode(name);
	if(other) {
		const selfCenter = {
			x: self.x + (self.width ?? 0) / 2 - (self.width ?? 0) * (self.anchor?.x ?? 0),
			y: self.y + (self.height ?? 0) / 2 - (self.height ?? 0) * (self.anchor?.y ?? 0),
		};
		const otherCenter = {
			x: other.x + (other.width ?? 0) / 2 - (other.width ?? 0) * (other.anchor?.x ?? 0),
			y: other.y + (other.height ?? 0) / 2 - (other.height ?? 0) * (other.anchor?.y ?? 0),
		};
		const dx = Math.sign(otherCenter.x - selfCenter.x);
		const dy = Math.sign(otherCenter.y - selfCenter.y);
		velocity(self).x = max.x * dx;
		velocity(self).y = max.y * dy;
	}
};

export const vertical = {
	move: (speed : number) => ({
		[KEY.ArrowUp]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			velocity(entity).y = -speed;
		},
		[KEY.ArrowDown]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			velocity(entity).y = speed;
		},
	}),
	stop: {
		[KEY.ArrowUp]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			velocity(entity).y = 0;
		},
		[KEY.ArrowDown]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			velocity(entity).y = 0;
		},
	},
};

export const horizontal = {
	move: (speed : number) => ({
		[KEY.ArrowLeft]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			velocity(entity).x = -speed;
		},
		[KEY.ArrowRight]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			velocity(entity).x = speed;
		},
	}),
	stop: {
		[KEY.ArrowLeft]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			velocity(entity).x = 0;
		},
		[KEY.ArrowRight]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			velocity(entity).x = 0;
		},
	},
};

export const jump = (speed : number) => ({
	[KEY.Space]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
		velocity(entity).y = -speed;
	},
});