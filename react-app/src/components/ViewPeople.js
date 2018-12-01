import React, { Component } from 'react';
import './ViewPeople.css';
import EditPerson from './EditPerson.js'
import User from './EditPerson.js'
import UserPage from './UserPage.js'

class ViewPeople extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  render() {
    const name = localStorage.getItem("username");
      if(name == "admin")
      {
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Users</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Email</th>
              <th>username</th>
              <th>password</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.firstname}</td>
                      <td>{item.lastname}</td>
                      <td>{item.city}</td>
                      <td>{item.email}</td>
                      <td>{item.username}</td>
                      <td>{item.password}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
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

export default ViewPeople;
