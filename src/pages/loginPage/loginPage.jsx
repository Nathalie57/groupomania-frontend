import React, { Component } from "react";
import { Link } from "react-router-dom";
import authentication from "../../services/authentication";
import history from "../../services/history";
import Button from "../../components/button/button.jsx";
import Field from "../../components/formField/formField.jsx";
import "./loginPage.css";

class LoginPage extends Component {
  state = {
    credentials: {
      email: "",
      password: "",
    },
    errors: {},
  };

  formValidation = (event) => {
    let formIsValid = true;
    let errors = {};

    if (!this.state.credentials["email"] || !this.state.credentials["password"]) {
      errors["message"] = "Vous devez entrer votre identifiant et votre mot de passe !";
    }

    if (Object.entries(errors).length !== 0) {
      formIsValid = false;
    }
    this.setState({ errors });
    console.log(this.state);
    return formIsValid;
  };

  handleFormSubmit =async (event) => {
    event.preventDefault();
    if (this.formValidation()) {
      try {
        const succeed = await authentication.authenticate(this.state.credentials);
        if (!succeed) throw("");
        history.push("/accueil");
        window.location.href = "/accueil";
      } catch (error) {
        // console.log(error.response);
        let errors = {};
        errors["notvalid"] = "Vous devez entrer votre identifiant et votre mot de passe !";
      }
    }
  };

  handleChange = (event) => {
    let { credentials } = this.state;
    credentials[event.target.name] = event.target.value.trim();
    this.setState({
      credentials,
    });
  };

  render() {
    let { errors } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h2>Connexion à l'espace sécurisé</h2>
          <br />
          <img src="https://media.giphy.com/media/l0G17mcoGBEabVgn6/giphy.gif"></img>
          <form onSubmit={this.handleFormSubmit} className="login-form">
            <ul>
              <Field
                name="email"
                type="email"
                label="Identifiant"
                onChange={this.handleChange}
                value={this.state.credentials["email"]}
                span="Entrez votre adresse email ici"
              />
              <Field
                name="password"
                type="password"
                label="Mot de passe"
                onChange={this.handleChange}
                value={this.state.credentials["password"]}
                span="Entrez votre mot de passe ici"
              />
            </ul>
            <span className="error_message">{errors["message"]}</span>
            <span className="error_message">{errors["notvalid"]}</span>
            <div>
              <Button
                value="Connexion"
                type="submit"
                className="login-button"
              />
            </div>
          </form>
          <div className="login-form">
            <p>
              Pas encore de compte, inscrivez-vous <Link to="/signup">ici</Link>
              !
            </p>
          </div>
        </header>
      </div>
    );
  }
}

export default LoginPage;
