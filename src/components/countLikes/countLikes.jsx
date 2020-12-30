import React, { Component } from "react";
import CommentsAPI from "../../services/commentDatamanager";

class CountLikes extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
  }

  state = {
    likes: 0,
  };

  componentDidMount() {
    this.getLikes();
  }

  getLikes() {
    try {
      CommentsAPI.countLikes(this.id).then((res) => {
        this.setState({ likes: res.data[0]["COUNT(*)"] });
        // console.log(this.state);
      });
    } catch (error) {}
  }

  render() {
    // let { likes } = this.state;
    return (
        <div>
        {/* {likes.map((like) => ( */}
          <div className="">
            <span className="likesCount">{this.state.likes}</span>
          </div>
         {/* ))}  */}
      </div>
    );
  }
}

export default CountLikes;
