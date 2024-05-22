import axios from "axios";

const groupApi = axios.create({
  // baseURL: "http://localhost:9000/api/groups", // 내 컴퓨터
  // baseURL: "http://192.168.206.61:9000/api/groups", // ssafy 컴퓨터
  baseURL: "http://172.30.1.7:9000/api/groups", // 언니 컴퓨터
});

export default groupApi;
