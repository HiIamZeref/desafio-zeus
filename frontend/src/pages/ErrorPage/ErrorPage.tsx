import theme from "@/styles/theme/default";
import { Container, ThemeProvider } from "@mui/material";
import haru from "@/assets/haruSorrindo.jpeg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Opa...</h1>
          <h2>Acho que você tentou acessar uma página que não existe...</h2>
          <h2>
            Mas não se preocupe! O Haru vai te levar de volta para a página
            inicial!
          </h2>
          <img
            src={haru}
            alt="Haru"
            style={{ width: 400, height: 400, borderRadius: 20 }}
          />
          <Button
            className="default-btn"
            variant="contained"
            style={{ display: "block", color: "" }}
            onClick={() => navigate("/")}
          >
            Voltar a página inicial
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default ErrorPage;
