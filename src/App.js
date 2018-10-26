import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      username: '',
      password: '',
      isSubmitDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this)
  }
  
  // triggered everytime value changes in our textboxes
  handleChange(event) {
    this.setState({
      // use dynamic name value to set our state object property
      [event.target.name]: event.target.value
    }, function(){ this.canSubmit()})
    
  }
  
  canSubmit() {
    const { email, username, password } = this.state
    // TODO: add valid email format validation in this condition
    if (email.length > 0 && username.length > 0 && password.length >= 5) {
      this.setState({
        isSubmitDisabled: false
      })
    }
    else {
      this.setState({
        isSubmitDisabled: true
      })
    }
  }
   
  // triggered on submit
  handleSubmit = (event) => {
    // get our const values by destructuring state
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring
    event.preventDefault()
    const { email, username, password } = this.state
    // regular javascript alert function
    alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`)
  }
  
  render() {    
    return (
      <React.Fragment>
      <h1>Registration Form</h1>
      <p>Please fill in all textboxes</p> 
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            id="name"
            name="email"
            type="text"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            name ="password"
            type="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>        
        <button className="btn btn-success btn-block" disabled={this.state.isSubmitDisabled}>Sign up</button>
      </form>
      </React.Fragment>
    )
  }
}

export default App;
