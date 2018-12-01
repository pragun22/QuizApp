import React, { Component } from 'react';
import { render } from 'react-dom';
import './NewPerson.css';
import PropTypes from 'prop-types';
class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
      },
      data: [],
      submitted: false,
      delt : 0,
      check : false,
    }
    qid : "",
    this.handleAdd = this.handleAdd.bind(this);
    this.handleCreate = this.handleCreate.bind(this);

  }
  static contextTypes = {
    router: PropTypes.object,
  }
  delt=(event)=>{
    this.state.delt = event.target.value;
  }
  handleAdd(event) {
    this.context.router.history.push("/NewQuestion/"+this.state.qid)
  }
  handleCreate(event) {
    this.context.router.history.push("/PlayQuiz")
  }
  handleEdit=(event)=>{
    this.context.router.history.push("/EditQuestion/"+this.state.delt)
  }
  handleDelete= (event)=> {
    fetch('http://localhost:8080/questions/'+this.state.delt, {
     method: 'DELETE',
     // body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status == 200 )
          console.log(10)
      });
  }
  componentDidMount() {
    var id = this.props.match.params.id;
    console.log(id)
    this.state.qid = id;
    const request = new Request('http://127.0.0.1:8080/quiz/'+id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Voila! create your Quiz</h1>
        </header>
        <br/><br/>
        <form>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>quizid</th>
              <th>statement</th>
              <th>op1</th>
              <th>op2</th>
              <th>op3</th>
              <th>op4</th>
              <th>ans1</th>
              <th>ans2</th>
              <th>ans3</th>
              <th>ans4</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key) => {
               return (
                  <tr key = {key}>
                      <td><input type="radio" value={item.id} onChange={this.delt}/></td>
                      <td>{item.id}</td>
                      <td>{item.quizid}</td>
                      <td>{item.stat}</td>
                      <td>{item.op1}</td>
                      <td>{item.op2}</td>
                      <td>{item.op3}</td>
                      <td>{item.op4}</td>
                      <td>{item.ans1}</td>
                      <td>{item.ans2}</td>
                      <td>{item.ans3}</td>
                      <td>{item.ans4}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
          <button type="submit" onClick={this.handleDelete}>Delete Question</button>
          <button type="submit" onClick={this.handleAdd}>Add Question!</button>
          <button type="submit" onClick={this.handleEdit}>Edit Question!</button>
          <button type="submit" onClick={this.handleCreate}>submit Quiz</button>
      </form>

      </div>
    );
  }
}

export default NewQuiz;
