import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewPeople from './ViewPeople';
import EditPerson from './EditPerson';
import NewPerson from './NewPerson';
import PlayQuiz from './PlayQuiz';
import Home from './Home';
import AdminPanel from './AdminPanel';
import UserPage from './UserPage';
import NewQuestion  from './NewQuestion';
import NewQuiz from './NewQuiz';
import ViewQuiz from './ViewQuiz';
import RenderOptions from './RenderOptions';
import RenderQuestions from './RenderQuestions';
import Leaderboard from './Leaderboard';
import DisplayStats from './DisplayStats';
import Leader from './Leader';
import LeaderboardG from './Leadergenre'
import Hist from './History'
import Logout from './Logout'
import EditQuestion from './EditQuestion'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
      },
      log : false,
      admin: false,
    }
  }

  render() {
    const name = localStorage.getItem("username")
    console.log(name)
    if(name!=null)
    {
      this.state.log = true
    }
    if(name=="admin"){
      this.state.admin = true
    }
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>Quiz App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  {!this.state.log &&
                    <ul className="nav navbar-nav">
                  <li><Link to={'/signup'}>Signup</Link></li>
                  <li><Link to={'/login'}>login</Link></li>
                  </ul>
                  }
                  {this.state.admin &&
                  <li><Link to={'/Admin'}>Admin Panel</Link></li>
                  }
                  {this.state.log &&
                  <ul className="nav navbar-nav">
                  <li><Link to={'/PlayQuiz'}>Lets Play!</Link></li>
                  <li><Link to={'/Leader'}>Leaderboard!</Link></li>
                  <li><Link to={'/history'}>User history!</Link></li>
                  <li><Link to={'/logout'}>Logout!</Link></li>
                  </ul>
                  }
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/signup' component={NewPerson} />
                 <Route exact path='/login' component={EditPerson} />
                 <Route exact path='/Admin' component={AdminPanel} />
                 <Route exact path='/PlayQuiz' component={PlayQuiz} />
                 <Route exact path='/ViewPeople' component={DeletePerson} />
                 <Route exact path='/NewQuestion/:id' component={NewQuestion} />
                 <Route exact path='/ViewQuiz' component={ViewQuiz} />
                 <Route exact path='/NewQuiz/:id' component={NewQuiz} />
                 <Route exact path='/RenderOptions/:genre' component={RenderOptions} />
                 <Route exact path='/RenderQuestions/:id' component={RenderQuestions} />
                 <Route exact path='/Leaderboard' component={Leaderboard} />
                 <Route exact path='/stats/:id' component={DisplayStats} />
                 <Route exact path='/Leader' component={Leader} />
                 <Route exact path='/history' component={Hist} />
                 <Route exact path='/EditQuestion/:id' component={EditQuestion} />
                 <Route exact path='/LeaderboardG/:genre' component={LeaderboardG} />
                 <Route exact path='/Logout' component={Logout} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
