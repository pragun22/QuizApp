import React, { Component } from 'react';
import { render } from 'react-dom';
import './NewPerson.css';
import PropTypes from 'prop-types';
class NewQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        quizid:"",
        stat:"",
        op1: "",
        op2 : "",
        op3 : "",
        op3 : "",
        ans1: "",
        ans2 : "",
        ans3 : "",
        ans3 : "",
        img : "",
        vid : "",
      },
      qid : "",
      submitted: false,
    }
    this.handleSChange = this.handleSChange.bind(this);
    this.handle1Change = this.handle1Change.bind(this);
    this.handle2Change = this.handle2Change.bind(this);
    this.handle3Change = this.handle3Change.bind(this);
    this.handle4Change = this.handle4Change.bind(this);
    this.handlea1Change = this.handlea1Change.bind(this);
    this.handlea2Change = this.handlea2Change.bind(this);
    this.handlea3Change = this.handlea3Change.bind(this);
    this.handlea4Change = this.handlea4Change.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object,
  }
  componentDidMount() {
    var id = this.props.match.params.id;
    this.state.qid = id;
    const request = new Request('http://127.0.0.1:8080/ques/'+id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({formData: data}));
  }
  handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/ques/'+this.state.qid, {
     method: 'PUT',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status == 200){
          console.log(200)
          this.setState({submitted: true});
        }

      });
  }

  handleSChange(event) {
    let y = { ...this.state.formData, "stat": event.target.value};
    this.setState({formData:y});
  }
  handle1Change(event) {
    let y = { ...this.state.formData, "op1": event.target.value};
    this.setState({formData:y});
  }
  handle2Change(event) {
    let y = { ...this.state.formData, "op2": event.target.value};
    this.setState({formData:y});
  }
  handle3Change(event) {
    let y = { ...this.state.formData, "op3": event.target.value};
    this.setState({formData:y});
  }
  handle4Change(event) {
    let y = { ...this.state.formData, "op4": event.target.value};
    this.setState({formData:y});
  }
  handlea1Change(event) {
    let y = { ...this.state.formData, "ans1": event.target.value};
    this.setState({formData:y});
   }
  handlea2Change(event) {
    let y = { ...this.state.formData, "ans2": event.target.value};
    this.setState({formData:y});
    }
  handlea3Change(event) {
    let y = { ...this.state.formData, "ans3": event.target.value};
    this.setState({formData:y});
  }
  handlea4Change(event) {
    let y = { ...this.state.formData, "ans4": event.target.value};
    this.setState({formData:y});
    }
  handleI = (event) =>{
    let y = { ...this.state.formData, "img": event.target.value};
    this.setState({formData:y});
  }
  handleV=(event)=>{
    let y = { ...this.state.formData, "vid": event.target.value};
    this.setState({formData:y});
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Voila! create your Questions</h1>
        </header>
        {this.state.submitted &&
          <div>
          <h2>
          Hola! Quiz created
          </h2>
          </div>
        }
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>question text</label>
                <input type="text" className="form-control" value={this.state.formData.stat} onChange={this.handleSChange} required/>
            </div>
            <div className="form-group">
                <label>Option A</label>
                <input type="text" className="form-control" value={this.state.formData.op1} onChange={this.handle1Change} required/>
            </div>
            <div className="form-group">
                <label>Option B</label>
                <input type="text" className="form-control" value={this.state.formData.op2} onChange={this.handle2Change} required/>
            </div>
            <div className="form-group">
                <label>Option C</label>
                <input type="text" className="form-control" value={this.state.formData.op3} onChange={this.handle3Change} required/>
            </div>
            <div className="form-group">
                <label>Option D</label>
                <input type="text" className="form-control" value={this.state.formData.op4} onChange={this.handle4Change} required/>
            </div>
            <div className="form-group">
                <label>Answer A (enter either 1 or 0.... 1 for correct vice-a-versa)</label>
                <input type="number" step="1" className="form-control" value={this.state.formData.ans1} onChange={this.handlea1Change}/>
            </div>
            <div className="form-group">
                <label>Answer B (enter either 1 or 0. 1 for correct vice-a-versa)</label>
                <input type="number" step="1" className="form-control" value={this.state.formData.ans2} onChange={this.handlea2Change}/>
            </div>
            <div className="form-group">
                <label>Answer C (enter either 1 or 0. 1 for correct vice-a-versa)</label>
                <input type="number" step="1" className="form-control" value={this.state.formData.ans3} onChange={this.handlea3Change}/>
            </div>
            <div className="form-group">
                <label>Answer D (enter either 1 or 0. 1 for correct vice-a-versa)</label>
                <input type="number" step="1" className="form-control" value={this.state.formData.ans4} onChange={this.handlea4Change}/>
            </div>
            <div className="form-group">
                <label>Image url(give web url)</label>
                <input type="text" className="form-control" value={this.state.img} onChange={this.handleI}/>
            </div>
            <div className="form-group">
                <label>Vid/Audio url(give web url)</label>
                <input type="text" className="form-control" value={this.state.vid} onChange={this.handleV}/>
            </div>
            <button type="submit">Create!!</button>
          </form>
          {this.state.submitted &&
            this.context.router.history.push("/NewQuiz/"+this.state.formData.quizid)
          }
        </div>

      </div>
    );
  }
}

export default NewQuestion;
