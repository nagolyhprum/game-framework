import { Alignment, Baseline, InputEventConfig, KEY, Output } from "../types.js";

export const BrowserOutput = (canvas : HTMLCanvasElement) : Output => {
	const context = canvas.getContext("2d")!;
	return {
		setFill(fill : string) {
			context.fillStyle = fill;
		},
		fillRect(x : number, y : number, width : number, height : number) {
			context.fillRect(x, y, width, height);
		},
		getWidth() {
			return canvas.width;
		},
		getHeight() {
			return canvas.height;
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
		onEvent(callback : (config : InputEventConfig) => void) {
			canvas.addEventListener("keydown", (event : KeyboardEvent) => {
				callback({
					name : "keydown",
					key : event.key as keyof typeof KEY,
				});
			});
			canvas.addEventListener("keyup", (event : KeyboardEvent) => {
				callback({
					name : "keyup",
					key : event.key as keyof typeof KEY,
				});
			});
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
	};
};