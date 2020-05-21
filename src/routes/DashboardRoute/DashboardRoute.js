import React, { Component } from 'react';
import LanguageApi from '../../services/language-api-service'
import TokenService from '../../services/token-service';
import LanguageContext from '../../contexts/LanguageContext';
import Button from '../../components/Button/Button';


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


  render() {
    const { language, words } = this.context
    console.log(words)

    return (
      <div>
        <section>
          <h2>{language.name}</h2>
          <Button onClick={(e) => { e.preventDefault(); this.props.history.push('/learn') }}>Start Practicing</Button>
          {!words.length && <p>Loading...</p>}
          <ul>
            {words.map(word => {
              return <li key={word.id}>
                <span className="original">{word.original}</span> =   
                <span className="translation"> 
                {word.translation}</span> <div className="check"> Correct:  <span className="correct">{word.correct_count}</span> | 
                   Incorrect:  <span className="incorrect">{word.incorrect_count}</span></div>
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
