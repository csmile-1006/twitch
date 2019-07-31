import React, {Component} from 'react'
import {Button, Image} from 'react-bootstrap'
import {image_sample} from './File_list'


class Main extends Component {

    state = {
        workload: 10,
        current_load: 1,
        label: '',
        responses: {},
        counter: null,
        image_list: null,
        url: 'https://twitchmturk.s3.us-east-2.amazonaws.com/chat_image/'
    }

    componentDidMount () {
        fetch('/getData')
            .then(res => res.json())
            .then(user => this.setState({counter : user.data, image_list: image_sample(50, user.data)}))
    }

    next_img = (img_id, response) => {
        var url = new URL("/postData"),
        params = {lat:35.696233, long:139.570431}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
        if (this.state.current_load < this.state.workload){
            this.saveResponse(img_id, response)
            this.setState({current_load: this.state.current_load + 1, label:''})
        }
        else
            this.submit();
    }

    saveResponse = (img_id, response) => {
        var tmpResponses = this.state.responses;
        tmpResponses[img_id] = response;

        this.setState({responses: tmpResponses});
        console.log(this.state.responses);
    }

    handle_change = (e) => {
        this.setState({label: e.target.value})
    }

    makeButton = (name) => {
        let content;
        if (this.state.current_load < this.state.workload)
            content = <div><Button variant="success" size="lg" onClick={()=>this.next_img(name, this.state.label)}>Next Image</Button></div>
        else
            content = <div><Button variant="success" size="lg" onClick={()=>this.submit()}>Submit</Button></div>
        return content;
    }

    download = (content, fileName) => {
        var a = document.createElement('a');
        var file =  new Blob([content]);
        a.href = URL.createObjectURL(file);
        console.log(a.href)
        a.download = fileName
        a.click();
    }


    submit = () => {
        //1. 저장한 counter를 json으로 저장하기
        //2. 저장된 response 내용들을 mturk으로 보내기
        //fetch('/updateData')
        // this.download(this.state.counter, 'demo.json')
        // this.props.next_stage();

        console.log(Object.keys(this.state.responses))
    }
    render () {
        const counter = this.state.counter;
         if (counter != null) {
            var current_img_id = this.state.image_list[this.state.current_load - 1];
            var current_img_name = counter[current_img_id].name;
            var path = this.state.url.concat(counter[current_img_id].name)
        }
        return (
            <div>
                {counter ?
                <div>
                <div className="Instruction">What is the original word that is completed <br/> through this emote?</div>
                <Image src = {path} style={{"margin" : "20px"}}/>
                <div>
                    <form>
                        <input placeholder="Write the meaning of the image" style={{"width" : "400px", "height" : "50px", "margin": "20px"}}value={this.state.label} onChange={this.handle_change}></input>
                    </form>
                </div>
                {this.makeButton(current_img_name)}
                <div style={{"textAlign" : "right"}}>{this.state.current_load} / {this.state.workload}</div>
                </div>
                : <div className="Instruction"> Please wait... </div>
                }
            </div>
        )
    }
}

export default Main;