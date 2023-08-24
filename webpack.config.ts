const path = require("path");

const shared = {
	mode : process.env.NODE_ENV || "development",
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: "ts-loader",
				exclude: ["/node_modules/"],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|flac|wav|mp3|ogg)$/i,
				type: "asset",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
	},
};

module.exports = [{
	...shared,
	entry: path.join(__dirname, "src", "client", "browser.ts"),
	output: {
		path: path.resolve(__dirname, "dist", "client"),
	},
	target: "web",
}, {
	...shared,
	entry: path.join(__dirname, "src", "server", "index.ts"),
	output: {
		path: path.resolve(__dirname, "dist", "server"),
	},
	target: "node",
}];