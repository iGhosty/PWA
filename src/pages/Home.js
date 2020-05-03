import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Header></Header>
        <section>
          <div className="py-7">
            <div id="maintitle" className="container text-center py-5">
              <h1 className="display-2">Anonymous </h1> <h1 className="display-2" id="chattitle">Chat</h1>
              <p className="lead">Csevegj névtelenül.</p>
              <div className="mt-4">
                <Link id="gomb" className="btn px-3 mr-5" to="/signup">Regisztráció</Link>
                <Link id="gombbelep" className="btn px-3" to="/login">Belépés</Link>
                <p hidden id="wait"></p>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    )
  }
}
