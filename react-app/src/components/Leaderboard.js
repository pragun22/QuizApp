import React, { Component } from 'react';
import './ViewPeople.css';
import EditPerson from './EditPerson.js'
import User from './EditPerson.js'
import UserPage from './UserPage.js'

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/leader/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  render() {
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Leaderboards(Overall)</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>quiz-ID</th>
              <th>QuizName</th>
              <th>genre</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.quizid}</td>
                      <td>{item.quizname}</td>
                      <td>{item.genre}</td>
                      <td>{item.user}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default Leaderboard;
