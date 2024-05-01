import express from "express";
import cors from "cors";
// import axios from "axios";
import { obtenerIntervalo, generarNotaRandom } from "./utils/utils.js";
import { utilsTests } from "./utils/utils.test.js";
import dotenv from "dotenv";
import chalk from "chalk";
import fs from "fs";
import bodyParser from "body-parser";

dotenv.config();
const port = 3020;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(bodyParser.json());

app.get("/backend", (req, res) => {
  // Lee el archivo JSON
  fs.readFile("./data/data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error interno del servidor");
      return;
    }

    // Analiza los datos JSON
    const jsonData = JSON.parse(data);
    console.log(jsonData);

    // Envía los datos JSON como respuesta
    res.writeHead(200, { "Content-Type": "application/json" });
    console.log(JSON.stringify(jsonData));
    res.end(JSON.stringify(jsonData));
  });
});

app.post("/intervalo", (req, res) => {
  const body = req.body;

  // console.log("Array de notas", body);
  // console.log("Intervalo elegido", body);
  console.log("Datos recibidos desde el front", body);

  res.send("Datos recibidos correctamente");
  res.end();
});

app.listen(port);
console.log(
  chalk.green(`SERVIDOR FUNCIONANDO EN PUERTO ${chalk.yellow(port)}`)
);

console.log(obtenerIntervalo(["E", "G#"]));
// utilsTests();
