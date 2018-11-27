import http from "./httpService";

const userEndPoint = id => {
  return id ? `${"/users/"}${id}` : `${"/users/"}`;
};
export function registerUser(payload) {
  const data = {
    email: payload.username,
    password: payload.password,
    name: payload.name
  };
  delete data._id;
  return http.post(userEndPoint(), data);
}

export function updateUser(payload) {
  const data = { ...payload };
  delete data._id;
  return http.put(userEndPoint(payload._id), data);
}
