import React, { Component } from 'react';
import './ViewPeople.css';
import EditPerson from './EditPerson.js'
import User from './EditPerson.js'
import UserPage from './UserPage.js'

class LeaderboardG extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      genre: "",
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var genre = this.props.match.params.genre;
    this.state.genre = genre
    const request = new Request('http://127.0.0.1:8080/leader/'+genre);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  render() {
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Leaderboards(by genre)</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>quiz-ID</th>
              <th>QuizName</th>
              <th>Genre</th>
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

export default LeaderboardG;
