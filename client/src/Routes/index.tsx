import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Main from "../Pages/Main/Main";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoute";
const Index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={RegisterPage} />
          <PublicRoute exact path="/login" component={LoginPage} />
          <ProtectedRoute exact path="/main" component={Main} />
        </Switch>
      </Router>
    </div>
  );
};

export default Index;
