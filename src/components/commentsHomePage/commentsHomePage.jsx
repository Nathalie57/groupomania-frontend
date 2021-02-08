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
import CountReplies from "../countReplies/countReplies";

class CommentsHomePage extends Component {
  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
    this.id = props.id;
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

  deleteComment = (id) => {
    // event.preventDefault();
    try {
      console.log(id);
      CommentsAPI.deleteComment(id);
      document.location.reload();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    try {
      CommentsAPI.findMainComments().then((res) => {
        console.clear();
        this.setState({ comments: res.data });
        console.log(res.data)
      });
    } catch (error) {}
  }

  render() {
    let { comments } = this.state;
    return (
      <div>
        {comments.map((comment) => (
          <div className="comment-homepage" key={comment.id}>
            {(this.jwtData.is_admin === 1 || this.jwtData.id === comment.id_user) ? <>
              <div className="username">{comment.username.ucFirst()}</div>
            <div className="date">{this.formatDate(comment.created_at)}</div>
            <div className="content">{comment.content}</div>
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
                      className="like-button"
                      onClick={(e) => {
                        this.showModal();
                      }}
                    >
                      <CountReplies id={comment.id} />
                    </button>
                  </span>
                </div>
              </div>
              <div>
                <CreateLike id={comment.id} />
                <span className="share">Partager</span>
                <button
                  type="button"
                  className="reply-comment-button"
                  onClick={(e) => {
                    this.showModal();
                  }}
                >
                  Commenter
                </button>
                <button
                  type="button"
                  className="delete-comment-button"
                  onClick={()=>this.deleteComment(comment.id)}
                >
                  Supprimer
                </button>
              </div>
              <div className="createReply">
                <CreateReply id={comment.id} show={this.state.show} />
              </div>
              <div>
                <RepliesHomePage id={comment.id} show={this.state.show} />
              </div>
            </div>
              </> : <>
              <div className="username">{comment.username.ucFirst()}</div>
            <div className="date">{this.formatDate(comment.created_at)}</div>
            <div className="content">{comment.content}</div>
            <div className="image">
              <img src={comment.image} className="image-homepage"></img>
              <div className="counted-likes">
                <div className="under-image">
                  <span>
                    <CountedLikes id={comment.id} />
                  </span>
                  <span>
                    <button
                      type="button"
                      className="like-button"
                      onClick={(e) => {
                        this.showModal();
                      }}
                    >
                      <CountReplies id={comment.id} />
                    </button>
                  </span>
                </div>
              </div>
              <div>
                <CreateLike id={comment.id} />
                <span className="share">Partager</span>
                <button
                  type="button"
                  className="reply-comment-button"
                  onClick={(e) => {
                    this.showModal();
                  }}
                >
                  Commenter
                </button>
              </div>
              <div className="createReply">
                <CreateReply id={comment.id} show={this.state.show} />
              </div>
              <div>
                <RepliesHomePage id={comment.id} show={this.state.show} />
              </div>
            </div>
              </>}
            
          </div>
        ))}
      </div>
    );
  }
}

export default CommentsHomePage;
