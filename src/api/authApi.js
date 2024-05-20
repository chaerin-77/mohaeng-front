import axios from "axios";

const authApi = axios.create({
  // baseURL: "http://localhost:9000/api/users", // 내 컴퓨터
  baseURL: "http://192.168.206.61:9000/api/users", // ssafy 컴퓨터
});

export default authApi;
