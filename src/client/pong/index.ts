import { Output } from "../lib/types";
import { ball } from "./ball";
import { bottomGoal, topGoal } from "./goal";
import { leftPaddle, rightPaddle } from "./paddle";
import { leftScore, rightScore } from "./score";
import { bottomWall, topWall } from "./wall";

export const pong = (output : Output) => ({
	layers : [{
		entities : [
			leftScore,
			rightScore(output),
		],
	}, {
		entities : [
			topGoal(output),
			bottomGoal(output),
			leftPaddle(output),
			rightPaddle(output),
			topWall(output),
			bottomWall(output),
			ball(output),
		],
	}],
});