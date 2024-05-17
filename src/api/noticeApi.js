import axios from "axios";

const noticeApi = axios.create({
  baseURL: "http://192.168.206.61:9000/notices", // ssafy 컴퓨터
});

export default noticeApi;
