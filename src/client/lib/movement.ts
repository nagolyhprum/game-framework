import { KEY, UpdateEventConfig, EntityConfig } from "./types";

export const follow = (name : string, max : {
    x : number;
    y : number;
}) => <T, U>(config : UpdateEventConfig<T, U>) => {
	const self = config.entity;
	const other = config.game.findNode(name);
	if(other) {
		const selfCenter = {
			x: self.x + self.width / 2 - self.width * (self.anchor?.x ?? 0),
			y: self.y + self.height / 2 - self.height * (self.anchor?.y ?? 0),
		};
		const otherCenter = {
			x: other.x + other.width / 2 - other.width * (other.anchor?.x ?? 0),
			y: other.y + other.height / 2 - other.height * (other.anchor?.y ?? 0),
		};
		const dx = Math.sign(otherCenter.x - selfCenter.x);
		const dy = Math.sign(otherCenter.y - selfCenter.y);
		self.velocity.x = max.x * dx;
		self.velocity.y = max.y * dy;
	}
};

export const vertical = {
	move: (velocity : number) => ({
		[KEY.ArrowUp]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			entity.velocity.y = -velocity;
		},
		[KEY.ArrowDown]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			entity.velocity.y = velocity;
		},
	}),
	stop: {
		[KEY.ArrowUp]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			entity.velocity.y = 0;
		},
		[KEY.ArrowDown]: ({ entity } : { entity : EntityConfig<unknown, unknown>; }) => {
			entity.velocity.y = 0;
		},
	},
};