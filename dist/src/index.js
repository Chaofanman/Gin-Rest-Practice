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
        }
    }

    componentWillMount(){
        superagent.get('http://localhost:9090/api/v1/users')
                  .end((error, response) => {
                    if(!error && response){
                        this.setState({ users: response.body });
                    } else {
                        console.log("Error fetching",  error);
                    }
                });
    }

    formProcess(data){
        console.log("IN FORM PROCESS", data);
        superagent.post('http://localhost:9090/api/v1/users')
                    .send(data)
                    .set('Accept', 'application/json')
                    .end(function(error, response){
                        if(error || !response.ok){
                            alert("Error posting");
                        } else{
                            JSON.stringify(response.body);
                        }
                    });
        // var users = this.state.users;
        // users.push(data);
        // this.setState({users})
    }

    applyChanges(data){
        console.log("in apply changes");
    }

    render(){
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