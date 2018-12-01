import React, { Component } from 'react';
import './ViewPeople.css';
import EditPerson from './EditPerson.js'
import User from './EditPerson.js'
import UserPage from './UserPage.js'

class DisplayStats extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      qid: "",
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var id = this.props.match.params.id;
    this.state.qid = id
    const request = new Request('http://127.0.0.1:8080/leaderquiz/'+id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  render() {
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Leaderboards(quiz-id = {this.state.qid})</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>S.no.</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{key+1}</td>
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

export default DisplayStats;
