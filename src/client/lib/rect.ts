import { DrawEventConfig } from "./types";

export const rect = ({
	entity,
	output,
} : DrawEventConfig) => {
	output.setFill(entity.fill);
	output.fillRect(entity.x, entity.y, entity.width, entity.height);
};