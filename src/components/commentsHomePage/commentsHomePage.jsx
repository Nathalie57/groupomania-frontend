import moment from "moment";
import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import CommentsAPI from "../../services/commentDatamanager";
import "./commentsHomePage.css";
import "../createReply/createReply.css";
import RepliesHomePage from "../repliesHomePage/repliesHomePage";
import CreateReply from "../createReply/createReply";
import CountedLikes from "../countLikes/countLikes";
import CreateLike from "../createLike/createLike";

class CommentsHomePage extends Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("authToken");
    this.jwtData = jwtDecode(this.token);
    this.username = this.jwtData.username;
    this.formatDate = (str) => moment(str).format("DD/MM/YYYY");
    String.prototype.ucFirst = function () {
      return this.substr(0, 1).toUpperCase() + this.substr(1);
    };
  }

  state = {
    comments: [],
    show: false,
  };

  showModal = (e) => {
    this.setState({
      show: true,
    });
  };

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    try {
      CommentsAPI.findMainComments().then((res) => {
        this.setState({ comments: res.data });
      });
    } catch (error) {}
  }

  render() {
    let { comments } = this.state;
    return (
      <div>
        {comments.map((comment) => (
          <div className="comment-homepage" key={comment.id}>
            <div className="username">{comment.username.ucFirst()}</div>
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
                    <button
                      type="button"
                      className="replies-button"
                      onClick={(e) => {
                        this.showModal();
                      }}
                    >
                      Commentaires
                    </button>
                  </span>
                </div>
              </div>
              <div>
                <CreateLike id={comment.id} />
                <span className="share">Partager</span>
                <span className="comment">Commenter</span>
              </div>
              <div className="createReply">
                <CreateReply id={comment.id} />
              </div>
              <div>
                <RepliesHomePage id={comment.id} show={this.state.show} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CommentsHomePage;
