import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/api/",
  // baseURL: "https://groupy-back.herokuapp.com/api/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
