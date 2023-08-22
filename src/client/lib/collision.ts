import { velocity } from "./helper";
import { CollisionEventConfig } from "./types";

export const bounce = <T, U>(event : CollisionEventConfig<T, U>) => {
	velocity(event.entity)[event.data.coordinate] = -(velocity(event.entity)[event.data.coordinate] ?? 0);
};

export const stop = <T, U>(event : CollisionEventConfig<T, U>) => {
	velocity(event.entity)[event.data.coordinate] = 0;
};