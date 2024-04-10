import "../../App.css";
import { Container, ThemeProvider } from "@mui/material";
import theme from "../../styles/theme/default";
import { MyDataGrid } from "../../components/MyDataGrid";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getDados, postDados } from "../../services/Api";
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

function CadastroPage() {
  // Gerando a data atual
  const formattedDate = dayjs().format("YYYY-MM-DD");
  const [rows, setRows] = useState<Row[]>([]);

  const [data, setData] = useState(formattedDate);
  const [quantidadeRacao, setQuantidadeRacao] = useState(10);
  const [valorRacao, setValorRacao] = useState(100);

  // Pegar informações do backend
  useEffect(() => {
    atualizarTabela();
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
    postDados(postObject).then(() => {
      atualizarTabela();
    });
  };

  const atualizarTabela = function () {
    getDados()
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

  return (
    <ThemeProvider theme={theme}>
      <Container maxHeight="lg">
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} lg={6} className="text-field-container">
            <h3>Data da compra:</h3>

            <ValueMaxDatePicker
              value={data}
              maxDate={data}
              onChange={() => {
                setData(data);
              }}
            />

            <h3>Quantidade comprada:</h3>
            <InputNumber
              id="quantidadeRacao"
              size="large"
              style={{ width: "100%" }}
              value={quantidadeRacao}
              onChange={(value) => {
                if (value !== null) {
                  setQuantidadeRacao(value);
                }
              }}
              suffix="kg"
              min={1}
              max={999.99}
            />
            <h3>Valor gasto: </h3>
            <InputNumber
              id="valorRacao"
              size="large"
              style={{ width: "100%" }}
              value={valorRacao}
              prefix="R$"
              min={1}
              max={9999.99}
              onChange={(value) => {
                if (value !== null) {
                  setValorRacao(value);
                }
              }}
            />
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
          <Grid xs={12} sm={6} lg={6}>
            <Statistic
              title="Total gasto nesse mês"
              value={100}
              precision={2}
              decimalSeparator=","
            />
            <MyDataGrid rows={rows} headerClassName="grid-header" />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default CadastroPage;
