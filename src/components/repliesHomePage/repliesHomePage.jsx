import moment from "moment";
import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import CommentsAPI from "../../services/commentDatamanager";
import "./repliesHomePage.css"

class RepliesHomePage extends Component {

    constructor(props) {
        super(props);
        this.id=props.id;
        this.token = localStorage.getItem("authToken");
        this.jwtData = jwtDecode(this.token);
        this.username = this.jwtData.username;
        this.formatDate = (str) => moment(str).format("DD/MM/YYYY");
      }

    state = {
        replies: []
    }

    componentDidMount() {
        this.getReplies();
    }

    getReplies() {
        try {
            CommentsAPI.findChildComments(this.id)
              .then(res => {
                this.setState({ replies: res.data });
            })
          } catch (error) {
          }
    }

  render() {
    let { replies } = this.state;
    return (
        <div>
        {replies.map(reply => (
          <div className="reply-homepage" key={reply.id}>
            <div className="reply-username">{reply.username}</div>
            <div className="reply-date">{this.formatDate(reply.created_at)}</div>
            <div>{reply.content}</div>
            <div>
              <img src={reply.image} className="image-homepage"></img>
            </div>
          </div>
        ))}
      </div>
    )}
}

export default RepliesHomePage;
