import { UpdateEventConfig } from "./types";

export const follow = (name : string, max : {
    x : number;
    y : number;
}) => <T, U>(config : UpdateEventConfig<T, U>) => {
	const self = config.entity;
	const other = config.game.findNode(name);
	if(other) {
		const dx = Math.sign(other.x - self.x);
		const dy = Math.sign(other.y - self.y);
		self.velocity.x = max.x * dx;
		self.velocity.y = max.y * dy;
	}
};