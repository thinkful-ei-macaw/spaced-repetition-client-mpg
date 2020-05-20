import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';

class LearningRoute extends Component {
  state = {
    wordObj: {}
  }
  componentDidMount() {
  return fetch(`${config.API_ENDPOINT}/language/head`,
    {headers: {
        'authorization':`bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => res.json())
    .then(word => this.setState({wordObj: word}))
  }


  render() {
    return (
      <section>
        <h2>Translate the word:</h2>
        <h2>{this.state.wordObj.nextWord}</h2>
        <p>Your total score: {this.state.wordObj.totalScore}</p>
        <label>Enter your guess: </label>
        <input type="text" />
        <button type="submit" >Submit your answer</button>
        <p>You have answered this word correctly {this.state.wordObj.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {this.state.wordObj.wordCorrectCount} times.</p>
      </section>
    );
  }
}

export default LearningRoute
