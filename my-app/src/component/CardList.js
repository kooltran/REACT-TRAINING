import React, { Component } from 'react';
import CardItem from './CardItem';
import AddUser from './AddUser';

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listLiked: [],
      users: [],
      listRemoved: [],
      searchString: '',
    }
    this.getUsers = this.getUsers.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.removeUsers = this.removeUsers.bind(this);
    this.getInfoItem = this.getInfoItem.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  componentWillMount() {
    this.getUsers();
  }

  removeUsers(userEmail) {
    this.setState({
      users: this.state.users.filter(user => user.email !== userEmail),
    })
  }

  toggleLike(userEmail) {
    const { listLiked } = this.state;
    const isLiked = listLiked.find((email) => email === userEmail);
    if (isLiked) {
      this.setState({
        listLiked: listLiked.filter(email => email !== userEmail),
      })
    } else {
      this.setState({
        listLiked: listLiked.concat(userEmail),
      })
    }
  }

  getUsers() {
    return fetch('https://randomuser.me/api/?results=10', {
      method: 'get',
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        users: [...this.state.users, ...data.results],
        searchList: [...this.state.users, ...data.results]
      })
    })
  }

  getInfoItem(newName, newEmail) {
    const newUser = {
      name: {
        first: newName,
      },
      email: newEmail,
      picture: {
        large: 'https://community.openhab.org/images/emoji/emoji_one/sunglasses.png?v=3'
      },
    };
    this.setState({
      users: [...this.state.users, newUser]
    })
  }

  renderList() {
    const searchString = this.state.searchString;
    const searchByName = (user) => {
        return searchString.length === 0 || (user.name.first).indexOf(searchString) !== -1
    }
    const searchedList = this.state.users.filter(searchByName);
    return searchedList.map((item, index) => {
      return (
        <CardItem
            key={index}
            name={item.name.first}
            toggleLike={this.toggleLike}
            removeUsers={this.removeUsers}
            liked={this.state.listLiked.find(email => email === item.email)}
            url={item.picture.large}
            email={item.email}
        />
      )
    })
  }

  render() {
    const users = this.state.users;
    return (
      <div className="container">
        <AddUser getInfo={this.getInfoItem} />
        <input type="text" onChange={(e) => this.setState({searchString: e.target.value})}  placeholder="Type to search..." />
        {
          users.length > 0
          ? this.renderList()
          : <p>Loading...</p>
        }
        <a className="text-center" href="#" onClick={this.getUsers}>load more...</a>
      </div>
    )
  }
}

export default CardList;
