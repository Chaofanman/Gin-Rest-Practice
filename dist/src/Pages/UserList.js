import React from 'react';

const UserList = (props) =>{
    return (<div> 
            {props.users.map((user, index) => (
                <p key={index}> {user.Lastname}, {user.Firstname} </p>
            ))}
        </div>);
}


export default UserList;
