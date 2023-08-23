import { Output } from "../lib/index";
import { ninja } from "./ninja";

export const animation = (output : Output) => ({
	layers: [{
		entities: [
			ninja(output),
		],
	}],
});