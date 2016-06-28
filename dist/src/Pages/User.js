import React from 'react';

const User = ({user}) =>  {
	console.log("In user: ", user)

	return(<div>
		<h1> {user.id} </h1>
		<h1> {user.Firstname} </h1>
		<h1> {user.Lastname} </h1>
	</div>);

}

export default User;