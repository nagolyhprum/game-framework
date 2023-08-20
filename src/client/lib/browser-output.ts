import { Alignment, Baseline, InputEventConfig, KEY, Output } from "./types";

export const BrowserOutput = (selector : string, width : number, height : number) : Output => {
	const canvas = document.querySelector<HTMLCanvasElement>(selector)!;
	canvas.width = width * devicePixelRatio;
	canvas.height = height * devicePixelRatio;
	canvas.style.width = `${width}px`;
	canvas.style.height = `${height}px`;
	canvas.tabIndex = 0;
	const context = canvas.getContext("2d")!;
	context.scale(devicePixelRatio, devicePixelRatio);
	return {
		onEvent(callback : (config : InputEventConfig) => void) {
			const isDown : Record<string, boolean> = {};
			canvas.addEventListener("keydown", (event : KeyboardEvent) => {
				if(!isDown[event.key]) {
					callback({
						name: "keydown",
						key: event.key as keyof typeof KEY,
					});
					isDown[event.key] = true;
				}
			});
			canvas.addEventListener("keyup", (event : KeyboardEvent) => {
				callback({
					name: "keyup",
					key: event.key as keyof typeof KEY,
				});
				isDown[event.key] = false;
			});
		},	
		setFill(fill : string) {
			context.fillStyle = fill;
		},
		fillRect(x : number, y : number, width : number, height : number) {
			context.fillRect(x, y, width, height);
		},
		getWidth() {
			return width;
		},
		getHeight() {
			return height;
		},
		save() {
			context.save();
		},
		restore() {
			context.restore();
		},
		translate(x : number, y : number) {
			context.translate(x, y);
		},
		fillText(text : string, x : number, y : number) {
			context.fillText(text, x, y);        
		},
		setTextAlign(align : Alignment) {
			context.textAlign = align;
		},
		setTextBaseline(align : Baseline) {
			context.textBaseline = align;
		},
		path(builder : (context : CanvasRenderingContext2D) => void) {
			context.beginPath();
			builder(context);
		},
		setStroke(stroke : string) {
			context.strokeStyle = stroke;
		},
		stroke() {
			context.stroke();
		},
		fill() {
			context.fill();
		},
		setDash(dash : number[]) {
			context.setLineDash(dash);
		},
		strokeRect(x : number, y : number, width : number, height : number) {
			context.strokeRect(x, y, width, height);
		},	
		clear(color : string) {
			context.fillStyle = color;
			context.fillRect(0, 0, width, height);
		},
	};
};