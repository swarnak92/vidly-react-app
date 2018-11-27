import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    }
  ];

  deleteColumn() {
    return {
      key: "delete",
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    };
  }

  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn());
    }
  }

  render() {
    const { movies, onDelete, onLike, sortColumn, onSort } = this.props;
    return (
      <Table
        movies={movies}
        onLike={onLike}
        onSort={onSort}
        sortColumn={sortColumn}
        onDelete={onDelete}
        columns={this.columns}
      />
    );
  }
}

export default MoviesTable;
