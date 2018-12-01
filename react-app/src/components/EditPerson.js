import React, { Component } from 'react';
import './EditPerson.css';
import Home from './Home';
import PropTypes from 'prop-types';
import UserPage from './UserPage';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

class EditPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username : "",
        password : "",
      },
      login: false,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  handleUChange(event) {
    this.state.formData.username = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }
  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/people/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status == 250)
        {
          console.log("idhar aa gaya")
          localStorage.setItem('username', this.state.formData.username)
          this.setState({login: true});
          window.location.reload()
          this.context.router.history.push("/PlayQuiz")

        }
      });
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  responseGoogle = (response) => {
  console.log(response);
  this.state.formData.username = response.w3.U3;
  this.state.formData.password = "not required";
  fetch('http://localhost:8080/people', {
   method: 'POST',
   body: JSON.stringify(this.state.formData),
 })
    .then(response => {
      if(response.status == 200){
        console.log(200)
      }
      if(response.status == 100){
        console.log(100)
      }
    });
    fetch('http://localhost:8080/people/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status == 250)
        {
          console.log("idhar aaya")
          localStorage.setItem('username', this.state.formData.username)
          this.setState({login: true});
          window.location.reload()
          this.context.router.history.push("/PlayQuiz")

        }
      });

}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login Here!</h1>
        </header>
        <br/><br/>
          <GoogleLogin
            clientId="831390548341-9t5tklq14hllvonc6p7kdbigavi4qtc6.apps.googleusercontent.com"
            buttonText="google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
          <br></br>
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
              </div>
                <button type="submit" className="btn btn-default">Login</button>
              </form>
                {this.state.login &&
                  this.context.router.history.push("/PlayQuiz")
                }
          </div>
      </div>
    );
  }
}
export default EditPerson;
