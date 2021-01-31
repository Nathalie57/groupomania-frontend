import React, { Component } from "react";
import CommentsAPI from "../../services/commentDatamanager";
import "./countReplies.css";

class CountReplies extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
  }

  state = {
    replies: 0,
  };

  componentDidMount() {
    this.getReplies();
  }

  getReplies() {
    try {
      CommentsAPI.countReplies(this.id).then((res) => {
        this.setState({ replies: res.data[0]["COUNT(id_parent)"] });
      });
    } catch (error) {}
  }

  render() {
    return (
        <div>
          <div className="">
          {(this.state.replies > 1) ? <>
            <span className="repliesCount">{this.state.replies} commentaires</span>
            </> : <>
            <div>
            <span className="repliesCount">{this.state.replies} commentaire</span>
              </div>
            </>}
          </div>
      </div>
    );
  }
}

export default CountReplies;
