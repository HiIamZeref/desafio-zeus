import { ReactNode, useState, createContext, useEffect } from "react";
import { userLogin } from "../services/UserApi.ts";
import { api } from "@/services/Api.ts";
import { getUserData } from "@/services/UserApi.ts";
import { toast } from "react-toastify";

export const AuthContext = createContext({});
// export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (authenticated) {
      getUserData("662aade548bd38e90d729e9c").then((response) => {
        console.log(response.data);
      });
    }
  }, [authenticated]);

  async function handleLogin(email: string, password: string) {
    if (email === "" || password === "") {
      toast.error("Preencha todos os campos", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const { data } = await userLogin({
      email: email,
      password: password,
    });

    if (!data.token) {
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
      return;
    }

    localStorage.setItem("token", data.token);
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    setAuthenticated(true);

    console.log(data);
    console.log(authenticated);
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.common["Authorization"] = undefined;
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, handleLogin, handleLogout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
