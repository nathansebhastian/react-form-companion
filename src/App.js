import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email:  '',
      username: '',
      password: '',
      comment: '',
      passwordConfirmation:'',
      facebook:'',
      formErrors: {
        email: '',
        username:'', 
        password: '', 
        passwordConfirmation: '',
        facebook: '',
      },
      formValidity: {
        email: false,
        username: false, 
        password: false, 
        passwordConfirmation: false,
        facebook: false,
      },
      canSubmit: false,
      facebookRadio: "no",
    };
    this.handleChange = this.handleChange.bind(this)
    this.updateData = this.updateData.bind(this)
  }
  
  updateData(data) {
    const validity = this.state.formValidity
    validity.email = true
    validity['username'] = true
    this.setState({
      email: data.email,
      username: data.username,
      comment: data.comment,
      formValidity : validity,
    })    
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    }, function(){ this.validateField(name, value)})
    
  }

  validateField(name, value) {
    if(Object.keys(this.state.formErrors).includes(name)){
      const fieldValidationErrors = this.state.formErrors
      const validity = this.state.formValidity
      const isEmail = name === "email"
      const isPassword = name === "password"
      const isPasswordConfirmation = name === "passwordConfirmation"
      const label = name === "passwordConfirmation"? 'password confirmation' : name
      const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  
      validity[name] = value.length >0
      fieldValidationErrors[name] = validity[name] ? '': `${label} is required and cannot be empty`;
  
      if(validity[name]) {
        if(isPassword){
          validity[name] = value.length >= 5;
          fieldValidationErrors[name] = validity[name] ? '': `${label} should be 5 characters or more`;
        }
        if(isEmail){
          validity[name] = emailTest.test(value);
          fieldValidationErrors[name] = validity[name] ? '' : `${label} should be a valid email address`;
        }
        if(isPasswordConfirmation){
          validity[name] = value === this.state.password
          fieldValidationErrors[name] = validity[name] ? '' : `${label} should match password`;
        }
      }
    
      this.setState({
        formErrors: fieldValidationErrors,
        formValidity: validity,
      }, () => this.canSubmit())
    }
  }

  canSubmit() {
    this.setState({canSubmit: this.state.formValidity.email && this.state.formValidity.username && this.state.formValidity.password && this.state.formValidity.passwordConfirmation})
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'is-invalid');
  }
   
  handleSubmit = (event) => {
    event.preventDefault()
    const { email, username, password } = this.state
    alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`)
  }

  get facebookLinkInput(){
    let {facebookRadio} = this.state
    if(facebookRadio === "yes"){
      return (
        <div className="form-group">
          <label htmlFor="facebook">Facebook Link</label>
          <input
            className={`form-control ${this.errorClass(this.state.formErrors.facebook)}`}
            id="facebook"
            name="facebook"
            type="text"
            placeholder="Enter Facebook url"
            value={this.state.facebook}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback">{this.state.formErrors.facebook}</div>
        </div>
      )

    }
    return false

  }
  
  render() {    
    return (
      <React.Fragment>
      <h1>Registration Form</h1>
      <p>Please fill in all textboxes</p> 
      <h2>Edit User Data</h2>
      {Object.keys(this.props.users).map(key => (
        <button 
        key={key}
        onClick={() =>this.updateData(this.props.users[key])}
        >{this.props.users[key].username}</button>
      ))}
       
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            className={`form-control ${this.errorClass(this.state.formErrors.email)}`}
            id="email"
            name="email"
            type="text"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback">{this.state.formErrors.email}</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className={`form-control ${this.errorClass(this.state.formErrors.username)}`}
            id="username"
            name="username"
            type="text"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback">{this.state.formErrors.username}</div>
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className={`form-control ${this.errorClass(this.state.formErrors.password)}`}
            id="password"
            name ="password"
            type="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback">{this.state.formErrors.password}</div>
        </div> 

        <div className="form-group">
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input
            className={`form-control ${this.errorClass(this.state.formErrors.passwordConfirmation)}`}
            id="passwordConfirmation"
            name ="passwordConfirmation"
            type="password"
            placeholder="Enter password again"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
          />
          <div className="invalid-feedback">{this.state.formErrors.passwordConfirmation}</div>
        </div>

        <fieldset className="form-group">
          <div className="row">
            <legend className="col-form-label col-sm-2 pt-0">Facebook Account</legend>
            <div className="col-sm-10">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="facebookRadio" id="facebookRadio1" value="no" checked={this.state.facebookRadio==="no"} onChange={this.handleChange}/>
                <label className="form-check-label" htmlFor="facebookRadio1">
                  No
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="facebookRadio" id="facebookRadio2" value="yes" checked={this.state.facebookRadio==="yes"} onChange={this.handleChange}/>
                <label className="form-check-label" htmlFor="facebookRadio2">
                  Yes
                </label>
              </div>
            </div>
          </div>
        </fieldset> 

        {this.facebookLinkInput}

        <div className="form-group">
        <label htmlFor="comment"> Comment:</label>
          <textarea 
          className="form-control"
          id="comment"
          name="comment" 
          value={this.state.comment} 
          onChange={this.handleChange} />
        </div>       
        <button className="btn btn-success btn-block" disabled={!this.state.canSubmit}>Sign up</button>
      </form>
      </React.Fragment>
    )
  }
}

export default App;
