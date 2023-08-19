import { fileURLToPath } from "url";
import { dirname } from "path";

import express from "express";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "..", "client")));

app.listen(80);