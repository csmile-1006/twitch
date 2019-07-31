import React, {Component} from 'react';
import './App.css';
import {Button} from 'react-bootstrap'
import Pretest from './Pretest'
import Main from './Main'

class App extends Component {
  state = {
    stage_id: 0,
    stage: ['intro', 'pre-test', 'main'],
  }

  next_stage = () => {
    this.setState({stage_id: this.state.stage_id + 1})
  }

  render () {
    var content;
    var current = this.state.stage[this.state.stage_id];
    switch(current)
    {
      case ('intro'):
        content = <div>
          <div className="Instruction" style={{"marginTop" : "300px"}}>Twitch Labeling</div>
            <div>
               <p>Prototype for Twitch. You could conduct the labeling only when you pass the pre-test.</p>
            </div>
            <div>
              <Button style={{"margin" : "10px"}}variant="info" size="lg" onClick={this.next_stage}>START</Button>
            </div>
        </div>
        break;
      case ('pre-test'):
          content = <Pretest next_stage={this.next_stage}/>
        break;

      case ('main'):
        content = <Main next_stage={this.next_stage}/>
        break;

      default:
        alert("YOU DON'T HAVE TO BE HERE.");
    }
    return (
        <div>
          {content}
        </div>
    )
}
}

export default App;
