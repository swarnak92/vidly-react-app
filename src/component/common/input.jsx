import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor="loginForm">{label}</label>
      <input
        className="form-control"
        autoFocus={name}
        id={name}
        name={name}
        {...rest}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
