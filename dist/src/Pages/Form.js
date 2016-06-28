import React from 'react';
import superagent from 'superagent';

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            firstname: "",
            lastname: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log("Submitted");
        console.log("Firstname: ", this.state.firstname);
        console.log("Lastname: ", this.state.lastname);

        var firstname = this.state.firstname;
        var lastname = this.state.lastname;

        console.log(firstname, lastname);
        if((firstname != "" ) && (lastname != "")){
        	this.props.onFormSubmit({firstname: firstname, lastname: lastname});	
        	this.setState({firstname: "", lastname: ""});
        } else {
        	alert("You have no input");
        }
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
            <form className="inputForm" onSubmit={this.handleSubmit}>
                <input type="text" name="firstname" id="firstnameId" placeholder="First Name" value={this.state.firstname} onChange={this.handleChange} />
                <input type="text" name="lastname"  id="lastnameId" placeholder="Last Name" value={this.state.lastname} onChange={this.handleChange} />
                <button type="submit"> Submit</button>
            </form>
        </div>);
      }
    };

export default Form;
