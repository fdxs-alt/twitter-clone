import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import SpecificTweet from "../Components/SpecificTweet";
import ChatroomsPage from "../Pages/ChatroomsPage";
import Followers from "../Pages/Followers";
import Following from "../Pages/Following";
import LoginPage from "../Pages/LoginPage/LoginPage";
import Main from "../Pages/Main/Main";
import ProfilePage from "../Pages/ProfilePage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import SpecificUser from "../Pages/SpecificUser";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoute";

const Index = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={RegisterPage} />
        <PublicRoute exact path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/chats" component={ChatroomsPage} />
        <Route>
          <Layout>
            <ProtectedRoute exact path="/home" component={Main} />
            <ProtectedRoute exact path="/profile" component={ProfilePage} />
            <ProtectedRoute path="/tweet/:id" component={SpecificTweet} />
            <ProtectedRoute path="/users/:id" component={SpecificUser} />
            <ProtectedRoute path="/following/:id" component={Following} />
            <ProtectedRoute path="/followers/:id" component={Followers} />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
};

export default Index;
