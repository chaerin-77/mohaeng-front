import axios from "axios";

const memoryApi = axios.create({
  // baseURL: "http://localhost:9000/api/memories", // 내 컴퓨터
  baseURL: "http://192.168.206.61:9000/api/memories", // ssafy 컴퓨터
  // baseURL: "http://172.30.1.38:9000/api/memories", // 언니 컴퓨터
});

export default memoryApi;
