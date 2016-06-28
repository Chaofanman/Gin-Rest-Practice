import React from 'react';

class User extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			id: this.props.user.id,
			Firstname: this.props.user.Firstname,
			Lastname: this.props.user.Lastname
		}
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	handleUpdate(event){
		event.preventDefault();
		var Firstname = document.getElementById('to_update_firstname').value;
		var Lastname = document.getElementById('to_update_lastname').value;
		var id = this.state.id
		console.log("Id:", this.state.id)
		console.log("First name: ", Firstname);
		console.log("Last name: ", Lastname);

		this.props.getUpdatedUser({id, Firstname, Lastname})

	}

	render(){
		return(<div> 
			<h1> {this.state.id} </h1>
			<h1> {this.state.Firstname} </h1>
			<h1> {this.state.Lastname} </h1>
			<input placeholder="Edit First Name" id="to_update_firstname" />
			<input placeholder="Edit Last Name" id="to_update_lastname" />
			<button type="submit" value={this.state.id}onClick={this.handleUpdate}> EDIT </button>
		</div>)
	}
}

export default User;

