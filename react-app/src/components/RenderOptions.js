import React, { Component } from 'react';
import { render } from 'react-dom';
import './NewPerson.css';
import PropTypes from 'prop-types';
class RenderOptions extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
      },
      data: [],
      submitted: false,
      check : "",
    }
    this.handlePlay = this.handlePlay.bind(this);

  }
  static contextTypes = {
    router: PropTypes.object,
  }
  select=(event)=>{
    this.state.check = event.target.value;
  }
  handlePlay(event) {
    this.context.router.history.push("/RenderQuestions/"+this.state.check)
  }
  handleL=(event) =>{
    this.context.router.history.push("/stats/"+this.state.check)
  }

  componentDidMount() {
    var genre = this.props.match.params.genre;
    console.log(genre)
    const request = new Request('http://127.0.0.1:8080/quizes/'+genre);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Dare to Choose</h1>
        </header>
        <br/><br/>
        <form>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key) => {
               return (
                  <tr key = {key}>
                      <td><input type="radio" value={item.id} onChange={this.select}/></td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.genre}</td>
                      <td>{item.type}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
       <button type="submit" onClick={this.handlePlay}>Play</button>&nbsp;
       <button type="submit" onClick={this.handleL}>Leaderboard!</button>
      </form>

      </div>
    );
  }
}

export default RenderOptions;
