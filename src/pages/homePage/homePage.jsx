import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import CommentsHomePage from "../../components/commentsHomePage/commentsHomePage";
import "./homePage.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("authToken");
    this.jwtData = jwtDecode(this.token);
    this.username = this.jwtData.username;
  }
  
    render() {
        return (
          <div className="App">
      <header className="App-header">
        <>
          <div className="comment-homepage">
            <button type="button"  className="comment-creation">
              {this.username}, exprimez-vous !
              </button>
            </div>
            {/* <div id="commentModal" ref={modalElement}>
              <Modal
                buttonOpen={buttonOpen}
                modalElement={modalElement}
              />
          </div> */}
          <CommentsHomePage />
        </>
      </header>
    </div>
        )}
}

export default HomePage;