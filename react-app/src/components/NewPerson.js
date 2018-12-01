import React, { Component } from 'react';
import { render } from 'react-dom';
import './NewPerson.css';
import PropTypes from 'prop-types';
class NewPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        city: "",
        email : "",
        username : "",
        password : "",
      },
      submitted: false,
      existed : false,
    }
    this.handleEChange = this.handleEChange.bind(this);
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/people', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status == 200){
          console.log(200)
          this.setState({submitted: true});
        }
        if(response.status == 100){
          console.log(100)
          this.setState({existed: true});
        }
      });
  }

  handleFChange(event) {
    this.state.formData.firstName = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.lastName = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.city = event.target.value;
  }
  handleEChange(event) {
    this.state.formData.email = event.target.value;
  }
  handleUChange(event) {
    this.state.formData.username = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Signup</h1>
        </header>
        {this.state.submitted &&
          <div>
          <h2>
          Welcome to quiz-app.
          </h2>
          </div>
        }
        {this.state.existed &&
          <div>
          <h2>
          Sorry the username already existed.
          </h2>
          </div>
        }
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleLChange}/>
            </div>
            <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control" value={this.state.city} onChange={this.handleCChange}/>
            </div>
            <div className="form-group">
                <label>Email-address</label>
                <input type="text" className="form-control" value={this.state.email} onChange={this.handleEChange}/>
            </div>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
          {this.state.submitted &&
            this.context.router.history.push("/login")
          }
        </div>

      </div>
    );
  }
}

export default NewPerson;
