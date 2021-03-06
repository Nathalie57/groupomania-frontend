import axios from "axios";
import { COMMENTS_API } from "../config";

async function findMainComments() {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "get",
    url: `${COMMENTS_API}`,
    headers: { Authorization: `Bearer ${token}` },
  };
  let data = await axios(config);
  return data;
}

async function findChildComments(id) {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "get",
    url: `${COMMENTS_API + "/" + id + "/childComments"}`,
    headers: { Authorization: `Bearer ${token}` },
  };
  let data = await axios(config);
  return data;
}

async function create(comment) {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "post",
    url: `${COMMENTS_API}`,
    data: comment,
    headers: { 
      Authorization: `Bearer ${token}`,
    },
  };
  let response = await axios(config);
  return response;
}

async function createReply(comment, id) {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "post",
    url: `${COMMENTS_API + "/" + id + "/replies"}`,
    data: comment,
    headers: { Authorization: `Bearer ${token}` },
  };
  console.clear();
  console.log(comment);
  let response = await axios(config);
  console.log(response);
  return response;
}

async function countLikes(id) {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "get",
    url: `${COMMENTS_API + "/" + id + "/likes"}`,
    headers: { Authorization: `Bearer ${token}` },
  };
  let data = await axios(config);
  return data;
}

async function countReplies(id) {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "get",
    url: `${COMMENTS_API + "/" + id + "/countReplies"}`,
    headers: { Authorization: `Bearer ${token}` },
  };
  let data = await axios(config);
  return data;
}

async function updateLike(idPost) {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "post",
    url: `${COMMENTS_API + "/" + idPost + "/likes"}`,
    // data: like,
    headers: { Authorization: `Bearer ${token}` },
  };
  let response = await axios(config);
  console.log(response);
  return response;
}

async function getLikeByUser(id_comment) {
  const token = localStorage.getItem("authToken");
  const config = {
    method: "get",
    url: `${COMMENTS_API + "/" + id_comment + "/userLiked"}`,
    headers: { Authorization: `Bearer ${token}` },
  };
  let data = await axios(config);
  return data;
}

async function deleteComment(id){
  console.log(id)
  const token = localStorage.getItem("authToken");
  const config = {
    method: "delete",
    url: `${COMMENTS_API + "/" + id}`,
    headers: { Authorization: `Bearer ${token}` },
  }
  let response = await axios(config);
  console.log(response);
  return response;
}

export default {
  findMainComments,
  create,
  countLikes,
  findChildComments,
  createReply,
  updateLike,
  countReplies,
  getLikeByUser,
  deleteComment
};
