import { Output } from "../types.js";
import { ball } from "./ball.js";
import { bottomGoal, topGoal } from "./goal.js";
import { leftPaddle, rightPaddle } from "./paddle.js";
import { leftScore, rightScore } from "./score.js";
import { bottomWall, topWall } from "./wall.js";

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