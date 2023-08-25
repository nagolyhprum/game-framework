import { rect } from "./rect";
import { Entity, RecursivePartial, UpdateEventConfig } from "./types";

export const id = (event : UpdateEventConfig) => {
	return event.entity.id;
};

export const random = () => {
	return crypto.randomUUID();
};

export const entity = (
	input : RecursivePartial<Entity>,
) : Entity => {
	return {
		id: crypto.randomUUID(),
		x: input.x ?? 0,
		y: input.y ?? 0,
		width: input.width ?? 0,
		height: input.height ?? 0,
		anchor: {
			x: input.anchor?.x ?? 0,
			y: input.anchor?.y ?? 0,
		},
		velocity: {
			x: input.velocity?.x ?? 0,
			y: input.velocity?.y ?? 0,
		},
		name: input.name ?? "",
		data: input.data ?? {},
		align: input.align ?? "left",
		animation: {
			name: input.animation?.name ?? "",
			progress: input.animation?.progress ?? 0,
			previous: "",
		},
		baseline: input.baseline ?? "top",
		fill: input.fill ?? "transparent",
		flip: {
			x: input.flip?.x ?? false,
			y: input.flip?.y ?? false,
		},
		src: {
			name: input.src?.name ?? "",
			column: input.src?.column ?? 0,
			row: input.src?.row ?? 0,
			columns: input.src?.columns ?? 1,
			rows: input.src?.rows ?? 1,
		},      
		draw: input.draw ?? rect,    
		events: input.events ?? {},
		text: input.text ?? "",
		update: input.update ?? (() => {}),  
	};
};