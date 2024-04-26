import { createContext, useContext } from "react";
import { ReactNode } from "react";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
