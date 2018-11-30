import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch,} from 'react-router-dom';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {PrivateRoute} from "./components/auth/Auth";

import Mine from "./views/IntegrationsMine";
import Account from "./views/Account";
import Discover from "./views/IntegrationsDiscover";
import SolutionsDiscover from "./views/SolutionsDiscover";
import SolutionsMine from "./views/SolutionsMine";

const App = () => (
    <Router>
        <div>
            <Switch>
                <Redirect exact from="/" to="/integrations/discover"/>
            </Switch>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/account" component={Account}/>
            <PrivateRoute path="/integrations/discover" component={Discover}/>
            <PrivateRoute path="/integrations/mine" component={Mine}/>
            <PrivateRoute path="/solutions/discover" component={SolutionsDiscover}/>
            <PrivateRoute path="/solutions/mine" component={SolutionsMine}/>
        </div>
    </Router>
);

export default App;
