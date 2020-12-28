import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import HomePage from './pages/homePage/homePage';
import LoginPage from './pages/loginPage/loginPage';
import SignupPage from './pages/signupPage/signupPage';
import Navbar from "./components/navbar/navbar";
import authentication from "./services/authentication";
import './App.css';

class App extends React.Component {
  isAuthenticated() {
    if (authentication.isAuthenticated() === true) return true;
    return false;
  }

  render() {
    const isAuthenticated = this.isAuthenticated();
    console.log(isAuthenticated);
    return (
      <>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/accueil">
                {isAuthenticated ? <HomePage /> : <Redirect to="/" />}
              </Route>

              <Route exact path="/signup">
                {isAuthenticated ? <Redirect to="/accueil" /> : <SignupPage />}
              </Route>
              <Route exact path="/">
                {!isAuthenticated ? <LoginPage /> : <Redirect to="/accueil" />}
              </Route>
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
