import React from 'react';

// const User = ({user}) =>  {
// 	console.log("In user: ", user);

// 	var showButtonAndInputs = function (){
// 		if (user.id != ""){
// 			return(
// 				<div>
// 					<button> EDIT </button>
// 					<input placeholder="firstname"/>
// 					<input placeholder="lastname"/>
// 			</div>)
// 		}
// 	}

// 	var handleSubmit = function(){

// 	}

// 	return(<div>
// 		<h1> {user.id} </h1>
// 		<h1> {user.Firstname} </h1>
// 		<h1> {user.Lastname} </h1>
// 		{user.id != "" ?(<div>
// 					<input placeholder="firstname" />
// 					<input placeholder="lastname"/>
// 					<button> EDIT </button>
// 			</div>): <div></div>}
// 	</div>);

// }

class User extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			id: this.props.user.id,
			Firstname: this.props.user.Firstname,
			Lastname: this.props.user.Lastname
		}
	}

	render(){
		return(<div> 
			<h1> {this.state.id} </h1>
			<h1> {this.state.Firstname} </h1>
			<h1> {this.state.Lastname} </h1>
			<input placeholder="Firstname" name="user_firstname" />
			<input placeholder="Lastname" name="user_lastname" />
			<button> EDIT </button>
		</div>)
	}
}

export default User;

