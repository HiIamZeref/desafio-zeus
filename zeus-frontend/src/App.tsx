import "./App.css";
import { Container, ThemeProvider } from "@mui/material";
import theme from "./styles/theme/default";
import { TextField } from "@mui/material";
import { MyDataGrid } from "./components/MyDataGrid";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getDados, postDados } from "./services/Api";
import Grid from "@mui/material/Unstable_Grid2";
import { ObjectId } from "mongoose";
import { InputNumber } from "antd";

// Interface para os dados da tabela
interface Row {
  _id: ObjectId;
  data: string;
  quantidade: number;
  dinheiro: number;
}

function App() {
  // Gerando a data atual
  const dateGen = new Date();
  const formattedDate = dateGen.toISOString().split("T")[0];

  const [rows, setRows] = useState<Row[]>([]);

  const [data, setData] = useState(formattedDate);
  const [quantidadeRacao, setQuantidadeRacao] = useState(10);
  const [valorRacao, setValorRacao] = useState(100);

  // Pegar informações do backend
  useEffect(() => {
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
  }, []);

  const onClickSubmit = () => {
    console.log("Clicou");
    console.log(data, quantidadeRacao, valorRacao);

    // Enviando os dados para o backend
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} lg={6} className="text-field-container">
            <h3>Data da compra:</h3>
            <TextField
              id="dataCompra"
              label="Date"
              type="date"
              defaultValue={data} // 2024-04-05
              onChange={(e) => {
                setData(e.target.value);
              }}
              placeholder="05/04/2024"
              InputLabelProps={{
                shrink: true,
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
            />
            <h3>Valor gasto: </h3>
            <InputNumber
              id="valorRacao"
              size="large"
              style={{ width: "100%" }}
              value={valorRacao}
              prefix="R$"
              min={1}
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
            <MyDataGrid rows={rows} headerClassName="grid-header" />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
