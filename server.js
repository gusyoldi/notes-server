import express from "express";
import cors from "cors";
// import axios from "axios";
const port = process.env.PORT ?? 3020;

const app = express();
app.use(cors());
app.use(express.json());

const database = [
  { name: "frank", email: "user@mail.com" },
  { name: "frank", email: "user@mail.com" },
];

app.get("/", (req, res) => {
  res.json(database);
});

app.post("/edit", (req, res) => {
  console.log("REQ BODY", req.body);
  database.push(req.body);
  res.json(database);
});

app.delete("/delete", (req, res) => {
  console.log("REQ PARAMS", req.params);
  database.pop();
  res.json(database);
  console.log("OBJECT DELETED");
});

app.listen(port);
console.log("SERVIDOR ANDÓ");

//devuelve pokemones de una API publica
// const API_URL = "https://pokeapi.co/api/v2/pokemon/ditto";
// axios.get(API_URL).then((res) => console.log(res.data));

// Funcionalidad Main:
// Tira 2 tonalidades random en la pantalla y el usuario tiene que elegir un intervalo, si es el correcto: "Siguiente intervalo", si es incorrecto: "Peep, elegi otro"

// DATA
const NOTAS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const INTERVALOS = [
  { name: "Unisono", semitonos: 0 },
  { name: "2m", semitonos: 1 },
  { name: "2M", semitonos: 2 },
  { name: "3m", semitonos: 3 },
  { name: "3M", semitonos: 4 },
  { name: "4J", semitonos: 5 },
  { name: "4+", semitonos: 6 },
  { name: "5J", semitonos: 7 },
  { name: "6m", semitonos: 8 },
  { name: "6M", semitonos: 9 },
  { name: "7m", semitonos: 10 },
  { name: "7M", semitonos: 11 },
  { name: "8va", semitonos: 12 },
];

// generar nota al azar
const generarNotaRandom = () => {
  const numeroRandom = Math.trunc(Math.random() * 12 + 1);
  const notaRandom = NOTAS[numeroRandom];

  return {
    id: numeroRandom,
    nota: notaRandom,
  };
};

// hacer que reciba 2 notas random y devuelva el intervalo correcto

//Buscar el index la nota en la escala
const posicionDeLaNotaEnLaEscala = (notaBuscada) =>
  NOTAS.findIndex((nota) => nota === notaBuscada);

const calcularIntervaloOpuesto = (intervalo) => 12 - Math.abs(intervalo);

const calcularDistanciaEnSemitonos = (
  posicionSegundaNota,
  posicionPrimerNota
) => {
  const distanciaEnSemitonos = posicionSegundaNota - posicionPrimerNota;

  if (distanciaEnSemitonos < 0) {
    return calcularIntervaloOpuesto(distanciaEnSemitonos);
  } else {
    return distanciaEnSemitonos;
  }
};

const obtenerIntervalo = (notas) => {
  // separar las notas ingresadas
  const [primerNota, segundaNota] = notas;

  const posicionPrimerNota = posicionDeLaNotaEnLaEscala(primerNota);
  const posicionSegundaNota = posicionDeLaNotaEnLaEscala(segundaNota);

  const distanciaEnSemitonos = calcularDistanciaEnSemitonos(
    posicionSegundaNota,
    posicionPrimerNota
  );

  const buscarIntervaloPorDistanciaEnSemitonos = (distanciaEnSt) =>
    INTERVALOS.find(({ semitonos }) => semitonos === distanciaEnSt);

  const intervalo =
    buscarIntervaloPorDistanciaEnSemitonos(distanciaEnSemitonos);

  return intervalo;
};

// TESTS
const testeaCosas = () => {
  const notaRandomMock = generarNotaRandom();
  // testea generarNotaRandom()
  if (notaRandomMock.id < 1 || notaRandomMock.id > 12)
    throw new Error("el numero random tiene que estar entre 1 y 0");

  if (!NOTAS.includes(notaRandomMock.nota))
    throw new Error("la nota random tiene que estar entre Do y Si");

  const intervalo = obtenerIntervalo(["C", "E"]);

  if (intervalo.name !== "3M") throw new Error("el intervalo no es 3M");
  return "Los test pasaron";
};

// console.log(generarNotaRandom());
console.log(obtenerIntervalo(["C", "E"]));
console.log(testeaCosas());
