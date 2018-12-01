import React, { Component } from 'react';
import './ViewPeople.css';
import EditPerson from './EditPerson.js'
import User from './EditPerson.js'
import UserPage from './UserPage.js'

class History extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var user = localStorage.getItem("username")
    const request = new Request('http://127.0.0.1:8080/history/'+user);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));

  }
  render() {
    const name = localStorage.getItem("username");
    if(name !=""){
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">User History</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>quiz-ID</th>
              <th>genre</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.quizid}</td>
                      <td>{item.genre}</td>
                      <td>{item.score}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
  else{
    return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">User History</h1>
      </header>
      <h1> Login required</h1>
    </div>
  );
  }
}

}
export default History;
