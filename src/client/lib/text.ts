import { DrawEventConfig } from "./types";

export const text = ({
	entity,
	output,
} : DrawEventConfig) => {
	output.setFill(entity.fill);
	output.setTextAlign(entity.align);
	output.setTextBaseline(entity.baseline);
	output.fillText(entity.text, entity.x, entity.y);
};