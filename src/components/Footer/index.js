import {Component} from 'react'
import {
  FaPinterestSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'
import Logo from './imgs/Vector.png'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer__main-cont">
        <div className="footer__logo-cont">
          <img className="footer__logo" src={Logo} alt="website logo" />
          <p className="footer__logo-text">Tasty Kitchens</p>
        </div>
        <p className="footer__content">
          The only thing we are serious about is food.Contact us on
        </p>
        <div className="footer__social-cont">
          <FaPinterestSquare />
          <FaFacebookSquare />
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>
    )
  }
}

export default Footer
