import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import "../../components/createCommentModal/createCommentModal.css";
import "./deleteAccountPage.css";
import DeleteAccountModal from "../../components/deleteAccountModal/deleteAccountModal";
import Button from "../../components/button/button";

class DeleteAccountPage extends Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("authToken");
    this.jwtData = jwtDecode(this.token);
    this.username = this.jwtData.username;
    String.prototype.ucFirst = function () {
      return this.substr(0, 1).toUpperCase() + this.substr(1);
    };
  }

  state = {
    show: false,
  };
  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };

  onClose = (e) => {
    // this.props.onClose && this.props.onClose(e);
    window.location.href = '/accueil';
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <>
            <div className="delete-account-page">
              <h2>
                {this.username.ucFirst()}, voulez-vous supprimer votre compte ?
              </h2>
              <div className="delete-image">
                <img src="https://media.giphy.com/media/fzFiKLW1BFsaY/giphy.gif"></img>
              </div>
              <div className="button-delete">
                <button
                  type="button"
                  className="comment-button"
                  onClick={(e) => {
                    this.showModal(e);
                  }}
                >
                  Supprimer
                </button>
                <Button
                  value="Annuler"
                  type="button"
                  onClick={this.onClose}
                  className="comment-button"
                />
              </div>
              <div className="modal">
                <DeleteAccountModal
                  onClose={this.showModal}
                  show={this.state.show}
                  id={this.jwtData.id}
                />
              </div>
            </div>
          </>
        </header>
      </div>
    );
  }
}

export default DeleteAccountPage;
