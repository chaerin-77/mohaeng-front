import axios from "axios";

const chatApi = axios.create({
  // baseURL: "http://localhost:9000/api/chat", // 내 컴퓨터
  // baseURL: "http://192.168.206.61:9000/api/chat", // ssafy 컴퓨터
  baseURL: "http://172.30.1.38:9000/api/chat", // 언니 컴퓨터
});

export default chatApi;
