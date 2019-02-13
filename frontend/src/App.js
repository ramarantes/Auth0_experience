import React, { Component } from 'react';
import NavBar from './NavBar'
import Questions from './Questions' 
import Question from './Question' 
import Mock from './MockNewQuestion'
import Callback from './Callback'
import SecuredRoute from './SecuredRoute'

import {Route} from 'react-router'
import NewQuestion from './NewQuestion';
class App extends Component {
  render() {
    return (
      <div className="App">
      <NavBar/>
      <Route exact path='/' component={Questions}/>
        <Route exact path='/question/:questionId' component={Question}/>
        <SecuredRoute exact path='/mockdata/' component={Mock}/>
        <Route exact path='/callback' component={Callback}/>
        <SecuredRoute exact path='/newQuestion' component={NewQuestion}/>
      </div>
    );
  }
}

export default App;
