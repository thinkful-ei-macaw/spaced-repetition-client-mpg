import React, { Component } from 'react';
import LanguageApi from '../../services/language-api-service'
import TokenService from '../../services/token-service';
import LanguageContext from '../../contexts/LanguageContext';





class DashboardRoute extends Component {

  static contextType = LanguageContext

  componentDidMount() {
    LanguageApi.getLanguage()
      .then(response => {
        this.context.setLanguage(response.language)
        this.context.setWords(response.words)
      })
      .catch(err => {
        if (err.error === 'Unauthorized') {
          TokenService.clearAuthToken()
          this.props.history.push('/login')
        }
        this.context.setError(err)
      })
  }

  //   correct_count: 15
  // id: 10
  // incorrect_count: 35
  // language_id: 2
  // memory_value: 1
  // next: 9
  // original: "bonjour"
  // translation: "hello"


  render() {

    // console.log(this.context.words)
    const { language, words } = this.context
    console.log(words)

    return (


      <div>
        <section>
          <h2>{language.name}</h2>
          <p>{words}</p>
          <button onClick={(e) => { e.preventDefault(); this.props.history.push('/learn') }}>Start Practicing</button>
          <ul>
            {words.map(word => {
              return <li key={word.id}>
                {word.original.toUpperCase()}  =  {word.translation} | Correct Count :  {word.correct_count} | Incorrect Count :  {word.incorrect_count}
              </li>
            })}
          </ul>
          <h3>Total Score : {language.total_score}</h3>
        </section>
      </div>
    );
  }

}




export default DashboardRoute
