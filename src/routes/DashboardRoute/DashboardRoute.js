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
          <h2>{language.name}</h2>
          <a href="/learn" className="learnLink">Start practicing</a>
          <h3>Words to practice</h3>
          </div>
          {!words.length && <p>Loading...</p>}
          <ul>
            {words.map(word => {
              return <li key={word.id}>
                <h4 className="original">{word.original}</h4> =   
                <span className="translation">{word.translation}</span>
                <div className="check"> correct answer count:
                <span className="correct"> {word.correct_count} </span> 
                incorrect answer count: 
                <span className="incorrect"> {word.incorrect_count} </span>
                </div>
              </li>
            })}
          </ul>
          <h4>Total correct answers: {language.total_score}</h4>
        </section>
      </div>
    );
  }

}




export default DashboardRoute;
