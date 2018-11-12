import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      email:  '',
      username: '',
      password: '',
      comment: '',
      passwordConfirmation:'',
      formErrors: {
        email: '',
        username:'', 
        password: '', 
        passwordConfirmation: '',
      },
      formValidity: {
        email: false,
        username: false, 
        password: false, 
        passwordConfirmation: false,
      },
      canSubmit: false,
    };
    this.handleChange = this.handleChange.bind(this)
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
  }

  _next() {
    let currentStep = this.state.currentStep;
    if (currentStep >= 2) {
      currentStep = 3;
    } else {
      currentStep = currentStep + 1;
    }
    
    this.setState({
      currentStep: currentStep
    });
  }
   
  _prev() {
    let currentStep = this.state.currentStep;
    if (currentStep <= 1) {
      currentStep = 1;
    } else {
      currentStep = currentStep - 1;
    }
    
    this.setState({
      currentStep: currentStep
    });
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
      fieldValidationErrors[name] = validity[name] ? '': `${label} is required and cannot be empty`
  
      if(validity[name]) {
        if(isPassword){
          validity[name] = value.length >= 5;
          fieldValidationErrors[name] = validity[name] ? '': `${label} should be 5 characters or more`;
        }
        if(isEmail){
          validity[name] = emailTest.test(value);
          fieldValidationErrors[name] = validity[name] ? '' : `${label} should be a valid email address`
        }
        if(isPasswordConfirmation){
          validity[name] = value === this.state.password
          fieldValidationErrors[name] = validity[name] ? '' : `${label} should match password`
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
    return(error.length === 0 ? '' : 'is-invalid')
  }
   
  handleSubmit = (event) => {
    event.preventDefault()
    const { email, username, password } = this.state
    alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`)
  }

  get previousButton(){
    let currentStep = this.state.currentStep
    if(currentStep !==1){
      return (
        <button className="btn btn-secondary" type="button" onClick={this._prev}>Previous</button>
      )
    }
    return null
  }

  get nextButton(){
    let currentStep = this.state.currentStep
    if(currentStep <3){
      return (
        <button className="btn btn-primary float-right" type="button" onClick={this._next}>Next</button>        
      )
    }
    return null
  }
  
  render() {    
    return (
      <React.Fragment>
      <h1>A Wizard Form!</h1>
      <p>Step {this.state.currentStep} </p> 
       
      <form onSubmit={this.handleSubmit}>
        <Step1 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          errorEmailClass={this.errorClass(this.state.formErrors.email)}
          email={this.state.email}
          errorEmail={this.state.formErrors.email}
          errorUsernameClass={this.errorClass(this.state.formErrors.username)}
          username={this.state.username}
          errorUsername={this.state.formErrors.username}
        />
        <Step2 
        currentStep={this.state.currentStep} 
        handleChange={this.handleChange}
        errorPasswordClass={this.errorClass(this.state.formErrors.password)}
        password={this.state.password}
        errorPassword={this.state.formErrors.password}
        errorPasswordConfirmationClass={this.errorClass(this.state.formErrors.passwordConfirmation)}
        passwordConfirmation={this.state.passwordConfirmation}
        errorPasswordConfirmation={this.state.formErrors.passwordConfirmation}
        />
        <Step3 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          comment={this.state.comment}
          canSubmit={this.state.canSubmit}
        />
        {this.previousButton}
        {this.nextButton}
        

      </form>
      </React.Fragment>
    )
  }
}

class Step1 extends Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null
    } 
    return(
      <React.Fragment>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          className={`form-control ${this.props.errorEmailClass}`}
          id="email"
          name="email"
          type="text"
          placeholder="Enter email"
          value={this.props.email}
          onChange={this.props.handleChange}
        />
        <div className="invalid-feedback">{this.props.errorEmail}</div>
      </div>
      <div className="form-group">
      <label htmlFor="username">Username</label>
      <input
        className={`form-control ${this.props.errorUsernameClass}`}
        id="username"
        name="username"
        type="text"
        placeholder="Enter username"
        value={this.props.username}
        onChange={this.props.handleChange}
      />
      <div className="invalid-feedback">{this.props.errorUsername}</div>
    </div>
    </React.Fragment>
   );
 }
}

class Step2 extends Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    } 
    return(
    <React.Fragment>
    <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className={`form-control ${this.props.errorPasswordClass}`}
          id="password"
          name ="password"
          type="password"
          placeholder="Enter password"
          value={this.props.password}
          onChange={this.props.handleChange}
        />
        <div className="invalid-feedback">{this.props.errorPassword}</div>
      </div> 

      <div className="form-group">
        <label htmlFor="passwordConfirmation">Password Confirmation</label>
        <input
          className={`form-control ${this.props.errorPasswordConfirmationClass}`}
          id="passwordConfirmation"
          name ="passwordConfirmation"
          type="password"
          placeholder="Enter password again"
          value={this.props.passwordConfirmation}
          onChange={this.props.handleChange}
        />
        <div className="invalid-feedback">{this.props.errorPasswordConfirmation}</div>
      </div>
    </React.Fragment>
  );
 }
}

class Step3 extends Component {
  render() {
    if (this.props.currentStep !== 3) {
      return null;
    } 
    return(
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="comment"> Comment:</label>
          <textarea 
          className="form-control"
          id="comment"
          name="comment" 
          value={this.props.comment} 
          onChange={this.props.handleChange} />
      </div>       
      <button className="btn btn-success btn-block" disabled={!this.props.canSubmit}>Sign up</button>
    </React.Fragment>
  );
 }
}

export default App;


