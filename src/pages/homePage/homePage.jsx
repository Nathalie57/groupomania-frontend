import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import CommentsHomePage from "../../components/commentsHomePage/commentsHomePage";
import "./homePage.css";
import CreateCommentModal from "../../components/createCommentModal/createCommentModal";
import "../../components/createCommentModal/createCommentModal.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("authToken");
    this.jwtData = jwtDecode(this.token);
    this.username = this.jwtData.username;
    String.prototype.ucFirst = function () {
      return this.substr(0, 1).toUpperCase() + this.substr(1);
    };
  }

  state = {
    show: false,
  };
  showModal = (e) => {
    this.setState({ 
      show: !this.state.show,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <>
            <div className="comment-homepage">
              <button
                type="button"
                className="comment-creation"
                onClick={(e) => {
                  this.showModal(e);
                }}
              >
                {this.username.ucFirst()}, exprimez-vous !
              </button>
              <div className="modal">
                <CreateCommentModal
                  onClose={this.showModal}
                  show={this.state.show}
                />
              </div>
            </div>
            <CommentsHomePage />
          </>
        </header>
      </div>
    );
  }
}

export default HomePage;
