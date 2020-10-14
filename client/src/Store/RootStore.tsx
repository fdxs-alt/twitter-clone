import React, { createContext, PropsWithChildren, useContext } from "react";
import { ChatStore } from "./ChatStore";
import { TweetStore } from "./TweetStore";
import { UserStore } from "./UserStore";

type RootStateContextValue = {
  userStore: UserStore;
  tweetStore: TweetStore;
  chatStore: ChatStore;
};

const RootStateContext = createContext<RootStateContextValue>(
  {} as RootStateContextValue
);

const userStore = new UserStore();
const tweetStore = new TweetStore(userStore);
const chatStore = new ChatStore(userStore);
export const RootStateProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <RootStateContext.Provider value={{ userStore, tweetStore, chatStore }}>
      {children}
    </RootStateContext.Provider>
  );
};
export const useRootStore = () => useContext(RootStateContext);
