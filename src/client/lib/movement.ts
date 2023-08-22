import { data, velocity } from "./helper";
import { KEY, UpdateEventConfig } from "./types";

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

export const vertical = (speed : number) => (event : UpdateEventConfig<unknown, unknown>) => {
	velocity(event.entity).y = 0;
	if(event.game.keys?.[KEY.ArrowUp]) {
		velocity(event.entity).y = -speed;
	}
	if(event.game.keys?.[KEY.ArrowDown]) {
		velocity(event.entity).y = (velocity(event.entity).y ?? 0) + speed;
	}
};

export const horizontal = (speed : number) => (event : UpdateEventConfig<unknown, unknown>) => {
	velocity(event.entity).x = 0;
	if(event.game.keys?.[KEY.ArrowLeft]) {
		velocity(event.entity).x = -speed;
	}
	if(event.game.keys?.[KEY.ArrowRight]) {
		velocity(event.entity).x = (velocity(event.entity).x ?? 0) + speed;
	}
};

export const slide = (speed : number) => (event : UpdateEventConfig<unknown, unknown>) => {
	if(data(event.entity).isOnWall && (velocity(event.entity).y ?? 0) > 0) {
		velocity(event.entity).y = speed;
	}
};

export const jump = (speed : number) => (event : UpdateEventConfig<unknown, unknown>) => {
	if(data(event.entity).isOnGround && event.game.keys?.[KEY.Space]) {
		velocity(event.entity).y = -speed;
	}
	if((velocity(event.entity).y ?? 0) < 0 && !event.game.keys?.[KEY.Space]) {
		velocity(event.entity).y = 0;
	}
};