import React, { Component } from "react";
import LearningContext from "../../contexts/LearningContext";
import Button from "../../components/Button/Button";

export default class FeedBack extends Component {
  static contextType = LearningContext;


  render() {
    const { isCorrect, answer, nextWord, guess, totalScore } = this.context;
    return (
      <div>
        <main>
        {isCorrect ? (
          <h2 className="correct">You were correct! :D<i class="far fa-smile"></i></h2>
        ) : (
          <h2 className="incorrect">Good try, but not quite right :(<i class="far fa-frown"></i></h2>
        )}
          <div className='DisplayScore'><p>Your total score is: {totalScore}</p></div>
          <div className="DisplayFeedback"><p>The correct translation for <span className="makeBold">{nextWord}</span> was{" "}
            <span className="makeBold">{answer}</span>
            </p>
            <p> and you chose <span className="makeBold">{guess}</span>!</p>
          </div>
          <Button onClick={e => {e.preventDefault(); this.props.history.push('/learn')}}>
            Try another word!
          </Button>
          </main>
      </div>
    );
  }
}
