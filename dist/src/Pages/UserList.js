import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

class UserList extends React.Component{
	constructor(props){
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
		this.giveSingleUser = this.giveSingleUser.bind(this);
	}

	handleDelete(event){
		console.log("In handle delete");
		console.log(event.target.value);

		this.props.onDeleteSubmit(event.target.value);
	}

	giveSingleUser(event){
		event.preventDefault();
		console.log("In giveSingleUser, userid: ", event.target.value);

		this.props.getUser(event.target.value);	
	}

	render(){
		return (<div> 
			<ul>
	            {this.props.users.map((user, index) => (
	            	<li key={index}>
		                <Link to={`/${user.id}`} value={user.id} onClick={this.giveSingleUser}> {user.id}: {user.Lastname}, {user.Firstname} </Link>
		                <button onClick={this.handleDelete} value={user.id}> X </button>
	                </li>
	            ))}
            </ul>
        </div>);
	}
}

export default UserList;
