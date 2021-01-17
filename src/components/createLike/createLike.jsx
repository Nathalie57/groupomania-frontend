import React, { Component } from "react";
import CommentsAPI from "../../services/commentDatamanager";
import "../button/button.css";

class CreateLike extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    // this.token = localStorage.getItem("authToken");
    // this.jwtData = jwtDecode(this.token);
  }

  state = {
    // likes: [],
    id_comment: "",
    id_user: "",
    is_liked: 1,
  };

  componentDidMount() {
    this.getLike();
  }

  getLike() {
    try {
      CommentsAPI.getLikeByUser(this.id).then((res) => {
        this.setState({ likes: res.data });
        // console.log(this.state.likes[0].is_liked);
      });
    } catch (error) {}
  }

  // unlike() {
  //   try {
  //     this.setState.likes[0].is_liked === true;
  //   } catch (error) {}
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    let { like } = this.state;
    // if (!this.state.likes) {
      try {
        CommentsAPI.createLike(like, this.id);
      } catch (error) {
        console.log(error.response.data);
      }
      document.location.reload();
    // }
    //  if (this.state.likes[0].is_liked ===1) {
    //   try {
    //     console.log(this.state);
    //     this.setState({
    //       is_liked: 0,
    //     });
    //   } catch (error) {
    //     console.log(error.response.data);
    //   }
    // }
    // else this.state.id_liked===0
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
