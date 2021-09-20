import React from "react";
import "./theme/index.css";
// This enables css prop: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/31245
import * as types from "styled-components/cssprop";
import { Login } from "./views/Public/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./views/Public/Home";
import { SignUp } from "./views/Public/SignUp";
import { ResetPassword } from "./views/Public/ResetPassword";
import { Account } from "./views/Account/Account";
import { PageModel } from "./views/Project/PageModel";
import { ProjectHome } from "./views/Project/Home";
import { PageContent } from "./views/Project/PageContent";
import { Layout } from "./views/Project/_Layout";
import { SiteSettings } from "./views/Project/Settings/SiteSettings";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./PrivateRoute";
import { MyProfile } from "./views/Account/MyProfile";
import { ProjectProvider } from "./context/ProjectContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forgot-my-password" component={ResetPassword} />

          <PrivateRoute exact path="/account/projects" component={Account} />
          <PrivateRoute exact path="/account/profile" component={MyProfile} />

          <ProjectProvider>
            <PrivateRoute
              exact
              path="/project/:projectId"
              component={ProjectHome}
            />
            <PrivateRoute
              exact
              path="/project/:projectId/content/:modelId"
              component={PageContent}
            />
            <PrivateRoute
              exact
              path="/project/:projectId/model/:modelId"
              component={PageModel}
            />
            <Route exact path="/project/:projectId/site-settings">
              <SiteSettings />
            </Route>
          </ProjectProvider>

          <Route path="/project">
            <PageModel />
          </Route>
          <Route path="/project-content">
            <PageContent />
          </Route>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
