import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./component/movies";
import { ToastContainer } from "react-toastify";
import Customers from "./component/customers";
import Rentals from "./component/rentals";
import NotFound from "./component/notFound";
import NavBar from "./component/navBar";
import MovieForm from "./component/movieForm";
import LoginForm from "./component/loginForm";
import RegisterForm from "./component/registerForm";
import Logout from "./component/logout";
import ProtectedRoute from "./component/common/protectedRoute";
import authService from "./services/authService";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

/* 
  1. Shortcut to add path and components in Route
 ** type Route[path][component]*4
  2. In order to pass props through route use Render property instead of Component
 */

class App extends Component {
  state = {};

  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies/new" component={MovieForm} />
            <Route
              path="/movies"
              render={() => <Movies {...this.props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/movies" exact />
            <Route path="/logout" component={Logout} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
