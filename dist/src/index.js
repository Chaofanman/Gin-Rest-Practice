import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';

import { Router, Route, Link, browserHistory } from 'react-router';

import UserList from './pages/UserList';
import User from './pages/User';
import Form from './pages/Form';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        };
        this.formProcess = this.formProcess.bind(this);
        this.deleteProcess = this.deleteProcess.bind(this);
    }

    componentWillMount(){
    	this.getUsers();
    }

    deleteProcess(data){
    	//console.log("In deleteProcess");
    	//console.log("Id: ", data);
    	//curl -i -X DELETE http://localhost:9090/api/v1/users/1
    	superagent.del('http://localhost:9090/api/v1/users/' + data)
    				.end((error, response) => {
    					if(error || !response.ok){
    						alert("Error Deleting: ", error);
    						console.log(error);
    					} else {
    						this.getUsers();
    					}
    				});
    }

    formProcess(data){
        console.log("IN FORM PROCESS", data);
        superagent.post('http://localhost:9090/api/v1/users')
                    .send(data)
                    .set('Accept', 'application/json')
                    .end((error, response) => {
                        if(error || !response.ok){
                            alert("Error Posting: ", error);
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
    	//console.log("Render: ", this.state.users);
        return(<div>
            <Form onFormSubmit={this.formProcess}/>
            <UserList users={this.state.users} onDeleteSubmit={this.deleteProcess}/>
        </div>);
    }
}

ReactDOM.render(
  	<Router history={browserHistory}>
    	<Route path="/" component={App}>
        	<Route path="/user/:userId" component={User}/>
    	</Route>
  	</Router>,
 	document.getElementById('app')
)