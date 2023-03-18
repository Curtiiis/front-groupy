import axios from "axios";

export default axios.create({
  baseURL: "https://api-groupy.herokuapp.com/api/",
  // baseURL: "http://localhost:3000/api/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
