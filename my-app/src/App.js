import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <CardList />
      </div>
    );
  }
}


// Stateless Component
class CardItem extends Component {
  render() {
    return (
      <div className="text-center user-item">
        <h3>{this.props.name}</h3>
        <img src={this.props.url} alt=''/>
        <p>{this.props.email}</p>
        <button onClick={this.props.toggleLike}>{this.props.liked ? 'dislike': 'like'}</button>
      </div>
    )
  }
}


//Stateful Component
class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false,
      users: [],
    }
    this.getUsers = this.getUsers.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  componentWillMount() {
    this.getUsers();
  }

  toggleLike() {
    this.setState({
      isLiked: !this.state.isLiked,
    })
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
        {user.map((item, index) =>
          <CardItem
              key={index}
              name={item.name.first}
              toggleLike={this.toggleLike}
              liked={this.state.isLiked} url={item.picture.large}
              email={item.email}
          />
        )}
        <a className="text-center" href="#" onClick={this.getUsers}>load more...</a>
      </div>
    )
  }
}

export default App;
