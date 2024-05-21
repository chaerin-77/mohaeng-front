import axios from "axios";

const attractionApi = axios.create({
  // baseURL: "http://localhost:9000/api/attrs", // 내 컴퓨터
  baseURL: "http://192.168.206.61:9000/api/attrs", // ssafy 컴퓨터
});

export default attractionApi;
