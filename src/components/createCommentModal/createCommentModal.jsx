import React from "react";
import CommentsAPI from "../../services/commentDatamanager";
import Button from "../../components/button/button.jsx";
import Field from "../../components/formField/formField.jsx";
import "./createCommentModal.css";

class CreateCommentModal extends React.Component {
  state = {
    comment: {
      content: "",
      image: "",
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let { comment } = this.state;
    try {
      CommentsAPI.create(comment);
      console.log(comment)
    } catch (error) {
      console.log(error.response.data);
    }
    console.log(comment);
  };

  handleChange = (event) => {
    let { comment } = this.state;
    comment[event.target.name] = event.target.value;
    this.setState({ comment });
  };

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <h1>Créer un post</h1>
          <Field
            name="content"
            type="text"
            label="Nouveau post"
            onChange={this.handleChange}
            value={this.state.comment["content"]}
          />
          <Field
            name="image"
            type="file"
            label="Image"
            onChange={this.handleChange}
            value={this.state.comment["image"]}
          ></Field>
          <div className="create-comment-button">
            <Button value="Publier" type="submit" className="comment-button" />
          </div>
        </form>
        <div className="create-comment-button">
          <Button
            value="Annuler"
            type="button"
            onClick={this.onClose}
            className="comment-button"
          />
        </div>
      </div>
    );
  }
}

export default CreateCommentModal;
