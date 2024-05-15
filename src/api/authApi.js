import axios from "axios";

const authApi = axios.create({
  // baseURL: "http://221.145.245.245:9000/api/users",
  baseURL: "http://172.30.1.86:80/api/members",
});

export default authApi;
