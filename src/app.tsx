import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound';
import Kabinet from './pages/Kabinet';
import Timer from './pages/time';

import {createStore, applyMiddleware} from 'redux';

import {Provider} from 'react-redux';
import auth from './reducers/auth';

import thunk from 'redux-thunk';

let store = createStore(auth, applyMiddleware(thunk));
let token = localStorage.getItem("token");
let userString = localStorage.getItem("user");

if(token && userString){
    console.log (token, userString);
    store.dispatch({
        type: "CHANGE_AUTH",
        token, 
        user: JSON.parse(userString),
        is_auth: true
    });
}

ReactDOM.render(
    <Provider store = {store}>
    <HashRouter>
        <div>
           <Switch>
                <Timer/>
                <Route path = "/" exact  component = {Home}/>
                <Route path = "/kabinet" exact  component = {Kabinet}/>
                <Route path = "/login" exact component = {Login}/>
                <Route path = "/registration" exact component = {Registration}/>
                <Route path = "/not-found" exact  component = {NotFound}/>
                <NotFound/>
            </Switch>
        </div>
    </HashRouter>
    </Provider>,
    document.getElementById("root")
)