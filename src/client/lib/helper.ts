import { EntityConfig, Rect } from "./types";

export const velocity = (entity : EntityConfig<unknown, unknown>) => {
	return entity.velocity = entity.velocity ?? {};
};

export const data = (entity : EntityConfig<unknown, unknown>) => {
	return entity.data = entity.data ?? {};
};

export const toRect = (entity : EntityConfig<unknown, unknown>) : Rect => ({
	x: entity.x - ((entity.width ?? 0) * (entity.anchor?.x ?? 0)),
	y: entity.y - ((entity.height ?? 0) * (entity.anchor?.y ?? 0)),
	width: entity.width ?? 0,
	height: entity.height ?? 0,
});