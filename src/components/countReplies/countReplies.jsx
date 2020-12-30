import React, { Component } from "react";
import CommentsAPI from "../../services/commentDatamanager";
import "./countReplies.css";

class CountReplies extends Component {
  constructor(props) {
    super(props);
    this.id_parent = props.id_parent;
  }

  state = {
    replies: 0,
  };

  componentDidMount() {
    this.getReplies();
  }

  getReplies() {
    try {
      CommentsAPI.countReplies(this.id_parent).then((res) => {
        this.setState({ replies: res.data[0]["COUNT(*)"] });
        // console.log(this.state);
      });
    } catch (error) {}
  }

  render() {
    return (
        <div>
          <div className="">
            <span className="repliesCount">{this.state.replies} commentaires</span>
          </div>
      </div>
    );
  }
}

export default CountReplies;
