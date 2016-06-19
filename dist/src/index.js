import React from 'react';
import ReactDOM from 'react-dom';

import Detail from './pages/Detail';
import Form from './pages/Form';

class App extends React.Component{
    render(){
        return(<div>
            <Form />
            <Detail />
        </div>);
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)