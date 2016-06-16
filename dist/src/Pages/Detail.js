import React from 'react';
import superagent from 'superagent';

class Detail extends React.Component{
  constructor(props){
    super(props);
    this.state = { users: []};
  }

  componentWillMount(){
    superagent.get('http://localhost:9090/api/v1/users')
              .end((error, response) => {
                if(!error && response){
                  this.setState({ users: response.body });
                } else {
                  console.log("Error fetching",  error);
                }
              }
            );
  }

  render(){
    return (<div> 
      {this.state.users.map((user, index) => (
        <p key={index}> {user.Lastname}, {user.Firstname} </p>
      ))}
    </div>);
  }
};

export default Detail;