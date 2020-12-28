import React from "react";
import CommentsAPI from "../../services/commentDatamanager";
import Button from "../../components/button/button.jsx";
import Field from "../../components/formField/formField.jsx";
import "./createReply.css";

class CreateReply extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
  }
  state = {
    comment: {
      content: "",
      // image: '',
      id_parent: this.id,
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let id_parent = this.id;
    console.log(id_parent)
    let { comment } = this.state;    
    console.log(comment);
    try {
      CommentsAPI.createReply(comment, this.id);
      console.log(this.id);
    } catch (error) {
      console.log(error.response.data);
    }
    document.location.reload();
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
    return (
      <div className="create-reply">
        <form onSubmit={this.handleSubmit}>
          <Field
            name="content"
            type="text"
            label="Nouveau post"
            onChange={this.handleChange}
            value={this.state.comment["content"]}
            placeholder="Ajouter un commentaire"
          />
          <div className="create-reply-button">
            <Button value="Publier" type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateReply;
