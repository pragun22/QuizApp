import React, { Component } from 'react';
import './DeletePerson.css';
import UserPage from './UserPage.js'
import PropTypes from 'prop-types';

class DeletePerson extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      check : 1
    }
    delt : false
    this.delt = this.delt.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

delt=(event)=>{
  this.state.check = event.target.value;
}
handleSubmit= (event)=> {
  event.preventDefault();
  fetch('http://localhost:8080/people/'+this.state.check, {
   method: 'DELETE',
   // body: JSON.stringify(this.state.formData),
 })
    .then(response => {
      if(response.status == 200 )
        this.setState({delt: true});
    });
}
static contextTypes = {
  router: PropTypes.object,
}
render(){
  const name = localStorage.getItem("username")
  if(name == "admin"){
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">View and Delete Users</h1>
      </header>
      <form onSubmit={this.handleSubmit}>
      <table className="table-hover">
        <thead>
          <tr>
            <th>yna</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Email</th>
            <th>username</th>
            <th>password</th>
          </tr>
        </thead>
        <tbody>{this.state.data.map((item, key)=>{
             return (
                <tr key = {key}>
                    <td><input type="radio" value={item.id} onChange={this.delt}/></td>
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
     <button type="submit" value="delete">Delete</button>
     </form>
     {this.state.delt &&
       window.location.reload()
     }
    </div>
  );
  }
  else{
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View and Delete Users</h1>
          </header>
        <h1 className = "App-title"> Access Denied </h1>
      </div>
  );
  }
}
}

export default DeletePerson;
