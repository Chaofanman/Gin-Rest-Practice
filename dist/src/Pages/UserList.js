import React from 'react';

class UserList extends React.Component{
	constructor(props){
		super(props);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleDelete(event){
		//console.log("In handle delete");
		//console.log(event.target.value);
		var value;
		this.props.onDeleteSubmit(event.target.value);
	}

	render(){
		return (<div> 
            {this.props.users.map((user, index) => (
            	<li key={index}>
                {user.id}: {user.Lastname}, {user.Firstname} <button onClick={this.handleDelete} value={user.id}> X </button>
                </li>
            ))}
        </div>);
	}
    
}

export default UserList;
