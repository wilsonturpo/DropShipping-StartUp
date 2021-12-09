import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {  Route, Switch, Router } from 'react-router-dom'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import NotFound from './components/NotFound'
import { createBrowserHistory } from 'history'
import 'react-toastify/dist/ReactToastify.min.css'
import { ToastContainer } from 'react-toastify'
import { LoadingComponent } from './components/LoadingComponent'

export const history = createBrowserHistory()
ReactDOM.render(
  <React.Fragment>
    <ToastContainer position="bottom-right" />
  <Router history={history}>
    <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
        <Route exact component={NotFound} />
        <Route exact path="/loading" component={LoadingComponent}/>
    </Switch>
    </Router>
  </React.Fragment>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
