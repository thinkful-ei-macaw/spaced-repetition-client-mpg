import React, { Component } from 'react';
import config from '../../config';

class DashboardRoute extends Component {


  state = {

    language: []

  }

  componentDidMount = () => {

    fetch(`${config.API_ENDPOINT}/language`)
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
