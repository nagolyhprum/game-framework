import express from "express";
import path from "path";

const index = `<!doctype html>
<html>
    <body>
        <canvas tabindex="1" width="640" height="480"></canvas>
        <script src="main.js"></script>
    </body>
</html>`;

const app = express();

app.use(express.static(path.join(__dirname, "..", "client")));

app.get("/", (_, res) => {
	res.send(index);
});

app.listen(80);