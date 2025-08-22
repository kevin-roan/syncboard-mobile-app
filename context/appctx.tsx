import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(undefined);

interface Props {
  children: React.ReactNode;
}

interface Workspace {
  id: string;
  name: string;
  owner: string;
}

const AppProvider = ({ children }: Props) => {
  const [workspace, setWorkspace] = useState<Workspace>({
    id: "",
    name: "",
    owner: "",
  });
  return (
    <AppContext.Provider
      value={{
        workspace,
        setWorkspace,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export { AppProvider, AppContext };
export const useApp = () => useContext(AppContext);
