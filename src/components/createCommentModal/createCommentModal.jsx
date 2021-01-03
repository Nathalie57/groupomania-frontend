import React from "react";
import CommentsAPI from "../../services/commentDatamanager";
import Button from "../../components/button/button.jsx";
import Field from "../../components/formField/formField.jsx";
import "./createCommentModal.css";

class CreateCommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      content: "",
      image: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.image);
    formData.append("content", this.state.content);
    console.log(formData)
    try {
      CommentsAPI.create(formData);
    } catch (error) {
      console.log(error.response.data);
    }
    document.location.reload();
  };

  onFileChange(e) {
    this.setState({ image: e.target.files[0] });
  }

  onContentChange(e) {
    this.setState({ content: e.target.value })
  }

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
            onChange={this.onContentChange}
            value={this.state["content"]}
          />
          <input type="file" onChange={this.onFileChange} />
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
