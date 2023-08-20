import { DrawEventConfig, RectConfig, TextConfig, WithoutDraw } from "./types";

const drawRect = <T>({
	entity,
	output,
} : DrawEventConfig<T, TextConfig<T>>) => {
	output.setFill(entity.fill ?? "transparent");
	output.fillRect(entity.x, entity.y, entity.width, entity.height);
};

export const rect = <T>(config : WithoutDraw<RectConfig<T>>) : RectConfig<T> => {
	return {
		...config,
		draw : drawRect,
	};
};