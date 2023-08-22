import { data, velocity } from "./helper";
import { COMPLEMENTS, CollisionEventConfig, UpdateEventConfig } from "./types";

export const bounce = <T, U>(event : CollisionEventConfig<T, U>) => {
	velocity(event.entity)[event.data.coordinate] = -(velocity(event.entity)[event.data.coordinate] ?? 0);
};

export const stop = <T, U>(event : CollisionEventConfig<T, U>) => {
	velocity(event.entity)[event.data.coordinate] = 0;
};

export const all = <T>(...callbacks : Array<(event : T) => void>) => (event : T) => {
	callbacks.forEach(callback => callback(event));
};

export const checkGround = <T, U>(event : CollisionEventConfig<T, U>) => {
	if(event.data.coordinate === "y") {
		data(event.entity).isOnGround = event.data.collision.self.y !== event.data.collision.overlap.y;
	}
};

export const checkWall = <T, U>(event : CollisionEventConfig<T, U>) => {
	if(event.data.coordinate === "x") {
		data(event.entity).isOnWall = true;
	}
};

export const reset = (event : UpdateEventConfig<unknown, unknown>) => {
	data(event.entity).isOnGround = false;
	data(event.entity).isOnWall = false;
};

export const collides = <T, U>(event : CollisionEventConfig<T, U>) => {
	const {
		entity,
		data: {
			coordinate,
			collision: {
				self, 
				other,
			},
		},
	} = event;
	const sign = Math.sign(entity.velocity?.[coordinate] ?? 0);
	const toAlign = (sign > 0 ? (self[COMPLEMENTS[coordinate]] ?? 0) : 0) + self[coordinate];
	const alignTo = (sign < 0 ? (other[COMPLEMENTS[coordinate]] ?? 0) : 0) + other[coordinate];
	entity[coordinate] = (entity[coordinate] ?? 0) - (toAlign - alignTo);
};