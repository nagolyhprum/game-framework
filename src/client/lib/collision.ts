import { toRect } from "./helper";
import { COMPLEMENTS, CollisionEventConfig, Coordinate, Entity, GameConfig, LayerConfig, Output, Rect, UpdateEventConfig } from "./types";

export const collision = {
	checkGround: (event : CollisionEventConfig) => {
		if(event.data.coordinate === "y") {
			event.entity.data.isOnGround = event.data.collision.self.y !== event.data.collision.overlap.y;
		}
	},
	checkWall: (event : CollisionEventConfig) => {
		if(event.data.coordinate === "x") {
			event.entity.data.isOnWall = true;
		}
	},
	bounce: (event : CollisionEventConfig) => {
		event.entity.velocity[event.data.coordinate] = -event.entity.velocity[event.data.coordinate];
	},
	stop: (event : CollisionEventConfig) => {
		event.entity.velocity[event.data.coordinate] = 0;
	},
	resolve: (event : CollisionEventConfig) => {
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
		const sign = Math.sign(entity.velocity[coordinate]);
		const toAlign = (sign > 0 ? self[COMPLEMENTS[coordinate]] : 0) + self[coordinate];
		const alignTo = (sign < 0 ? other[COMPLEMENTS[coordinate]] : 0) + other[coordinate];
		entity[coordinate] = entity[coordinate] - (toAlign - alignTo);
	},
	detect: (callbacks : Record<string, (event : CollisionEventConfig) => void>) => ({
		entity,
		game,
		output,
		layer,
		data: {
			coordinate,
		},
	} : UpdateEventConfig) => {
		const collisions = new Set(Object.keys(callbacks));
		const candidates = layer.entities.filter(entity => collisions.has(entity.name));   
		checkCollisions({
			candidates,
			coordinate,
			entity,
			game,
			output,
			callbacks,
			layer,
		});
	},
};

const checkCollisions = ({
	entity,
	candidates,
	game,
	coordinate,
	output,
	callbacks,
	layer,
} : {
    candidates : Entity[];
    coordinate : Coordinate;
    entity : Entity;
    game : GameConfig;
	output : Output;
	callbacks : Record<string, (event : CollisionEventConfig) => void>;
	layer : LayerConfig;
}) => {         
	candidates.forEach(candidate => {
		const a = toRect(entity);
		const b = toRect(candidate);
		const collision = collides(a, b);
		if(collision) {
			callbacks[candidate.name]({
				entity,
				game,
				output,	
				layer,			
				data: {
					other: candidate,
					coordinate,
					collision: {
						self: a,
						other: b,
						overlap: collision,
					},
				},
			});
		}
	});
};

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