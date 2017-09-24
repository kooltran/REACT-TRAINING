import React, { Component } from 'react';
import FormErrors from './FormErrors';

class FormDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, this.validateField(name, value));
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i);
        fieldValidationErrors.password = passwordValid ? '': ' is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render() {
    return (
      <div className="container">
        <form>
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
            <label>Email address:</label>
            <input type="email" name="email" className="form-control" onChange={event => this.handleUserInput(event)} value={this.state.email} />
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
            <label>Password:</label>
            <input type="password" name="password" className="form-control" onChange={event => this.handleUserInput(event)} value={this.state.password} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
        </form>
      </div>
    )
  }
}

export default FormDemo;
