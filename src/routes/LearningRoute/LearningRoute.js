import React, { Component } from "react";
import LanguageApi from "../../services/language-api-service";
import LearningContext from "../../contexts/LearningContext";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Form/Form";

class LearningRoute extends Component {
  static contextType = LearningContext;

  componentDidMount() {
    this.context.reset();

    LanguageApi.getLanguageHead().then((langHead) => {
      this.context.setNextWord(langHead.nextWord);
      this.context.setWordCorrectCount(langHead.wordCorrectCount);
      this.context.setWordIncorrectCount(langHead.wordIncorrectCount);
      this.context.setTotalScore(langHead.totalScore);
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    LanguageApi.postGuess(event.target.guess.value)
    .then(res => {
      console.log(res);
      this.context.setAnswer(res.answer);
      this.context.setTotalScore(res.totalScore);
      this.context.setIsCorrect(res.isCorrect);
      this.context.setGuess(res.guess);
      this.props.history.push('/feedback');
    })

  }

  render() {
    const {
      nextWord,
      wordCorrectCount,
      wordIncorrectCount,
      totalScore,
    } = this.context;
    return (
      <section>
        <form className="postGuess" onSubmit={this.handleSubmit}>
          <h2>Translate the word:</h2>
          <h2>{nextWord}</h2>
          <p>Your total score: {totalScore}</p>
          <label>Enter your guess: </label>
          <Input type="text" name="guess" id="guess" required/>
          <Button type="submit">Submit your answer</Button>
          <p>You have answered this word correctly {wordCorrectCount} times.</p>
          <p>
            You have answered this word incorrectly {wordIncorrectCount} times.
          </p>
        </form>
      </section>
    );
  }
}

export default LearningRoute;
