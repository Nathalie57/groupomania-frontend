import moment from "moment";
import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import CommentsAPI from "../../services/commentDatamanager";
import "./commentsHomePage.css";
import RepliesHomePage from "../repliesHomePage/repliesHomePage";
import CountedLikes from "../countLikes/countLikes";

class CommentsHomePage extends Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("authToken");
    this.jwtData = jwtDecode(this.token);
    this.username = this.jwtData.username;
    this.formatDate = (str) => moment(str).format("DD/MM/YYYY");
  }

  state = {
    comments: [],
  };

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    try {
      CommentsAPI.findMainComments().then((res) => {
        this.setState({ comments: res.data });
        console.log(res.data);
      });
    } catch (error) {}
  }

  render() {
    let { comments } = this.state;
    return (
      <div>
        {comments.map((comment) => (
          <div className="comment-homepage" key={comment.id}>
            <div className="username">{comment.username}</div>
            <div className="date">{this.formatDate(comment.created_at)}</div>
            <div>{comment.content}</div>
            <div>
              <img src={comment.image} className="image-homepage"></img>
              <div className="counted-likes">
                <div className="under-image">
                  <span>
                  <CountedLikes id={comment.id} />
                </span>
                  <span>
                    <button type="button" className="replies-button">
                      Commentaires
                    </button>
                  </span>
                </div>
              </div>
              <div>
              <span className="like">J'aime</span>
              
                {/* <CreateLike id={comment.id} /> */}
              <span className="share">Partager</span>
              <span className="comment">Commenter</span>
            </div>
                <div className="createReply">
                  <RepliesHomePage id={comment.id} />
                </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CommentsHomePage;
