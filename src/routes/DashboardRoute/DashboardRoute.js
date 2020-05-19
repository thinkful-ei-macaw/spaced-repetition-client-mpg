import React, { Component } from 'react'
import config from '../../config';
import TokenService from '../../services/token-service';

class DashboardRoute extends Component {
  state = {
    language: {},
    words: []
  }

  componentDidMount() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then((res) => (!res.ok ? res.json()
    .then((e) => Promise.reject(e)) : res.json()))
    .then(obj => this.setState({language: obj.language, words: obj.words}));  
  }
  

  render() {
   console.log(this.state.words);
    return (
      <section>
        <h2>{this.state.language.name}</h2>
        <button onClick={(e) => {e.preventDefault(); this.props.history.push('/learn')}}>Start practicing!</button>
        <h3>Words to practice</h3>
        <ul>{this.state.words.map(word => {
          return <li key={word.id}>{word.original.toUpperCase()}  |
          correct answer count: {word.correct_count} |
          incorrect answer count: {word.incorrect_count}</li>
        })}</ul>
        <h4>Total score: {this.state.language.total_score}</h4>
      </section>
    );
  }
}

export default DashboardRoute
