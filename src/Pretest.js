import React, {Component} from 'react'
import { Button, Image } from 'react-bootstrap';

class Pretest extends Component {
    
    state = {
        responses: {},
    }

    saveResponse = (qid, response) => {
        var tmpResponses = this.state.responses;
        tmpResponses[qid] = response;
        this.setState({responses: tmpResponses});
    }

    pretest_finish = () => {
        if (this.state.responses[1] === 'Yes' && this.state.responses[2] === 'Sarcasm')
            this.props.next_stage();
        else {
            alert("You are not qualified for this task. Sorry.");
            window.open("about:blank", "_self");
            window.close();
        }
    }

    render () {
        var question_1 = ' Have you ever watched twitch.tv streamings and their chats?';
        var question_2 = 'What\'s the meaning of this emotes?'
        var answer_1 = ['Yes', 'No'];
        var answer_2 = ['the dead', 'Delight', 'Sarcasm', 'Sadness'];
        return (
            <div>
            <div className="QuestionMargin" key={this.state.stageid}>
                <div className="Instruction">
                Answer the following questions.
                </div>
                <div>
                    <div className='QuestionTitle'>{question_1}</div>
                    {answer_1.map((option, opIdx) => (
                        <div style={{"display": "inline-block", "align":"center", "margin": "20px"}} key={opIdx}>
                            <input key={opIdx} type="radio" name={question_1} value={option}
                            onClick = {() => this.saveResponse(1, option)} />
                            <label style={{"display": "block"}}>
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
                <div>
                    <div className='QuestionTitle'>{question_2}</div>
                    <div><Image src = {require("./Kappa.png")} style={{"width" : "50px", "height" : "50px", "marginTop": "10px"} } />
                    </div>
                    {answer_2.map((option, opIdx) => (
                        <div style={{"display": "inline-block", "align":"center", "margin": "20px"}} key={opIdx}>
                            <input key={opIdx} type="radio" name={question_2} value={option}
                            onClick = {() => this.saveResponse(2, option)} />
                            <label style={{"display": "block"}}>
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
                <Button variant="warning" size="lg" onClick={this.pretest_finish}>Next</Button>
            </div>
        </div>
        )
    }
}

export default Pretest