import { DrawEventConfig, ImageConfig, WithoutEntityFunctions } from "./types";

const drawImage = <T>({
	entity,
	output,
} : DrawEventConfig<T, ImageConfig<T>>) => {
	const width = entity.width ?? 0;
	const height = entity.height ?? 0;
	output.save();
	output.scale(
		entity.flip?.x ? -1 : 1,
		entity.flip?.y ? -1 : 1,
	);
	output.drawImage(
		entity.src?.name ?? "", 
		(entity.src?.x ?? 0),
		(entity.src?.y ?? 0),
		entity.src?.width ?? width,
		entity.src?.height ?? height,		
		entity.x * (entity.flip?.x ? -1 : 1) - (entity.flip?.x ? width : 0), 
		entity.y * (entity.flip?.y ? -1 : 1) - (entity.flip?.y ? height : 0), 
		width, 
		height,
	);
	output.restore();
};

export const image = <T>(config : WithoutEntityFunctions<ImageConfig<T>>) : ImageConfig<T> => {
	return {
		...config,
		draw: drawImage,
	};
};