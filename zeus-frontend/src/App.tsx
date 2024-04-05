import "./App.css";
import { Container, ThemeProvider } from "@mui/material";
import theme from "./styles/theme/default";
import { TextField } from "@mui/material";
import { MyDataGrid } from "./components/MyDataGrid";

function App() {
  const dateGen = new Date();
  const formattedDate = dateGen.toISOString().split("T")[0];

  const testRows = [
    { id: 1, data: "2024-04-05", quantidade: 5, dinheiro: 100.0 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="div-container">
            <h3>Data da compra:</h3>
            <TextField
              id="date"
              label="Date"
              type="date"
              defaultValue={formattedDate} // 2024-04-05
              placeholder="05/04/2024"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <h3>Quantidade comprada:</h3>
            <TextField
              id="quantidade"
              type="number"
              defaultValue="5"
              InputProps={{
                endAdornment: "kg",
              }}
            />
            <h3>Dinheiro gasto: </h3>
            <TextField
              id="dinheiro"
              type="number"
              defaultValue="100.00"
              InputProps={{
                startAdornment: "R$",
              }}
            />
          </div>
          <div className="div-container">
            <MyDataGrid rows={testRows} headerClassName="grid-header" />
          </div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
