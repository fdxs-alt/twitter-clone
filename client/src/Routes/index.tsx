import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Main from "../Pages/Main/Main";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
const Index = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/main" componenet={Main} />
        </Switch>
      </Router>
    </div>
  );
};

export default Index;
