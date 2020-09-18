import { useObserver } from "mobx-react-lite";
import React, { useEffect } from "react";
import LoadingPage from "./Pages/LoadingPage";
import Index from "./Routes";
import { useRootStore } from "./Store/RootStore";
import useInteval from "./utils/useInterval";

const App = () => {
  const { userStore } = useRootStore();

  useEffect(() => {
    userStore.revoke();
  }, []);

  useInteval(() => {
    userStore.revoke();
  }, 3300000);

  return useObserver(() => {
    if (userStore.revokeLoading) return <LoadingPage />;
    return <Index />;
  });
};

export default App;
