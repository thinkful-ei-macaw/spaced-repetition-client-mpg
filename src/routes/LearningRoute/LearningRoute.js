import React, { Component } from 'react';
import LanguageApi from '../../services/language-api-service';
import LearningContext from './../../contexts/LearningContext';
import TokenService from '../../services/token-service';


class LearningRoute extends Component {


  static contextType = LearningContext

  componentDidMount() {
    this.context.reset();

    LanguageApi.getLanguageHead()
      .then(head => {
        this.context.setTotalScore(head.totalScore)
        this.context.setWordCorrectCount(head.wordCorrectCount)
        this.context.setWordIncorrectCount(head.wordIncorrectCount)
        this.context.setNextWord(head.nextWord)
      })
      .catch(err => {
        if (err.error === 'Unauthorized') {
          TokenService.clearAuthToken()
          this.props.history.push('/login')
        }
        this.context.setError(err)
      })

  }

  render() {
    const { nextWord, wordCorrectCount, wordIncorrectCount, totalScore } = this.context;
    return (
      <section>
        <h2>Translate the word:</h2>
        <h2>{nextWord}</h2>
        <p>Your total score: {totalScore}</p>
        <label>Enter your guess: </label>
        <input type="text" />
        <button type="submit" >Submit your answer</button>
        <p>You have answered this word correctly {wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {wordIncorrectCount} times.</p>
      </section>
    );
  }
}

export default LearningRoute
