import React from "react";

export const ConfigContext = React.createContext({});

export const useConfig = () => React.useContext<any>(ConfigContext);

export const ConfigContextProvider = ({ children, config }: any) => {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};
