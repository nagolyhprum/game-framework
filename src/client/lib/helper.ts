import { EntityConfig } from "./types";

export const velocity = (entity : EntityConfig<unknown, unknown>) => {
	return entity.velocity = entity.velocity ?? {};
};