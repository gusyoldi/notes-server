import { generarNotaRandom, obtenerIntervalo } from "./utils.js";
import { NOTAS } from "../data/db.js";
import chalk from "chalk";

export const utilsTests = () => {
  const notaRandomMock = generarNotaRandom();

  // testea generarNotaRandom()
  if (notaRandomMock.id < 1 || notaRandomMock.id > 12)
    throw new Error("el numero random tiene que estar entre 1 y 0");

  if (!NOTAS.includes(notaRandomMock.nota))
    throw new Error("la nota random tiene que estar entre Do y Si");

  // testea obtenerIntervalo()
  const intervalo = obtenerIntervalo(["C", "E"]);
  if (intervalo.name !== "3M") throw new Error("el intervalo no es 3M");

  console.log(chalk.yellow("Los test pasaron"));
};
