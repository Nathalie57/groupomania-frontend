import React, { Component } from "react";
import CommentsAPI from "../../services/commentDatamanager";

class CountLikes extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
  }

  state = {
    likes: [],
  };

  componentDidMount() {
    this.getLikes();
  }

  getLikes() {
    try {
      CommentsAPI.countLikes(this.id).then((res) => {
        this.setState({ replies: res.data });
        console.log(res.data);
      });
    } catch (error) {}
  }

  render() {
    let { likes } = this.state;
    return (
        <div>
        {/* {likes.map((like) => ( */}
          <div className="">
            <span className="likesCount">{}</span>
          </div>
         {/* ))}  */}
      </div>
    );
  }
}

export default CountLikes;
