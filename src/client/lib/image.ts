import { DrawEventConfig } from "./types";

export const image = ({
	entity,
	output,
} : DrawEventConfig) => {
	output.save();
	output.scale(
		entity.flip.x ? -1 : 1,
		entity.flip.y ? -1 : 1,
	);
	output.drawImage(
		entity.src.name, 
		entity.src.column,
		entity.src.row,
		entity.src.columns,
		entity.src.rows,		
		entity.x * (entity.flip.x ? -1 : 1) - (entity.flip.x ? entity.width : 0), 
		entity.y * (entity.flip.y ? -1 : 1) - (entity.flip.y ? entity.height : 0), 
		entity.width, 
		entity.height,
	);
	output.restore();
};