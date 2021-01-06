import React from "react";
import Users_API from "../../services/userDatamanager";
import Button from "../button/button.jsx";

class DeleteAccountModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.id = props.id;
  }

  state = {
    users: []
  }

  handleSubmit = (event) => {
    event.preventDefault();
    try {
      Users_API.deleteUser(this.id);
    } catch (error) {
      console.log(error.response.data);
    }
    console.log(this.id)
    document.location.reload();
  };

  onClose = (e) => {
    this.props.onClose && this.props.onClose(e);
    window.location.href = '/accueil'
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <h1>C'est votre dernier mot ?</h1>
          <div className="delete-image">
            <img src="https://media.giphy.com/media/l5RPZ6WjMv0k0/giphy.gif"></img>
          </div>
          <div className="create-comment-button">
            <Button
              value="Supprimer mon compte"
              type="submit"
              className="comment-button"
            />
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

export default DeleteAccountModal;
