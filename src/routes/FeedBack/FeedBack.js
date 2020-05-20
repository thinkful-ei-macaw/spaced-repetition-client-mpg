import React, { Component } from 'react';
import LearningContext from '../../contexts/LearningContext';
import Button from '../../components/Button/Button';

export default class FeedBack extends Component {
  static contextType = LearningContext;

  nextButton = React.createRef();

  goToNextWord = () => {
    //this.context.setIsCorrect(null);
  };

  componentDidMount() {
    this.nextButton.current.focus();
  }

  render() {

    const { isCorrect, prevWord, answer, guess } = this.context;
    console.log('answer', answer);
    return (
      <div>
        {isCorrect ? (
          <h2>You are correct!</h2>
        ) : (
          <h2>You are terrible at this!</h2>
        )}
        <p>
          The correct translation for <span>{prevWord}</span> was{" "}
          <span>{answer}</span> <br />
          Your answer was <span>{guess}</span>
        </p>
        <Button ref={this.nextButton} onClick={this.goToNextWord}>
          Try another word
        </Button>
      </div>
    );
  }
}