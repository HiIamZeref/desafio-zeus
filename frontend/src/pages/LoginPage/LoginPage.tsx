import "../../App.css";
import theme from "@/styles/theme/default";
import { Container, ThemeProvider, TextField, InputLabel } from "@mui/material";
import logo from "../../assets/meu_icone.png";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userLogin, getUserData } from "@/services/UserApi";
import { User } from "@/@types/types";

function LoginPage() {
  const navigate = useNavigate();
  const credentials: User = {
    email: "felipe@gmail.com",
    password: "123",
  };

  const handleLogin = () => {
    userLogin(credentials)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        getUserData("662aade548bd38e90d729e9c").then((response) => {
          console.log(response.data);
          navigate("/cadastro");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="column" justifyContent="center">
        <Grid textAlign="center">
          <img src={logo} style={{ height: 180, width: 180 }} />
          <h1 className="mainHeader">DogeApp</h1>
        </Grid>
        <Container>
          <h1>Email</h1>
          <TextField>
            <InputLabel>Usuário</InputLabel>
          </TextField>
          <h1>Senha</h1>
          <TextField>
            <InputLabel>Senha</InputLabel>
          </TextField>
          <Button
            className="default-btn"
            variant="contained"
            style={{ display: "block", color: "" }}
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        </Container>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
