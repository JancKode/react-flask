import React, { Fragment, Component } from "react";

import Header from "./components/layout/Header";
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Alert from "./components/layout/Alert";
import store from "./store";
import { loadUser } from "./actions/auth";

import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import PrivateRoute from "./components/common/PrivateRoute";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <Alert />
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
