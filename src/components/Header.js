import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
        <Link id="title" className="navbar-brand" to="/">Anonymous Chat</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {auth().currentUser
            ? <div className="navbar-nav">
              
              <button id="gomblogoff" className="btn mr-3" onClick={() => auth().signOut()}>Kijelentkezés</button>
            </div>
            : <div className="navbar-nav">
              <Link id="gomb" className="nav-item nav-link mr-3" to="/login">Belépés</Link>
              <Link id="gombbelep" className="nav-item nav-link mr-3" to="/signup">Regisztráció</Link>
            </div>}
        </div>
      </nav>
    </header>
  );
}

export default Header;