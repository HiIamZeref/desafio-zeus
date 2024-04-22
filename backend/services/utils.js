import dayjs from "dayjs";

// gastoSample = {
//   data: "2021-09-01",
//   quantidade: 1,
//   dinheiro: 1.5,
// };

const calcGastoAtual = (gastosList) => {
  const currentMonth = dayjs().month() + 1;

  let total = 0;
  gastosList.forEach((gasto) => {
    const gastoMes = Number(gasto.data.split("/")[1]);

    if (gastoMes === currentMonth) {
      total += gasto.dinheiro;
    }
  });

  return total.toFixed(2);
};

const calcGastoMensalTotal = (gastosList) => {
  let assignmentObject = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };
  let totalObject = {
    Janeiro: 0,
    Fevereiro: 0,
    Março: 0,
    Abril: 0,
    Maio: 0,
    Junho: 0,
    Julho: 0,
    Agosto: 0,
    Setembro: 0,
    Outubro: 0,
    Novembro: 0,
    Dezembro: 0,
  };

  gastosList.forEach((gasto) => {
    const splitData = gasto.data.split("/");
    const getMonth = Number(splitData[1]);
    const getYear = Number(splitData[2]);

    if (getYear === dayjs().year()) {
      totalObject[assignmentObject[getMonth]] += gasto.dinheiro;
    }
  });

  //Itere pelo totalobject e arredonde os valores
  for (const key in totalObject) {
    totalObject[key] = totalObject[key].toFixed(2);
  }

  return totalObject;
};

function ordenarListaPorData(array) {
  array.sort((a, b) => {
    const [dayA, monthA, yearA] = a.data.split("/");
    const [dayB, monthB, yearB] = b.data.split("/");

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateB - dateA; // Ordena do mais recente para o mais antigo
  });

  return array;
}

export { calcGastoAtual, calcGastoMensalTotal, ordenarListaPorData };
