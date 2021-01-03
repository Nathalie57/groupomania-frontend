import React from "react";
import CreateReplyModal from "../../components/createReplyModal/createReplyModal";
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
    show: false,
  };
  
  showModal = (e) => {
    this.setState({
      show: true,
    });
  };

  render() {
    if(!this.props.show){
        return null;
    }
    return (
        <>
        <button
          type="button"
          className="reply-creation"
          onClick={(e) => {
            this.showModal(e);
          }}
        >
          Ajouter un commentaire
        </button>
        <div className="modal">
        <CreateReplyModal
          onClose={this.showModal}
          show={this.state.show}
          id={this.id}  
        />
      </div>
      </>
    );
  }
}

export default CreateReply;
