import React from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";

const Table = ({ movies, onDelete, onLike, sortColumn, onSort, columns }) => {
  return (
    <table className="table">
      <TableHead columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        data={movies}
        columns={columns}
        onLike={onLike}
        onDelete={onDelete}
      />
    </table>
  );
};

export default Table;
