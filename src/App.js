import React, { Component } from 'react';
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
  
  // triggered every time value changes in our textboxes
  handleChange(event) {
    this.setState({
      // use dynamic name value to set our state object property
      [event.target.name]: event.target.value
    }, function(){ this.canSubmit()})
    
    this.checkInputError(event.target.name);    
  }
  
  canSubmit() {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    const { email, username, password } = this.state
    // TODO: add valid email format validation in this condition
    if (email.length > 0 && username.length > 0 && password.length >= 5 && emailTest.test(email.toLowerCase())) {
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

  checkInputError(refName) {
    const validity = this.refs[refName].validity
    const label = document.getElementById(`${refName}-label`).textContent
    const error = document.getElementById(`${refName}-error`)
    const isPassword = refName === 'password'
    
    if (isPassword) {
      if (this.refs.password.value.length < 5) {
        this.refs.password.setCustomValidity('should be 5 characters or more');
      } else {
        this.refs.password.setCustomValidity('');
      }
    }
    
    if (!validity.valid) {
      if (validity.valueMissing) {
        error.textContent = `${label} is a required field`; 
      } else if (validity.patternMismatch) {
        error.textContent = `${label} should be a valid email address`; 
      } else if (isPassword && validity.customError) {
        error.textContent = `${label} should be 5 characters or more`; 
      } 
      
      this.refs[refName].classList.add('is-invalid');
      return;
    }  
        
    this.refs[refName].classList.remove('is-invalid');
    error.textContent = '';
    return;
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
      <form onSubmit={this.handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email" id="email-label">Email address</label>
          <input
            className="form-control"
            id="name"
            name="email"
            ref="email"
            type="email"
            pattern= "^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <div className="invalid-feedback" id="email-error" />
        </div>
        
        <div className="form-group">
          <label htmlFor="username" id="username-label">Username</label>
          <input
            className="form-control"
            id="username"
            name="username"
            ref="username"
            type="text"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />
          <div className="invalid-feedback" id="username-error" />
        </div>
        
        <div className="form-group">
          <label htmlFor="password" id="password-label">Password</label>
          <input
            className="form-control"
            id="password"
            name ="password"
            ref ="password"
            type="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback" id="password-error" />
        </div>        
        <button className="btn btn-success btn-block" disabled={this.state.isSubmitDisabled}>Sign up</button>
      </form>
      </React.Fragment>
    )
  }
}

export default App;
