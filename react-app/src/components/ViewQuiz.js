import React, { Component } from 'react';
import './ViewPeople.css';
import EditPerson from './EditPerson.js';
import User from './EditPerson.js';
import UserPage from './UserPage.js';
import PropTypes from 'prop-types';


class ViewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      id : "",
      delt: false,
    }
  }
  static contextTypes = {
    router: PropTypes.object,
  }
show=(event)=>{
    this.state.id = event.target.value;
}
handleD =(event)=>{
  event.preventDefault();
  fetch('http://localhost:8080/quiz/'+this.state.id, {
   method: 'DELETE',
   // body: JSON.stringify(this.state.formData),
 })
    .then(response => {
      if(response.status == 200 )
        this.setState({delt: true});
        this.context.router.history.push("/Admin")
    });
}

handleQ = (event) => {
  event.preventDefault();
  this.context.router.history.push("/NewQuiz/"+this.state.id)
}
handleL = (event) => {
  event.preventDefault();
  this.context.router.history.push("/stats/"+this.state.id)
}
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quiz');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  render=()=>{
    const name = localStorage.getItem("username");
      if(name == "admin")
      {
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Quizes</h1>
        </header>
        <form onSubmit={this.handle}>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>name</th>
              <th>genre</th>
              <th>Type</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key) =>{
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.genre}</td>
                      <td>{item.type}</td>
                      <td><input type="radio" value={item.id} onChange={this.show}/></td>
                  </tr>
                )
             })}
          </tbody>
       </table>
          <button type="submit" onClick={this.handleQ}>View Questions</button>
          <button type="submit" onClick={this.handleL}>Show Leaderboard</button>
          <button type="submit" onClick={this.handleD}>Delete Quiz</button>
       </form>
      </div>
    );
    }
    else
    {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">View All Users</h1>
            </header>
          <h1 className = "App-title"> Access Denied </h1>
        </div>
    );
    }
  }
}

export default ViewQuiz;
