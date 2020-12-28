import React, { Component } from "react";
import CommentsAPI from "../../services/commentDatamanager";
import "../button/button.css";

class CreateLike extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
  }

  state = {
    like: {
      id_comment: "",
      id_user: "",
      id_liked: 1,
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let { like } = this.state;
    try {
      CommentsAPI.createLike(like, this.id);
    } catch (error) {
      console.log(error.response.data);
    }
    document.location.reload();
  };

  render() {
    return (
      <button className="like-button" onClick={this.handleSubmit}>
        <span className="like">J'aime</span>
      </button>
    );
  }
}

export default CreateLike;
