import React from 'react';

// const UserList = (props) =>{
//     return (<div> 
//             {props.users.map((user, index) => (
//             	<li key={index}>
//                 	{user.id}:  {user.Lastname}, {user.Firstname} 
//                 	<button onClick={event => this.props.onDeleteSubmit({id: user.id})}> X </button>
//                 </li>

//             ))}
//         </div>);
// }

class UserList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			users: this.props.users
		}
		console.log("Users: ", this.state.users);
	}

	render(){
		return(<div>
			<p> ldkfaldf </p>
		</div>)
	}
}


export default UserList;
