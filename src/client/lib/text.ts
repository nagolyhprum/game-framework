import { DrawEventConfig, TextConfig, WithoutDraw } from "./types.js";

const drawText = <T>({
	entity,
	output,
} : DrawEventConfig<T, TextConfig<T>>) => {
	output.setFill(entity.fill);
	output.setTextAlign(entity.align ?? "left");
	output.setTextBaseline(entity.baseline ?? "top");
	output.fillText(entity.text, entity.x, entity.y);
};

export const text = <T>(config : WithoutDraw<TextConfig<T>>) : TextConfig<T> => {
	return {
		...config,
		draw : drawText,
	};
};