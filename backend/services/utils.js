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
      total += gasto.quantidade * gasto.dinheiro;
    }
  });

  return total;
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

  return totalObject;
};

export { calcGastoAtual, calcGastoMensalTotal };
