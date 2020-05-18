import React, { Component } from 'react';
import config from '../../config';
import TokenService from '../../services/token-service';

class DashboardRoute extends Component {

  state = {

    language: []

  }

  componentDidMount = () => {

    fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then((data) => { console.log(data) })
      .then((result) => {
        this.setState({
          language: result
        })
      })

  }



  render() {
    console.log(this.state.language)
    return (
      <section>
        <p>{this.state.language.name}</p>
      </section>
    );
  }
}

export default DashboardRoute
