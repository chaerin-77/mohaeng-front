import axios from "axios";

const attractionApi = axios.create({
  baseURL: "http://192.168.206.61:9000/api/attrs", // ssafy 컴퓨터
});

export default attractionApi;
