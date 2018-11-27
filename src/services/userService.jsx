import http from "./httpService";
import config from "../config.json";

const userEndPoint = id => {
  return id
    ? `${config.apiEndPoint}${"/users/"}${id}`
    : `${config.apiEndPoint}${"/users/"}`;
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
