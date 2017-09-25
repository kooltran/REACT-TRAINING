import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';

// stateless component
const Input = (props) => {
  const {type, name, handleInput} = props;
  return <input
                type = {type}
                name = {name}
                className="form-control"
                onChange={e => handleInput(e)} />
}

//statefull component
class FormDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, this.validateField(name, value));
  }

  validateField(fieldName, value) {
    let emailValid = this.state.emailValid;
    let emailError = this.state.emailError;
    let passwordValid = this.state.passwordValid;
    let passwordError = this.state.passwordError;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        emailError = emailValid ? '' : `${fieldName} is invalid`;
        break;
      case 'password':
        passwordValid = value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i);
        passwordError = passwordValid ? '': `${fieldName} is invalid`;
        break;
      default:
        break;
    }
    this.setState({ emailError: emailError,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    passwordError : passwordError,
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
          <div className={`form-group ${this.errorClass(this.state.emailError)}`}>
            <label>Email address:</label>
            <Input type="email" name="email" handleInput={this.handleUserInput} />
          </div>
          <ErrorMessage errorMessage={this.state.emailError} />
          <div className={`form-group ${this.errorClass(this.state.passwordError)}`}>
            <label>Password:</label>
            <Input type="password" name="password" handleInput={this.handleUserInput} />
          </div>
          <ErrorMessage errorMessage={this.state.passwordError} />
          <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
        </form>
      </div>
    )
  }
}

export default FormDemo;
