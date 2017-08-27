import React, { Component } from 'react';

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    }
    this.searchHandleEvent = this.searchHandleEvent.bind(this);
  }

  searchHandleEvent(e) {
    const callback = () => {
      this.props.searchHandle(this.state.searchString);
    }
    this.setState({
      searchString: e.target.value,
    }, callback);
  }


  render() {
    const searchString = this.state.searchString;
    return (
      <div>
        <input type="text" onChange={this.searchHandleEvent} />
        // <button onClick={() => this.props.searchHandle(searchString)}>Search</button>
      </div>
    )
  }
}

export default SearchUser;
