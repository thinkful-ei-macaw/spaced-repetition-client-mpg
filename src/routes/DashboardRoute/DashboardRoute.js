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


  render() {
    const { language, words } = this.context;

    return (
      <div>
        <section>
          <div className="langhead">
          <a href="/learn" className="learnLink">Start practicing!</a>
          <h2>{language.name}</h2> <h3>Words to practice</h3>
          </div>
          {!words.length && <p>Loading...</p>}
          <ul>
            {words.map(word => {
              return <li key={word.id} className="wordStat">
                <div>
                <span className="original">{word.original.toUpperCase()}</span>{' - '}    
                <span className="translation">{word.translation}</span>
                </div>
                <div>
                <span className="correct"> {word.correct_count} </span> {' | '}
                <span className="incorrect"> {word.incorrect_count} </span>
                </div>
              </li>
            })}
          </ul>
          <h4><i className="fas fa-check-circle"></i> Total correct answers: {language.total_score}</h4>
        </section>
      </div>
    );
  }

}




export default DashboardRoute;
