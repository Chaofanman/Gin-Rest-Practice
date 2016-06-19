import React from 'react';
import superagent from 'superagent';

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            users: []
        };
    }

    componentWillMount(){
        superagent.get('http://localhost:9090/api/v1/users')
                  .end((error, response) => {
                    if(!error && response){
                        this.setState({ users: response.body });
                    } else {
                        console.log("Error fetching",  error);
                    }
                });
    }

    // submit(event){
    //     var self;
    //     event.preventDefault();
    //     self = this;

    //     console.log(this.state);

    //     var data = {
    //         firstname: this.state.firstname,
    //         lastname: this.state.lastname
    //     }

    //     console.log(firsntame);
    //     console.log(lastname);
    // }
    render(){
        return (<div> 
            {this.state.users.map((user, index) => (
                <p key={index}> {user.Lastname}, {user.Firstname} </p>
            ))}
        </div>);
      }
    };

export default Detail;
