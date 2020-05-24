import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'
import Button from '../../components/Button/Button';

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className="Header">
        <h4>
          {this.context.user.name}!
        </h4>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login' className="logout">
          <Button type="submit"  value={this.context.user.name}>Logout</Button>
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className='login-register'>
        <Link to='/login'>Login</Link>
        {' '}
        <Link to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <h1>
          <Link to='/'>
            Spaced repetition
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
