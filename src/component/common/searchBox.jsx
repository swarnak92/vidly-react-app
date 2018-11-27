import React from "react";

const SearchBox = ({ onChange, value }) => {
  return (
    <div>
      <input
        className="form-control"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default SearchBox;
