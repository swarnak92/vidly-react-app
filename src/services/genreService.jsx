import http from "./httpService";
import config from "../config.json";

export function getGenres() {
  console.log();
  return http.get(config.apiEndPoint + "/genres");
}
