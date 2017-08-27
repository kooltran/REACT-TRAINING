import React, { Component } from 'react';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newName: '',
      newEmail: '',
    }
  }

  render() {
    const newName = this.state.newName;
    const newEmail = this.state.newEmail;
    return (
      <div>
        <form action="">
          <h2>Add more user</h2>
          <div className="form-group">
            <label>Name</label>
            <input className="form-control" type="text" onChange={(e) => this.setState({newName: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="text" onChange={(e) => this.setState({newEmail: e.target.value})} />
          </div>
          {newName.length > 0 && newEmail.length > 0 && <button type="button" className="btn btn-default" onClick={() => this.props.getInfo(newName, newEmail)}>Add</button>}
        </form>
      </div>
    )
  }
}

export default AddUser;
