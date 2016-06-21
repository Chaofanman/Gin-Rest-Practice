import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';

import Detail from './pages/UserList';
import Form from './pages/Form';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        };
        this.formProcess = this.formProcess.bind(this);
    }

    componentWillMount(){
    	this.getUsers();
    }

    formProcess(data){
        console.log("IN FORM PROCESS", data);
        superagent.post('http://localhost:9090/api/v1/users')
                    .send(data)
                    .set('Accept', 'application/json')
                    .end((error, response) => {
                        if(error || !response.ok){
                            alert("Error posting");
                            console.log(error);
                        } else {
                        	JSON.stringify(response.body);
                            this.getUsers();
                        }
                    });
    }

    getUsers(){
    	superagent.get('http://localhost:9090/api/v1/users')
                  .end((error, response) =>{
                    if(!error && response){
                        this.setState({ users: response.body });
                    } else {
                        console.log("Error fetching",  error);
                    }
                });

    }

    render(){
    	console.log("Render: ", this.state.users);
        return(<div>
            <Form onFormSubmit={this.formProcess}/>
            <Detail users={this.state.users}/>
        </div>);
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)