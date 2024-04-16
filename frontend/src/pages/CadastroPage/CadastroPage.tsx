import "../../App.css";
import { Container, ThemeProvider } from "@mui/material";
import theme from "../../styles/theme/default";
import { MyDataGrid } from "../../components/MyDataGrid";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getGastos,
  postGastos,
  getGastosMesAtual,
  getDefaultValues,
} from "../../services/Api";
import Grid from "@mui/material/Unstable_Grid2";
import { ObjectId } from "mongoose";
import { InputNumber, Statistic } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ValueMaxDatePicker } from "../../components/ValueMaxDatePicker";

// Interface para os dados da tabela
interface Row {
  _id: ObjectId;
  data: string;
  quantidade: number;
  dinheiro: number;
}
dayjs.extend(customParseFormat);

interface DefaultValues {
  quantidadeDefault: number;
  dinheiroDefault: number;
  metaGastoMensal: number;
}

function CadastroPage() {
  // Gerando gasto mensal e meta de gastos
  const [gastoMesAtual, setGastoMesAtual] = useState(0);

  // Gerando valores default (metaGastos, data, quantidadeRacao)
  const [metaGastos, setMetaGastos] = useState(10);
  const [quantidadeRacao, setQuantidadeRacao] = useState(10);
  const [valorRacao, setValorRacao] = useState(100);

  // Gerando a data atual
  const [rows, setRows] = useState<Row[]>([]);
  const [data, setData] = useState(dayjs().format("DD/MM/YYYY"));

  // Pegar informações do backend
  useEffect(() => {
    atualizarTabela();
    atualizarGastoMesAtual();
    atualizarDadosDefault();
  }, []);

  const onClickSubmit = () => {
    console.log("Clicou");
    console.log(data);

    const postObject = {
      data: data,
      quantidade: quantidadeRacao,
      dinheiro: valorRacao,
    };
    console.log(postObject);

    // Enviando os dados para o backend
    postGastos(postObject).then(() => {
      atualizarTabela();
    });
  };

  const atualizarTabela = function () {
    getGastos()
      .then((data: Row[]) => {
        console.log(data);
        // Formatando os dados para a tabela
        const newRows = data.map((row) => {
          return {
            ...row,
            id: row["_id"],
          };
        });
        setRows(newRows);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const atualizarGastoMesAtual = function () {
    getGastosMesAtual()
      .then((data) => {
        setGastoMesAtual(data.gastoMensalAtual);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const atualizarDadosDefault = function () {
    getDefaultValues()
      .then((data: DefaultValues[]) => {
        const { quantidadeDefault, dinheiroDefault, metaGastoMensal } = data[0];
        console.log(quantidadeDefault);
        setMetaGastos(metaGastoMensal);
        setQuantidadeRacao(quantidadeDefault);
        setValorRacao(dinheiroDefault);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid xs={12} sm={12} lg={12} textAlign="center">
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              gap={"1rem"}
            >
              <Grid
                xs={12}
                sm={6}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Statistic
                  title="Total gasto nesse mês"
                  value={gastoMesAtual}
                  precision={2}
                  decimalSeparator=","
                  prefix="R$"
                  groupSeparator="."
                />
              </Grid>
              <Grid xs={12} sm={6}>
                <Statistic
                  title="Meta de gastos"
                  value={metaGastos}
                  precision={2}
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Grid
              container
              spacing={1}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Grid xs={12} sm={2}>
                <div>
                  <h3>Data da compra:</h3>
                  <ValueMaxDatePicker
                    style={{ width: "100%" }}
                    value={data}
                    onChange={(newData) => {
                      setData(newData);
                    }}
                  />
                </div>
              </Grid>

              <Grid xs={12} sm={2}>
                <div>
                  <h3>Quantidade comprada:</h3>
                  <InputNumber
                    id="quantidadeRacao"
                    size="large"
                    value={quantidadeRacao}
                    onChange={(value) => {
                      if (value !== null) {
                        setQuantidadeRacao(value);
                      }
                    }}
                    suffix="kg"
                    min={1}
                    max={999.99}
                    style={{ width: "100%" }}
                  />
                </div>
              </Grid>
              <Grid xs={12} sm={2}>
                <div>
                  <h3>Valor gasto: </h3>
                  <InputNumber
                    id="valorRacao"
                    size="large"
                    value={valorRacao}
                    prefix="R$"
                    min={1}
                    max={9999.99}
                    onChange={(value) => {
                      if (value !== null) {
                        setValorRacao(value);
                      }
                    }}
                    style={{ width: "100%" }}
                  />
                </div>
              </Grid>
              <Grid xs={12} sm={2}>
                <Button
                  className="default-btn"
                  variant="contained"
                  size="large"
                  style={{ display: "block", color: "" }}
                  onClick={onClickSubmit}
                >
                  Salvar dados
                </Button>
              </Grid>
              <Grid xs={12} sm={2}>
                <Button
                  className="default-btn"
                  variant="contained"
                  size="large"
                  style={{ display: "block", color: "" }}
                  onClick={atualizarTabela}
                >
                  Atualizar tabela
                </Button>
              </Grid>
              <Grid xs={12} sm={2}>
                <Button
                  className="default-btn"
                  variant="contained"
                  size="large"
                  style={{ display: "block", color: "" }}
                  onClick={atualizarTabela}
                >
                  Entrada Padrão
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} sm={10}>
            <MyDataGrid rows={rows} headerClassName="grid-header" />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default CadastroPage;
