import React from "react";
import CommentsAPI from "../../services/commentDatamanager";
import Button from "../../components/button/button.jsx";
import Field from "../../components/formField/formField.jsx";
import "./createCommentModal.css";

class CreateCommentModal extends React.Component {
  state = {
    fields: {
        content: '',
        image: ''
    },
    errors: {}
}

  handleSubmit = (event) => {
    event.preventDefault();
            let { content } = this.state.fields;
            let { image } = this.state.fields;

            // const value = `; ${document.cookie}`;
            // const parts = value.split(`; token=`);
            // const token = parts.pop().split(';').shift();

            let formData = new FormData();
            formData.append('content', content);
            formData.append('image', image);

            CommentsAPI.create(formData)
                .then(res => {
                    const comment = res.data.comment;
                    this.props.addComment(comment);

                    // Reset form fields
                    this.newPostForm.current.reset();
                    this.setState({ fields: { content: '' } });
                })
                .catch(err => {
                    console.log(err);
                    let errors = {};
                    errors['g'] = err.response.data.error;
                    this.setState({ errors })
                })
        
  };

  addComment(comment) {
    let { comments } = this.state;
    comments.push(comment);
    this.setState({ comments });
}

  handleChange = (event) => {
    let { fields } = this.state;
    fields[event.target.name] = event.target.value;
    this.setState({ fields });
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
            value={this.state.fields["content"]}
          />
          <Field
            name="image"
            type="file"
            label="Image"
            onChange={this.handleChange}
            value={this.state.fields["image"]}
          ></Field>
          <div className="create-comment-button">
            <Button value="Publier" type="submit" className="comment-button"/>
          </div>
        </form>
        <div className="create-comment-button">
          <Button value="Annuler" type="button" onClick={this.onClose} className="comment-button"/>
        </div>
      </div>
    );
  }
}

export default CreateCommentModal;
