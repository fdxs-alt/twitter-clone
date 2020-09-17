import React, { createContext, PropsWithChildren, useContext } from "react";
import { UserStore } from "./UserStore/UserStore";

type RootStateContextValue = {
  userStore: UserStore;
};

const RootStateContext = createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

const userStore = new UserStore();

export const RootStateProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RootStateContext.Provider value={{ userStore }}>
      {children}
    </RootStateContext.Provider>
  );
};
export const useRootStore = () => useContext(RootStateContext);
