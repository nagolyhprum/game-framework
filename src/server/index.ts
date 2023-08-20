import express from "express";
import path from "path";

const index = `<!doctype html>
<html>
    <body>
        <canvas></canvas>
        <script src="main.js"></script>
    </body>
</html>`;

const app = express();

app.use(express.static(path.join(__dirname, "..", "client")));

app.get("/", (_, res) => {
	res.send(index);
});

app.listen(80);