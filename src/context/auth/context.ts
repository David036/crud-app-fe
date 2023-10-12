import { createContext } from "react";

export const AuthContext = createContext(
  {} as { isAuth: boolean; setIsAuth: (isAuth: boolean) => void }
);
