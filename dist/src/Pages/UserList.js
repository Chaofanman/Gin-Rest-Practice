import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

class UserList extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (<div> 
			<ul>
	            {this.props.users.map((user, index) => (
	            	<li key={index}>
		                <Link to={`/${user.id}`} value={user.id} onClick={event => this.props.getUser(event.target.value)} > {user.id}: {user.Lastname}, {user.Firstname} </Link>
		                <button onClick={event => this.props.onDeleteSubmit(event.target.value)} value={user.id}> X </button>
	                </li>
	            ))}
            </ul>
        </div>);
	}
}

export default UserList;
