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
            users: [],
            currentUser: {
            	id: "", 
            	firstname: "", 
            	lastname: ""
            }
        };
        this.formProcess = this.formProcess.bind(this);
        this.deleteProcess = this.deleteProcess.bind(this);
		this.setCurrentUser = this.setCurrentUser.bind(this);
		this.indexEditUser = this.indexEditUser.bind(this);
    }

    componentWillMount(){
    	this.getUsers();
    }

    deleteProcess(data){
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

    indexEditUser(data){
    	console.log("In indexEditUser, data:", data);
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

    setCurrentUser(data){
    	superagent.get('http://localhost:9090/api/v1/users/'+data)
                  .end((error, response) =>{
                    if(!error && response){
                        this.setState({ currentUser: response.body });
                    } else {
                        console.log("Error fetching",  error);
                    }
                });
    }


    render(){

        return(<div>
            <Form onFormSubmit={this.formProcess}/>
            <UserList users={this.state.users} getUser={this.setCurrentUser} onDeleteSubmit={this.deleteProcess}/>
            {this.state.currentUser.id != "" ? (<User user={this.state.currentUser} editUser={this.indexEditUser} />): <div></div> }
            
        </div>);
    }
}

ReactDOM.render((
	<Router history={browserHistory}>
    	<Route path="/" component={App}>
        	<Route path="/:userId" component={User} />
    	</Route>
  	</Router>),
 	document.getElementById('app')
)