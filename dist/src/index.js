import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';

import Detail from './pages/UserList';
import Form from './pages/Form';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
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

    render(){
        return(<div>
            <Form />
            <Detail users={this.state.users}/>
        </div>);
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)