import { DrawEventConfig, RectConfig, WithoutEntityFunctions } from "./types";

const drawRect = <T>({
	entity,
	output,
} : DrawEventConfig<T, RectConfig<T>>) => {
	output.setFill(entity.fill ?? "transparent");
	output.fillRect(entity.x, entity.y, entity.width ?? 0, entity.height ?? 0);
};

export const rect = <T>(config : WithoutEntityFunctions<RectConfig<T>>) : RectConfig<T> => {
	return {
		...config,
		draw: drawRect,
	};
};