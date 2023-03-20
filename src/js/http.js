import axios from "axios";

export default axios.create({
  baseURL: "https://api-groupy.herokuapp.com/api/",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
