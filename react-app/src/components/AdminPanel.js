import React, { Component } from 'react';
import './ViewPeople.css';
import EditPerson from './EditPerson.js'
import User from './EditPerson.js'
import UserPage from './UserPage.js'
import PropTypes from 'prop-types';

class AdminPanel extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.quiz  = this.quiz.bind(this);
    this.people = this.people.bind(this);

  }

  static contextTypes = {
    router: PropTypes.object,
  }
  quiz(event)  {
      this.context.router.history.push("/ViewQuiz")
  }
  people(event) {
    this.context.router.history.push("/ViewPeople")
  }
  create=(event)=>{
    this.context.router.history.push('/PlayQuiz')
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
          <h1 className="App-title">AdminPanel</h1>
        </header>
        <form >
          <button type="submit" onClick={this.quiz} >View Quizes</button>
          <br></br><br></br>
          <button type="submit" onClick={this.create} >Create Quizes!</button>
          <br></br><br></br>
          <button type="submit" onClick={this.people} >View People</button>
        </form>

      </div>
    );
    }
    else
    {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">AdminPanel</h1>
            </header>
          <h1 className = "App-title"> Access Denied </h1>
        </div>
    );
    }
  }
}

export default AdminPanel;
