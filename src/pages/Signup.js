import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle } from "../helpers/auth";

export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);

  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }



  render() {
    return (
      <div className="container">
        <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
          <h1>
            Regisztráció az
          <Link className="title ml-2" to="/">Anonymous Chat-re</Link>
          </h1>
          <p className="lead">Felhasználó létrehozásához töltsd ki az alábbi mezőket:</p>
          <div className="form-group">
            <input className="form-control" placeholder="E-mail" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div className="form-group">
            <input className="form-control" placeholder="Jelszó" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div className="form-group">
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <button className="btn btn-primary px-5" type="submit">Regisztráció</button>
          </div>

          <button className="btn btn-danger mr-2" type="button" onClick={this.googleSignIn}>
            Regisztráció Google-el
          </button>
          <hr></hr>
          <p>Van már felhasználója? <Link to="/login">Belépés</Link></p><p hidden id="wait"></p>
        </form>
      </div>
    )
  }
}
