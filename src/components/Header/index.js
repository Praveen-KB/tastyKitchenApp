import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillCloseCircle, AiOutlineMenu} from 'react-icons/ai'
import './index.css'
import Logo from './imgs/Frame 274.png'

class Header extends Component {
  state = {activeLink: '/', mobileDisplay: false}

  componentDidMount() {
    this.getactiveLink()
  }

  getactiveLink = () => {
    const {history} = this.props
    this.setState({activeLink: history.location.pathname})
  }

  logOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  showMenu = () =>
    this.setState(p => {
      const {mobileDisplay} = p
      const n = !mobileDisplay
      return {mobileDisplay: n}
    })

  closeMenu = () =>
    this.setState(p => {
      const {mobileDisplay} = p
      const n = !mobileDisplay
      return {mobileDisplay: n}
    })

  render() {
    const {activeLink, mobileDisplay} = this.state

    return (
      <div className="header__main">
        <div className="header__logo-cont">
          <img className="header__logo" src={Logo} alt="website logo" />
          <p className="header__logo-text">Tasty Kitchens</p>
        </div>
        <button
          type="button"
          onClick={this.showMenu}
          className="header__mobile-ham"
        >
          <AiOutlineMenu />
        </button>
        <div className="header__desktop-menu">
          <Link
            to="/"
            className={`header__desktop-link ${activeLink === '/' && 'active'}`}
          >
            <p className="header__desktop-link-text">Home</p>
          </Link>
          <Link
            to="/cart"
            className={`header__desktop-link ${
              activeLink === '/cart' && 'active'
            }`}
          >
            <p className="header__desktop-link-text">Cart</p>
          </Link>
          <button
            type="button"
            className="header__desktop-logout"
            onClick={this.logOut}
          >
            Logout
          </button>
        </div>

        <div className={`header__mobile-menu  ${!mobileDisplay && 'hidden'}`}>
          <div className="header__mobile-links">
            <Link
              to="/"
              className={`header__desktop-link ${
                activeLink === '/' && 'active'
              }`}
            >
              <p className="header__desktop-link-text">Home</p>
            </Link>
            <Link
              to="/cart"
              className={`header__desktop-link ${
                activeLink === '/cart' && 'active'
              }`}
            >
              <p className="header__desktop-link-text">Cart</p>
            </Link>
            <button
              type="button"
              className="header__desktop-logout"
              onClick={this.logOut}
            >
              Logout
            </button>
          </div>
          <button
            type="button"
            onClick={this.closeMenu}
            className="header__mobile-close"
          >
            <AiFillCloseCircle className="header__mobile-close-icon" />
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
