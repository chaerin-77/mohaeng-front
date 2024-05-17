import axios from "axios";

const groupApi = axios.create({
  baseURL: "http://192.168.206.61:9000/groups", // ssafy 컴퓨터
});

export default groupApi;
