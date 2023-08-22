import { velocity } from "./helper";
import { COMPLEMENTS, COORDINATES, Coordinate, EntityConfig, GameConfig, Rect } from "./types";

export const update = <T>(config : GameConfig<T>, delta : number) => {
	config.scenes[config.scene].layers.forEach(layer => {
		layer.entities.forEach(entity => {
			entity.events?.update?.({
				entity,
				game: config,
				data: {
					delta,
				},
			});
			const collisions = new Set(Object.keys(entity.events?.collision ?? {}));
			const candidates = layer.entities.filter(entity => collisions.has(entity.name ?? ""));   
			COORDINATES.forEach(coordinate => updateCoordinate({
				candidates,
				coordinate,
				delta,
				entity,
				config,
			}));
		});
	});
};

const updateCoordinate = <T, U>({
	entity,
	delta,
	candidates,
	config,
	coordinate,
} : {
    entity : EntityConfig<T, U>;
    delta : number;
    candidates : EntityConfig<T, U>[];
    config : GameConfig<T>;
    coordinate : Coordinate;
}) => {         
	const force = (config.gravity?.[coordinate] ?? 0) * (entity.weight ?? 0) * delta * delta;
	velocity(entity)[coordinate] = (velocity(entity)[coordinate] ?? 0) + force;
	entity[coordinate] += (entity.velocity?.[coordinate] ?? 0) * delta;
	candidates.forEach(candidate => {
		const a = toRect(entity);
		const b = toRect(candidate);
		const collision = collides(a, b);
		if(collision) {
			const sign = Math.sign(entity.velocity?.[coordinate] ?? 0);
			const toAlign = (sign > 0 ? (a[COMPLEMENTS[coordinate]] ?? 0) : 0) + a[coordinate];
			const alignTo = (sign < 0 ? (b[COMPLEMENTS[coordinate]] ?? 0) : 0) + b[coordinate];
			entity[coordinate] -= toAlign - alignTo;
			entity.events?.collision?.[candidate?.name ?? ""]?.({
				entity,
				game: config,
				data: {
					other: candidate,
					coordinate,
					collision,
				},
			});
		}
	});
};

const toRect = (entity : EntityConfig<unknown, unknown>) : Rect => ({
	x: entity.x - ((entity.width ?? 0) * (entity.anchor?.x ?? 0)),
	y: entity.y - ((entity.height ?? 0) * (entity.anchor?.y ?? 0)),
	width: entity.width ?? 0,
	height: entity.height ?? 0,
});

const collides = (a : Rect, b : Rect) => {
	const left = Math.max(a.x, b.x);
	const right = Math.min(a.x + a.width, b.x + b.width);
	const top = Math.max(a.y, b.y);
	const bottom = Math.min(a.y + a.height, b.y + b.height);
	const rect : Rect = {
		x: left,
		y: top,
		width: right - left,
		height: bottom - top,
	};
	return rect.width > 0 && rect.height > 0 ? rect : null;
};