import http from "./httpService";
import jwtDecode from "jwt-decode";
import config from "../config.json";

const tokenKey = "token";

http.setJwt(getJwt());

const authEndPoint = () => {
  return `${config.apiEndPoint}${"/auth"}`;
};

export async function login(payload) {
  const data = { email: payload.username, password: payload.password };
  const response = await http.post(authEndPoint(), data);
  localStorage.setItem(tokenKey, response.data);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt
};
