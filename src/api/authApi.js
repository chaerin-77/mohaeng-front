import axios from "axios";

const authApi = axios.create({
  baseURL: "http://192.168.206.61:9000/api/users", // ssafy 컴퓨터
  // baseURL: "http://172.30.1.86:80/api/members",
});

export default authApi;
