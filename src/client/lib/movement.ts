import { KEY, UpdateEventConfig } from "./types";

export const movement = {
	follow: (name : string, max : {
		x : number;
		y : number;
	}) => (config : UpdateEventConfig<unknown, unknown>) => {
		const self = config.entity;
		const other = config.game.findNode(name);
		if(other) {
			const selfCenter = {
				x: self.x + self.width / 2 - self.width * self.anchor.x,
				y: self.y + self.height / 2 - self.height * self.anchor.y,
			};
			const otherCenter = {
				x: other.x + other.width / 2 - other.width * other.anchor.x,
				y: other.y + other.height / 2 - other.height * other.anchor.y,
			};
			const dx = Math.sign(otherCenter.x - selfCenter.x);
			const dy = Math.sign(otherCenter.y - selfCenter.y);
			self.velocity.x = max.x * dx;
			self.velocity.y = max.y * dy;
		}
	},
	vertical: (speed : number) => (event : UpdateEventConfig<unknown, unknown>) => {
		event.entity.velocity.y = 0;
		if(event.game.keys[KEY.ArrowUp]) {
			event.entity.velocity.y = -speed;
		}
		if(event.game.keys[KEY.ArrowDown]) {
			event.entity.velocity.y = event.entity.velocity.y + speed;
		}
	},
	horizontal: (speed : number) => (event : UpdateEventConfig<unknown, unknown>) => {
		event.entity.velocity.x = 0;
		if(event.game.keys[KEY.ArrowLeft]) {
			event.entity.velocity.x = -speed;
		}
		if(event.game.keys[KEY.ArrowRight]) {
			event.entity.velocity.x = event.entity.velocity.x + speed;
		}
	},
	slide: (speed : number) => (event : UpdateEventConfig<unknown, unknown>) => {
		if(event.entity.data.isOnWall && event.entity.velocity.y > 0) {
			event.entity.velocity.y = speed;
		}
	},
	jump: (speed : number) => (event : UpdateEventConfig<unknown, unknown>) => {
		if(event.entity.data.isOnGround && event.game.keys[KEY.Space]) {
			event.entity.velocity.y = -speed;
		}
		if(event.entity.velocity.y < 0 && !event.game.keys[KEY.Space]) {
			event.entity.velocity.y = 0;
		}
	},
	update: (event : UpdateEventConfig<unknown, unknown>) => {
		event.entity[event.data.coordinate] = event.entity[event.data.coordinate] + event.entity.velocity[event.data.coordinate] * event.data.delta;
		if(event.data.coordinate === "y") {
			event.entity.data.isOnGround = false;
		} else {
			event.entity.data.isOnWall = false;
		}
	},
	gravity: (direction : {
		x ?: number;
		y ?: number;
	}) => (event : UpdateEventConfig<unknown, unknown>) => {
		event.entity.velocity[event.data.coordinate] += (direction[event.data.coordinate] ?? 0) * event.data.delta;
	},
};