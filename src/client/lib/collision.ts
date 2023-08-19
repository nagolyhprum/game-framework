import { CollisionEventConfig } from "../types";

export const bounce = <T, U>(event : CollisionEventConfig<T, U>) => {
	event.entity.velocity[event.data.coordinate] *= -1;
};

export const stop = <T, U>(event : CollisionEventConfig<T, U>) => {
	event.entity.velocity[event.data.coordinate] = 0;
};