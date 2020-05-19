import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';

class DashboardRoute extends Component {

  state = {

    language: {},
    words: []

  }

  componentDidMount = () => {

    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then((res) => (!res.ok ? res.json()
        .then((e) => Promise.reject(e)) : res.json()))
      .then(obj => {
        this.setState({
          language: obj.language,
          words: obj.words
        })
      })

  }








  render() {
    console.log(this.state.language)
    console.log(this.state.words)
    return (
      <div>
        <section>
          <h2>{this.state.language.name}</h2>
          <button>Start Practicing</button>
          <ul>
            {this.state.words.map(word => {
              return <li key={word.id}>
                {word.original.toUpperCase()}  =  {word.translation} | Correct Count :  {word.correct_count} | Incorrect Count :  {word.incorrect_count}
              </li>

            })}
          </ul>
          <h3>Total Score : {this.state.language.total_score}</h3>
        </section>
      </div>
    );
  }

}




export default DashboardRoute
