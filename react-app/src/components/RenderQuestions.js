import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactPlayer from 'react-player'
import './NewPerson.css';
import PropTypes from 'prop-types';
import UserPage from './UserPage'
class RenderQuestions extends Component {
  constructor() {
    super();
    this.state = {
    formData : {
        quizid : "",
        quizname : "",
        user   : "",
        score  : 0,
        genre : "",
      },
      gen:"",
      selected1 : "",
      selected2 : "",
      selected3 : "",
      selected4 : "",
      selected : "",
      data: [],
      Qdata : [],
      submitted: false,
      check : "",
      inc: 0,
      type: "",
      multiple: false,
      completed : false,
      life1 : true,
      life2 : true,
      dare: false,

    }

  }
  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount=()=> {
    var id = this.props.match.params.id;
    this.state.formData.quizid = id
    this.state.formData.user = localStorage.getItem("username")
    //console.log(id)
    const request = new Request('http://127.0.0.1:8080/question/'+id);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));

    const request1 = new Request('http://127.0.0.1:8080/type/'+id);
    fetch(request1)
          .then(response => response.json())
            .then(data => this.setState({type:data}))

    //console.log()

    const request2 = new Request('http://127.0.0.1:8080/genre/'+id);
    fetch(request2)
      .then(response => response.json())
        .then( data => this.setState({Qdata:data}));

  }
  Next=(event)=>{
    let item = this.state.data[this.state.inc]
    let plus = 1
    let minus = 0
    if(this.state.dare){
      plus = 2
      minus = -1
    }
      event.preventDefault()
      if(!this.state.multiple){
        if(item.ans1=="1"){
          if(item.op1 == this.state.selected) this.state.formData.score = this.state.formData.score +plus
          else this.state.formData.score = this.state.formData.score + minus
        }
        if(item.ans2=="1"){
          if(item.op2 == this.state.selected) this.state.formData.score = this.state.formData.score+plus
          else this.state.formData.score = this.state.formData.score + minus
        }
        if(item.ans3=="1"){
          if(item.op3 == this.state.selected) this.state.formData.score = this.state.formData.score+plus
          else this.state.formData.score = this.state.formData.score + minus
        }
        if(item.ans4=="1"){
          if(item.op4 == this.state.selected) this.state.formData.score = this.state.formData.score+plus
          else this.state.formData.score = this.state.formData.score + minus
        }
      }
      else {
        //console.log("multiple")
        if(item.ans1=="1" && this.state.selected1!=""){
          if(item.op1 == this.state.selected1) this.state.formData.score = this.state.formData.score+plus
          else this.state.formData.score = this.state.formData.score + minus
        }
        if(item.ans2=="1" && this.state.selected2!=""){
          if(item.op2 == this.state.selected2) this.state.formData.score = this.state.formData.score+plus
          else this.state.formData.score = this.state.formData.score + minus
        }
        if(item.ans3=="1" && this.state.selected3!=""){
          if(item.op3 == this.state.selected3) this.state.formData.score = this.state.formData.score+plus
          else this.state.formData.score = this.state.formData.score + minus
        }
        if(item.ans4=="1" && this.state.selected4!=""){
          if(item.op4 == this.state.selected4) this.state.formData.score = this.state.formData.score+plus
          else this.state.formData.score = this.state.formData.score + minus
        }
      }
      console.log("this is score---"+this.state.formData.score)
    if(this.state.inc+1==this.state.data.length){
      this.state.formData.score=this.state.formData.score.toString()
      //console.log(this.state.formData.score)
      fetch('http://localhost:8080/leader' ,{
        method: 'POST',
        body : JSON.stringify(this.state.formData),
      })
      .then(response => {
          if(response.status==200){
            this.setState({completed: true})
          }
          else{
            this.context.router.history.push("/")
        }
        }
      );
    }
    else{
    this.setState({inc:this.state.inc+1})
    this.setState({selected:""})
    this.setState({check:""})
    if(this.state.dare){
      this.setState({dare:false})
    }
    }
  }
  Skip=(event)=>{
    event.preventDefault()
    this.state.formData.score = this.state.formData.score+1
    console.log("this is score---"+this.state.formData.score)
    if(this.state.inc+1==this.state.data.length){
      this.state.formData.score=this.state.formData.score.toString()
      //console.log(this.state.formData.score)
      fetch('http://localhost:8080/leader' ,{
        method: 'POST',
        body : JSON.stringify(this.state.formData),
      })
      .then(response => {
          if(response.status==200){
            this.setState({completed: true})
          }
          else{
            this.context.router.history.push("/")
        }
        }
      );
    }
    else{
      this.setState({inc:this.state.inc+1})
      this.setState({selected:""})
      this.setState({check:""})
      this.setState({life1:false})
    }
  }
  Dare=(event)=>{
      event.preventDefault()
      this.setState({dare:true})
      this.setState({life2:false})
  }
  Select=(event)=>{
    event.preventDefault()
    this.state.selected = event.target.value;
    this.state.check = event.target.value;
    //console.log(this.state.selected)
    //console.log(this.state.check)
  }
  Select1=(event)=>{
    event.preventDefault()
    if(this.state.selected1==""){
      this.setState({s1: true});
      this.state.selected1 = event.target.value;
      //console.log("-+-",this.state.s1);
    }
    else {
      this.state.selected1 = ""
      this.setState({s1: false});
    }
      this.state.s1 = !this.state.s1;
    //console.log(this.state.s1);
  }
  Select2=(event)=>{
    event.preventDefault()
    if(this.state.selected2==""){
      this.state.selected2 = event.target.value;
      this.setState({s2: true});

    }
    else {
      this.state.selected2 = ""
      this.setState({s2: true});
    }
    //console.log(this.state.selected2)
  }
  Select3=(event)=>{
    event.preventDefault()
    if(this.state.selected3==""){
      this.state.selected3 = event.target.value;
      this.setState({s3: true});
    }
    else {
      this.setState({s3: true});
      this.state.selected3 = ""
    }
    //console.log(this.state.selected3)

  }
  Select4=(event)=>{
    event.preventDefault()
    if(this.state.selected4==""){
      this.state.selected4 = event.target.value;
      this.setState({s4: true});
    }
    else {
      this.setState({s4: true});
        this.state.selected4 = ""
    }
    //console.log(this.state.selected4)
  }
  render=()=> {
    this.state.formData.genre = this.state.Qdata.genre
    this.state.formData.quizname = this.state.Qdata.name
    let item = this.state.data[this.state.inc]
    if(this.state.data.length>0 ){
        this.state.selected = item.op1
        //console.log(this.state.type)
        if(this.state.type=="MMcq"){
          this.state.multiple = true
        }
      }
    if(!this.state.multiple && !this.state.completed){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title"></h1>
          </header>
          <br/><br/>
          {this.state.data.length>0 &&
              <div>
              <form>
               <h3> Problem {this.state.inc+1}:<br></br></h3>
               <h1><span>{item.stat}</span></h1>
               <br></br>
               {item.img!="" &&
               <div>
                <img src = {item.img} className="Img" />
               </div>
                }
                {item.vid!="" &&
                <div>
                  <ReactPlayer url={item.vid} className="Vid" playing />
                  </div>
                }
                <br></br><br></br><br></br>
               <select name="Option" onClick={this.Select} >
                <option value={item.op1}>{item.op1}</option>
                <option value={item.op2}>{item.op2}</option>
                <option value={item.op3}>{item.op3}</option>
                <option value={item.op4}>{item.op4}</option>
              </select>
              <br></br><br></br>
              <button type="submit" onClick={this.Next}>Next</button>
              <h1> Use Lifelines!(once per quiz)</h1>
              {this.state.life1 &&
              <button type="submit" onClick={this.Skip}>Skip the Question</button>
              }
              {this.state.life2 &&
              <button type="submit" onClick={this.Dare}>Dare!(+2 for right answer else -1)</button>
              }
              </form>
              </div>
           }
        </div>
      );
    }
    else if(!this.state.completed){
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title"></h1>
          </header>
          <br/><br/>
          {this.state.data.length>0 &&
              <div>
              <form onSubmit={this.Next}>
               <h3> Problem {this.state.inc+1}:<br></br></h3>
               <h1><span>{item.stat}</span></h1>
               <br></br>
               {item.img!="" &&
               <div>
                <img src = {item.img} className="Img"/>
               </div>
              }
              {item.vid!="" &&
              <div>
                <ReactPlayer url={item.vid} className="Vid" playing />
                </div>
              }
              <br></br><br></br><br></br>
                <input type="checkbox" value={item.op1} onChange={this.Select1} />{item.op1}<br></br>
                <input type="checkbox" value={item.op2} onChange={this.Select2} />{item.op2}<br></br>
                <input type="checkbox" value={item.op4} onChange={this.Select4} />{item.op4}<br></br>
                <input type="checkbox" value={item.op3} onChange={this.Select3} />{item.op3}<br></br>
              <br></br><br></br>
              <button type="submit">Next</button>
              <h1> Use Lifelines!(once per quiz)</h1>
              {this.state.life1 &&
              <button type="submit" onClick={this.Skip}>Skip the Question</button>
              }
              {this.state.life2 &&
              <button type="submit" onClick={this.Dare}>Dare!(+2 for right answer else -1)</button>
              }
              </form>
              </div>
           }
        </div>
      );
    }
    else{
      return(
        <div>
        {this.state.data.length > 0 &&
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">{this.state.formData.quizname}</h1>
          </header>
          <br/><br/>
          <h3> Congratulations! on completing the quiz your score is {this.state.formData.score}.</h3>
        </div>
      }
      </div>
      );
    }
  }
}

export default RenderQuestions;
