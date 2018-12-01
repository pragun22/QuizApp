import React, { Component } from 'react';
import './ViewPeople.css';
import EditPerson from './EditPerson.js'
import User from './EditPerson.js'
import UserPage from './UserPage.js'
import PropTypes from 'prop-types';

class PlayQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      formData: {
        genre : "Got",
        type : "One",
        name : "",
      },
      admin: false,
    }
    this.create  = this.create.bind(this);
    this.play = this.play.bind(this);
    this.handleG = this.handleG.bind(this);
    this.handleN = this.handleN.bind(this);
    this.handleT = this.handleT.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  handleG = (event) => {
    this.state.formData.genre = event.target.value;
  }
  handleT = (event) => {
    this.state.formData.type = event.target.value;
  }
  handleN = (event) =>{
    this.state.formData.name = event.target.value;
  }
  create(event){
    event.preventDefault();
    // const request = new Request('http://127.0.0.1:8080/quiz/');
    if(this.state.formData.name!=""){
      fetch('http://localhost:8080/quiz' ,{
        method: 'POST',
        body : JSON.stringify(this.state.formData),
      })
      .then(response => {
          if(response.status==200){
            response.json()
            .then(
            data => {this.context.router.history.push("/NewQuiz/"+data)}
          )
          }
        }
      );
    }
  }
  play(event){
    this.context.router.history.push("/RenderOptions/"+this.state.formData.genre)
  }
  render() {
    const name = localStorage.getItem("username");
    if(name=="admin"){
      this.state.admin = true
    }
      if(name != null)
      {
      return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Be ready to be quized</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
        <span><h1 className="App-title">Quiz Name </h1></span><br></br>
        <input type="text" className="form-control" value={this.state.name} onChange={this.handleN} required/>
        <span><h1 className="App-title">Mention the Genre[Got, React, Songs, Cars]: </h1></span><br></br>
        <select name="genre" onChange={this.handleG} value={this.state.genre}>
          <option value="Got">Got</option>
          <option value="React">React</option>
          <option value="Songs">Songs</option>
          <option value="Cars">Cars</option>
        </select>
        <span><h1 className="App-title">Select Quiz type[One word,MCQ, mMCQ, Mix]: </h1></span><br></br>
        <select name="type" onClick={this.handleT} value={this.state.type}>
          <option value="One">One Word</option>
          <option value="Mcq">MCQ</option>
          <option value="MMcq">mMcq</option>
          <option value="Mix">mix</option>
        </select>
          <br></br><br></br>
        {this.state.admin &&
          <div>
          <button type="submit" onClick={this.create}>Create Quiz!</button><br></br><br></br>
          </div>
        }
        <button type="submit" onClick={this.play}>Play Quiz!</button>
        </form>
      </div>
    );
    }
    else
    {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Be ready to be quized</h1>
            </header>
          <h1 className = "App-title"> Ooops!!!!! you need to  login first </h1>
        </div>
    );
    }
  }
}

export default PlayQuiz;
