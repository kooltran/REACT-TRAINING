import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <PasswordInput />
        <UserLists />
      </div>
    );
  }
}

class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowPassword: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  }

  render() {
    const { isShowPassword } = this.state.isShowPassword;
    return (
      <div>
        <input type={isShowPassword ? 'text' : 'password'} />
        <button onClick={this.handleClick}>{isShowPassword ? 'hide' : 'show'}</button>
      </div>
    );
  }
}

class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      isLiked: false,
    }
    this.getLike = this.getLike.bind(this);
  }

  getLike() {
    this.setState({
      isLiked: !this.state.isLiked,
    })
  }

  render() {
    const liked = this.state.isLiked;
    return (
      <div className="text-center user-item">
        <h3>{this.props.name}</h3>
        <img src={this.props.url} alt=''/>
        <p>{this.props.email}</p>
        <button className={liked ? 'dislike': 'like'} onClick={this.getLike}>{liked ? 'dislike': 'like'}</button>
      </div>
    )
  }
}

// const UserItem = (props) => {
//   return (
//     <li>
//       <h3>{props.name}</h3>
//       <img src={props.url} alt=''/>
//       <p>{props.email}</p>
//     </li>
//   )
// }

class UserLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    }
    this.getUsers = this.getUsers.bind(this);
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers() {
    return fetch('https://randomuser.me/api/?results=10', {
      method: 'get',
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        users: [...this.state.users, ...data.results]
      })
    })
  }

  render() {
    const user = this.state.users;
    return (
      <div className="container">
        {user.map((item, index) =>  <UserItem key={index} name={item.name.first} url={item.picture.large} email={item.email}/>)}
        <a className="text-center" href="#" onClick={this.getUsers}>load more...</a>
      </div>
    )
  }
}

export default App;
