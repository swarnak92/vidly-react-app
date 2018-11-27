import http from "./httpService";

const movieEndPoint = id => {
  return id
    ? `${"/movies/"}${id}`
    : `${"/movies/"}`;
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
