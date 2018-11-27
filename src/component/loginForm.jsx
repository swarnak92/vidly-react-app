import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import * as authService from "../services/authService";

/**
 * Thumbrule:
 * 1. We should not access element value using doucment.getElementByID/Class
 * 2. The whole purpose of REACT is put abstraction over DOM.
 * 3. In order to get access DOM element we need to provide reference to each element.
 * 4. Don't use React ref always. Use whenever is required like focusing on input element,
 * using thrid party-library, animation etc.
 * For e.g.
 * const userName = React.createRef();
 * In the DOM element type <input ref={this.userName} />
 * Call lifeCycleHook, componentDidMount
 * // componentDidMount() {
  //   this.username.current.focus();
  // }
 * Now, in the handler we can use as this.userName.current.value to get the input value
 *
 * Other way is, use autoFocus
 * 
 * 5. Before setting the state always do clone it.
 * 6. We shoulddeclare only objects or vairables which will change in future.
 * 7. Joi.vaidation(obj1, obj2, abortEarly: false);
 */

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };
  username = React.createRef();

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
    try {
      await authService.login(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.reference.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (authService.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container">
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
