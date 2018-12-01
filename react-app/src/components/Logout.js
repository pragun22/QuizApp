import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css'
import PropTypes from 'prop-types';

class Logout extends Component {
  componentDidMount() {
}
static contextTypes = {
  router: PropTypes.object,
}
  render() {
    localStorage.clear()
    window.location.reload()
    this.context.router.history.push("/")
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Thanks for visiting Quiz-App</h1>
        </header>
        <NewComponent text={"Come Again to play quizes"}/>
      </div>
    );
  }
}

export default Logout;
