import React from 'react';
import LastFm from './components/LastFm';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const user = window.localStorage.getItem('user');

    this.state = {
      user: user,
      userFieldValue: null,
    }
  }

  handleSubmit = (event) => {
    const { userFieldValue } = this.state;
    window.localStorage.setItem('user', userFieldValue);
    this.setState({user: userFieldValue});
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({userFieldValue: event.target.value});
  }

  render () {
    const { user } = this.state;

    if (user && user !== null && user !== '') {
      return (
        <LastFm user={this.state.user}/>
      );
    }

    return (
      <form onSubmit={this.handleSubmit} class="user_form">
        <label>
          username:
          <input type="text" name="username" onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}
