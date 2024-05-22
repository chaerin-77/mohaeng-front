import axios from "axios";

const attractionApi = axios.create({
  // baseURL: "http://localhost:9000/api/plans", // 내 컴퓨터
  // baseURL: "http://192.168.206.61:9000/api/plans", // ssafy 컴퓨터
  baseURL: "http://172.30.1.7:9000/api/plans", // 언니 컴퓨터
});

export default attractionApi;
