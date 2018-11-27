import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-grouup">
      <label htmlFor="movieForm">{label}</label>
      <select className="form-control" name={name} id={name} {...rest}>
        <option value="" />
        {options.map(item => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
