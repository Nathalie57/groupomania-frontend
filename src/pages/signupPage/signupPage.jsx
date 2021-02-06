import React, { Component } from "react";
import { Link } from "react-router-dom";
import UsersAPI from "../../services/userDatamanager";
import Field from "../../components/formField/formField.jsx";
import Button from "../../components/button/button.jsx";
import "./signupPage.css";

class SignupPage extends Component {
  state = {
    fields: {
      email: "",
      username: "",
      password: "",
    },
    errors: {},
  };

  formValidation = (event) => {
    let formIsValid = true;
    let errors = {};

    if (
      !this.state.fields["email"] ||
      !this.state.fields["username"] ||
      !this.state.fields["password"]
    ) {
      errors["message"] = "Les trois champs sont obligatoires !";
    }

    if (Object.entries(errors).length !== 0) {
      formIsValid = false;
    }
    this.setState({ errors });
    console.log(this.state);
    return formIsValid;
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.formValidation()) {
      let { fields } = this.state;
      UsersAPI.register(fields)
        .then((res) => {
          window.location.href = "/";
        })
        .catch((err) => {
          alert("Cet email n'est pas disponible")
        });
    }
  };

  handleChange = (event) => {
    let { fields } = this.state;
    fields[event.target.name] = event.target.value.trim();
    this.setState({
      fields,
    });
  };

  render() {
    let { errors } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h2>Inscription</h2>
          <form onSubmit={this.handleFormSubmit} className="login-form">
            <Field
              name="username"
              label="Pseudo"
              value={this.state.fields["username"]}
              onChange={this.handleChange}
              span="Entrez votre pseudo ici"
            />
            <Field
              name="email"
              label="Email"
              type="email"
              value={this.state.fields["email"]}
              onChange={this.handleChange}
              span="Entrez votre adresse email ici"
            />
            <Field
              name="password"
              label="Mot de passe"
              type="password"
              value={this.state.fields["password"]}
              onChange={this.handleChange}
              span="Entrez votre mot de passe ici"
            />
            <span className="error_message">{errors["message"]}</span>
            <div className="form-group">
              <Button
                value="S'inscrire"
                type="submit"
                className="login-button"
              />
              <br />
            </div>
            <div className="login-link">
              <Link to="/">J'ai déjà un compte</Link>
            </div>
          </form>
        </header>
      </div>
    );
  }
}

export default SignupPage;
