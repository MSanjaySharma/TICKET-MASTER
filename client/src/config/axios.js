import Axios from "axios";

//const url = process.env.URL || "http://localhost:7331";
const axios = Axios.create({
  baseURL: "/",
  //baseURL: url,
});

export default axios;
