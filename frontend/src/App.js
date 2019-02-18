import React, { Component } from 'react';
import NavBar from './NavBar'
import Questions from './Questions' 
import Question from './Question' 
import Mock from './MockNewQuestion'
import Callback from './Callback'
import SecuredRoute from './SecuredRoute'
import auth0Client from './Auth'

import {Route, withRouter} from 'react-router'
import NewQuestion from './NewQuestion';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
      <div className="App">
      <NavBar/>
      <Route exact path='/' component={Questions}/>
        <Route exact path='/question/:questionId' component={Question}/>
        <SecuredRoute exact path='/mockdata/' component={Mock} checkingSession={this.state.checkingSession}/>
        <Route exact path='/callback' component={Callback}/>
        <SecuredRoute exact path='/newQuestion' component={NewQuestion} checkingSession={this.state.checkingSession}/>
      </div>
    );
  }
}

export default withRouter(App);
