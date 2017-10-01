import React, { Component } from 'react';
import ErrorMessage from './ErrorMessage';

// stateless component
const Input = (props) => {
  const {type, name, handleInput, regex} = props;
  console.log(props);
  return <input
                type = {type}
                name = {name}
                regex = {regex}
                className="form-control"
                onChange={e => handleInput(e)} />
}

//statefull component
class FormValidateClick extends Component {
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
    this.validateField = this.validateField.bind(this);
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  validateField(e) {
    e.preventDefault();
    let emailValid = this.state.emailValid;
    let emailError = this.state.emailError;
    let passwordValid = this.state.passwordValid;
    let passwordError = this.state.passwordError;
    const { email, password } = this.state;

    emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    emailError = emailValid ? '' : 'email is invalid';
    passwordValid = password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g);
    passwordError = passwordValid ? '' : 'password is invalid';

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
    const {email, password} = this.state;
    return (
      <div className="container">
        <form>
          <div className={`form-group ${this.errorClass(this.state.emailError)}`}>
            <label>Email address:</label>
            <Input type="email" name="email" handleInput={this.handleUserInput} regex={/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i} />
          </div>
          <ErrorMessage errorMessage={this.state.emailError} />
          <div className={`form-group ${this.errorClass(this.state.passwordError)}`}>
            <label>Password:</label>
            <Input type="password" name="password" handleInput={this.handleUserInput} regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g}/>
          </div>
          <ErrorMessage errorMessage={this.state.passwordError} />
          <button type="submit" className="btn btn-primary" onClick={e => this.validateField(e)}>Sign up</button>
        </form>
      </div>
    )
  }
}

export default FormValidateClick;
