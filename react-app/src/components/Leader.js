import React, { Component } from 'react';
import './ViewPeople.css';
import EditPerson from './EditPerson.js'
import User from './EditPerson.js'
import UserPage from './UserPage.js'
import PropTypes from 'prop-types';

class Leader extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      genre: "Got",
    }
  }
  static contextTypes = {
    router: PropTypes.object,
  }
over = (event)=>{
  this.context.router.history.push("/Leaderboard")
}
genre =(event)=>{
  this.context.router.history.push("/LeaderboardG/"+this.state.genre)
}
handleG=(event)=>{
  this.state.genre = event.target.value;
}
  render() {
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Leaderboards</h1>
        </header>
        <form >
        <span><h1 className="App-title">Mention the Genre[Got, React, Songs, Cars]: </h1></span><br></br>
        <select name="genre" onChange={this.handleG}>
          <option value="Got">Got</option>
          <option value="React">React</option>
          <option value="Songs">Songs</option>
          <option value="Cars">Cars</option>
        </select><br></br><br></br>
          <button type="submit" onClick={this.genre}>Show Leaderboard by genre</button>
          <br></br><br></br>
          <button type="submit" onClick={this.over}>Overall Leaderboard!</button>
          <br></br><br></br>
        </form>
      </div>
    );
  }
}

export default Leader;
