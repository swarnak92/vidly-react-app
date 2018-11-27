import React, { Component } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    geners: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  handleDeleteEvent = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(key => key._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted!");

      this.setState({ movies: originalMovies });
    }
  };

  handleLikeEvent = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const geners = [{ _id: "", name: "All Items" }, ...data];
    const { data: movies } = await getMovies();

    this.setState({ movies, geners });
  }

  handleGenersSelect = geners => {
    this.setState({ selectedGenre: geners, searchQuery: "", currentPage: 1 });
  };

  handleSortEvent = sortColumn1 => {
    this.setState({ sortColumn: sortColumn1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      selectedGenre,
      movies: alloMovies,
      sortColumn,
      searchQuery
    } = this.state;

    let filtered = alloMovies;

    if (searchQuery) {
      filtered = alloMovies.filter(movie =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = alloMovies.filter(
        movie => movie.genre._id === selectedGenre._id
      );
    }

    // Sorting
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // Pagination
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // const count = this.state.movies.length;
    const { currentPage, pageSize, geners, sortColumn } = this.state;
    const { user } = this.props;
    // if (count === 0) return <p>There are no movies to display!</p>;

    const { totalCount, data: movies, searchQuery } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={geners}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenersSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
          )}
          <p>Total {totalCount} movie(s) are currently available.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLikeEvent}
            onDelete={this.handleDeleteEvent}
            onSort={this.handleSortEvent}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
export default Movies;
