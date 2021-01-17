import axios from "axios";
import { USERS_API } from "../config";

async function register(user) {
  const config = {
    method: "post",
    url: `${USERS_API + "/signup"}`,
    data: user,
  };
  let response = await axios(config);
  console.log(response);
  return response;
}

async function deleteUser(id){
  const token = localStorage.getItem("authToken");
  const config = {
    method: "delete",
    url: `${USERS_API + "/" + id}`,
    headers: { Authorization: `Bearer ${token}` },
  }
  let response = await axios(config);
  console.log(response);
  return response;
}

export default {
  register,
  deleteUser
};