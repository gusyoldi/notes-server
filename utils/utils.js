import { INTERVALOS, NOTAS } from "../data/db.js";

export const obtenerIntervalo = (notas) => {
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

export const generarNotaRandom = () => {
  const numeroRandom = Math.trunc(Math.random() * 12 + 1);
  const notaRandom = NOTAS[numeroRandom];

  return {
    nota: notaRandom,
  };
};

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
