import axios from "axios";

const noticeApi = axios.create({
  // baseURL: "http://localhost:9000/api/notices", // 내 컴퓨터
  // baseURL: "http://192.168.206.61:9000/api/notices", // ssafy 컴퓨터
  baseURL: "http://172.30.1.7:9000/api/notices", // 언니 컴퓨터
});

export default noticeApi;
