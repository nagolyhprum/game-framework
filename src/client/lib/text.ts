import { DrawEventConfig, TextConfig, WithoutEntityFunctions } from "./types";

const drawText = <T>({
	entity,
	output,
} : DrawEventConfig<T, TextConfig<T>>) => {
	output.setFill(entity.fill);
	output.setTextAlign(entity.align ?? "left");
	output.setTextBaseline(entity.baseline ?? "top");
	output.fillText(entity.text, entity.x, entity.y);
};

export const text = <T>(config : WithoutEntityFunctions<TextConfig<T>>) : TextConfig<T> => {
	return {
		...config,
		draw: drawText,
	};
};