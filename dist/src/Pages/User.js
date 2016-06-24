import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

class User extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			user: ""
		};
	}

	componentDidMount(){
		this.setState({user: findByUserId(this.props.params.userId)});
		console.log("in user.js this.state.user: ", this.state.user);
	}


	render(){
		return(<div>
			<h1> Id: {this.state.user.id} </h1>
			<h1> Lastname: {this.state.user.lastname} </h1>
			<h1> First: {this.state.user.firstname} </h1>
		</div>);
	}
}

export default User;