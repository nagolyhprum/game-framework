import { rect } from "./rect";
import { Entity, RecursivePartial } from "./types";

export const entity = (
	input : RecursivePartial<Entity>,
) : Entity => {
	return {
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
			x: input.src?.x ?? 0,
			y: input.src?.y ?? 0,
			width: input.src?.width ?? 0,
			height: input.src?.height ?? 0,
		},      
		draw: input.draw ?? rect,    
		events: input.events ?? {},
		text: input.text ?? "",
		update: input.update ?? (() => {}),  
	};
};