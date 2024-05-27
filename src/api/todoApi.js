import axios from "axios";

const todoApi = axios.create({
  // baseURL: "http://localhost:9000/api/todos", // 내 컴퓨터
  // baseURL: "http://192.168.206.61:9000/api/todos", // ssafy 컴퓨터
  baseURL: "http://172.30.1.45:9000/api/todos", // 언니 컴퓨터
});

export default todoApi;
