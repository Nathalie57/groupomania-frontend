import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsersAPI from "../../services/userDatamanager";
import Field from "../../components/formField/formField.jsx";
import Button from "../../components/button/button.jsx";
import "./signupPage.css";

class SignupPage extends Component {

    state = {
        fields: {
            email: '',
            username: '',
            password: ''
        },
        errors: {}
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
            let { fields } = this.state;
            UsersAPI.register(fields)
                .then(res => {
                    const date = new Date();
                    date.setTime(date.getTime() + (24*60*60*1000));
                    document.cookie = 'token=' + res.data.token + '; expires=' + date.toUTCString() + '; path=/; SameSite=Strict';
                    window.location.href = "/";
                })
                .catch(err => {
                    let errors = {};
                    for (let error of err.response.data.error.errors) {
                        errors[error.path] = error.message;
                    }
                    this.setState({ errors });
                })
        
    }

    handleChange = (event) => {
        let { fields } = this.state;
        fields[event.target.name] = event.target.value.trim();
        this.setState({
            fields
        })
    }

    render() {
        return (
            <div className="App">
    <header className="App-header">
      <h2>Inscription</h2>
      <form onSubmit={this.handleFormSubmit} className="login-form">
        <Field
          name="username"
          label="Pseudo"
          value={this.state.fields['username']}
          onChange={this.handleChange}
          span="Entrez votre pseudo ici"
        />
        <Field
          name="email"
          label="Email"
          type="email"
          value={this.state.fields['email']}
          onChange={this.handleChange}
          span="Entrez votre adresse email ici"
        />
        <Field
          name="password"
          label="Mot de passe"
          type="password"
          value={this.state.fields['password']}
          onChange={this.handleChange}
          span="Entrez votre mot de passe ici"
        />

        <div className="form-group">
        <Button value="S'inscrire" type="submit" className="login-button" /><br />
        </div>
        <div className="login-link"><Link to="/">J'ai déjà un compte</Link></div>  
      </form>
      </header>
      </div>
        );
    }
}

export default SignupPage;