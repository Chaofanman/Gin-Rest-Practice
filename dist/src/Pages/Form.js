import React from 'react';
import superagent from 'superagent';

class Detail extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            firstname: "",
            lastname: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    formSubmit(event){
        event.preventDefault();
        console.log("Submitted");
        console.log("Firstname: ", this.state.firstname);
        console.log("Lastname: ", this.state.lastname);

        var firstname = this.state.firstname;
        var lastname = this.state.lastname;

        superagent.post('http://localhost:9090/api/v1/users')
                    .send({ firstname: firstname, lastname: lastname})
                    .set('Accept', 'application/json')
                    .end(function(error, response){
                        if(error || !response.ok){
                            alert("Error posting");
                        } else{
                            alert(JSON.stringify(response.body));
                        }
                    });
    }

    handleChange(event){
        event.preventDefault();
        // console.log(event.target.name);
        // console.log(event.target.value);
        this.setState({ [event.target.name]: event.target.value });
        // console.log("this.state.firstname:", this.state.firstname);
        // console.log("this.state.lastname:", this.state.lastname);
    }

    render(){
        return (<div> 
            <form className="form" onSubmit={this.formSubmit}>
                <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} />
                <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} />
                <button > Submit</button>
            </form>
        </div>);
      }
    };

export default Detail;
