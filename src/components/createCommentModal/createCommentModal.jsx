import React from "react";
import CommentsAPI from "../../services/commentDatamanager";
import Button from "../../components/button/button.jsx";
import Field from "../../components/formField/formField.jsx";
import "./createCommentModal.css";
import ImageUploader from "react-images-upload";
import FileInput from "../formField/fileField";

class CreateCommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      image: "",
      content: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.image);
    try {
      CommentsAPI.create(formData);
    } catch (error) {
      console.log(error.response.data);
    }
    document.location.reload();
  };

  onFileChange(e) {
    this.setState({ image: e.target.files[0], content: e.target.value });
    console.log(this.state)
  }
  //   handleChange = (event) => {
  //     let { comment } = this.state;
  //     comment[event.target.name] = event.target.value;
  //     // console.log(event.target.value)
  //     this.setState({ comment });
  //   };

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
          <h1>Créer un post</h1>

          {/* <FileInput ref={this.imageInput} onChange={this.handleFileChange} /> */}
          {/* <FileInput
            name="image"
            type="file"
            label="Image"
            onChange={this.onFileChange}
            // value={this.state.comment["image"]}
            ref={this.imageInput}
          ></FileInput> */}
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
