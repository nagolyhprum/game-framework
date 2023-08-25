import { Entity, Rect } from "./types";

export const toRect = (entity : Entity<unknown, unknown>) : Rect => ({
	x: entity.x - entity.width * entity.anchor.x,
	y: entity.y - entity.height * entity.anchor.y,
	width: entity.width,
	height: entity.height,
});

export const all = <T>(...callbacks : Array<(event : T) => void>) => (event : T) => {
	callbacks.forEach(callback => callback(event));
};