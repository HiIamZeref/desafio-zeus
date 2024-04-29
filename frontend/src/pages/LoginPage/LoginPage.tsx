import "../../App.css";
import theme from "@/styles/theme/default";
import { Container, ThemeProvider } from "@mui/material";
import logo from "../../assets/meu_icone.png";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext.tsx";
import { Input } from "antd";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, authenticated } = useContext(AuthContext);

  useEffect(() => {
    if (authenticated) {
      navigate("/cadastro");
    }
  }, [authenticated, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" justifyContent="center">
        <Grid textAlign="center">
          <img src={logo} style={{ height: 180, width: 180 }} />
          <h1 className="mainHeader">DogeApp</h1>
        </Grid>
        <Container>
          <h1>Email</h1>
          <Input
            size="large"
            value={email}
            onChange={(text) => setEmail(text.target.value)}
            placeholder="Digite o email"
          />
          <h1>Senha</h1>
          <Input.Password
            size="large"
            value={password}
            onChange={(text) => setPassword(text.target.value)}
            placeholder="Digite a senha"
          />
          <Button
            className="default-btn"
            variant="contained"
            style={{ display: "block", color: "" }}
            onClick={() => {
              handleLogin(email, password).catch(() => {
                console.log("Erro ao realizar login");
                toast.error("Usuário ou senha inválidos", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              });
            }}
          >
            Login
          </Button>
        </Container>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
