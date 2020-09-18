import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useRootStore } from "../Store/RootStore";

const ProtectedRoutes: React.FC<{
  component: React.FC;
  path: string;
  exact?: boolean;
}> = (props) => {
  const { userStore } = useRootStore();

  return userStore.isAuthenticated ? (
    <Redirect to="/main" />
  ) : (
    <Route path={props.path} exact={props.exact} component={props.component} />
  );
};

export default ProtectedRoutes;
