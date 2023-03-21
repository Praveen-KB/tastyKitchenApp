import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

import Logo from './imgs/Frame 274.png'

class LoginForm extends Component {
  state = {username: '', password: '', isError: false, errMsg: ''}

  onClickFormSub = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30, path: '/'})
      history.replace('/')
    } else {
      this.setState({isError: true, errMsg: data.error_msg})
    }
    console.log(data)
  }

  inputChange = event => this.setState({username: event.target.value})

  passwordChange = event => this.setState({password: event.target.value})

  render() {
    const {username, password, isError, errMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login__main">
        <div className="login__form-cont">
          <form className="login__form" onSubmit={this.onClickFormSub}>
            <div className="login__logo-cont">
              <img className="login__logo" src={Logo} alt="website logo" />
              <p className="login__logo-text">Tasty Kitchens</p>
            </div>
            <h1 className="login__heading">Login</h1>
            <label className="login__label" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.inputChange}
              className="login__input"
              type="text"
              id="username"
              value={username}
            />
            <label className="login__label" htmlFor="pass">
              PASSWORD
            </label>
            <input
              onChange={this.passwordChange}
              className="login__input"
              type="password"
              id="pass"
              value={password}
            />
            {isError && <p className="login__error">{errMsg}</p>}
            <button className="login__btn" type="submit">
              Login
            </button>
          </form>
        </div>
        <div className="login__bg-img-cont">
          {/* <img className="login__bg-image" src={DesktopImg} alt="img" /> */}
        </div>
      </div>
    )
  }
}

export default LoginForm
