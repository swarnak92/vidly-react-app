import http from "./httpService";
import config from "../config.json";

const movieEndPoint = id => {
  return id
    ? `${config.apiEndPoint}${"/movies/"}${id}`
    : `${config.apiEndPoint}${"/movies/"}`;
};

export function getMovies() {
  return http.get(movieEndPoint());
}

export function getMovie(id) {
  return http.get(movieEndPoint(id));
}

export function deleteMovie(id) {
  return http.delete(movieEndPoint(id));
}

export function saveMovie(payload) {
  if (payload._id) {
    const body = { ...payload };
    delete body._id;
    return http.put(movieEndPoint() + payload._id, body);
  }
  return http.post(movieEndPoint(), payload);
}
