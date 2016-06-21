import React from 'react';

const UserList = (props) =>{
    return (<div> 
            {props.users.map((user, index) => (
            	<li key={index}>
                {user.id}: {user.Lastname}, {user.Firstname} <button> X </button>
                </li>
            ))}
        </div>);
}

export default UserList;
