import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import TastyContext from '../../context/TastyContext'
import './index.css'
import Noitems from './imags/cooking 1.png'
import PlacedImg from './imags/Vector (1).png'

class Cart extends Component {
  state = {placed: false}

  goHome = () => {
    const {history} = this.props
    history.push('/')
  }

  renderNoitem = () => (
    <div className="cart__noitem-cont">
      <img src={Noitems} className="cart__noitem-image" alt="empty cart" />
      <h1 className="cart__noitem-heading">No Orders Yet!</h1>
      <p className="cart__noitem-para">
        Your cart is empty. Add something from the menu.
      </p>
      <button
        type="button"
        onClick={this.goHome}
        className="header__desktop-logout"
      >
        Order Now
      </button>
    </div>
  )

  changePlaced = () =>
    this.setState(p => {
      const {placed} = p
      const n = !placed

      return {placed: n}
    })

  renderCartList = (list, plus, minus) => {
    const {id, quantity, name, imageUrl, cost} = list

    const onPlus = event => {
      plus(event.target.value)
    }
    const onMinus = event => {
      minus(event.target.value)
    }

    return (
      <li key={id} className="cart__list-item">
        <img src={imageUrl} alt={name} className="cart__list-img" />
        <div className="cart__list-img-name">
          <h1 className="cart__list-name">{name} </h1>
          <div className="details__food-counter">
            <button
              type="button"
              className="details__food-plus-btn"
              value={id}
              onClick={onMinus}
            >
              -
            </button>
            <p className="details__food-quantity">{quantity}</p>
            <button
              type="button"
              className="details__food-plus-btn"
              value={id}
              onClick={onPlus}
            >
              +
            </button>
          </div>
          <p>{`₹ ${cost * quantity}`}</p>
        </div>
      </li>
    )
  }

  renderfinal = (cartlist, plusButton, minusButton, total, clearCart) => {
    const {placed} = this.state
    const c = () => {
      this.changePlaced()
      clearCart()
    }
    console.log(placed)
    if (placed) {
      return (
        <div className="cart__noitem-cont">
          <img
            src={PlacedImg}
            className="cart__placed-image"
            alt="empty cart"
          />
          <h1 className="cart__noitem-heading">Payment Successful</h1>
          <p className="cart__noitem-para">
            Thank you for ordering Your payment is successfully completed.
          </p>
          <button
            type="button"
            onClick={this.goHome}
            className="header__desktop-logout"
          >
            Go To Home Page
          </button>
        </div>
      )
    }
    if (cartlist.length === 0) {
      return this.renderNoitem()
    }
    return (
      <div className="cart__body-main">
        <div className="cart__list-title-cont">
          <p className="cart__list-title head">Item</p>
          <p className="cart__list-title">Quantity</p>
          <p className="cart__list-title">Price</p>
        </div>
        <ul className="cart__list-main-cont">
          {cartlist.map(each =>
            this.renderCartList(each, plusButton, minusButton),
          )}
        </ul>
        <hr className="cart__hr" />
        <div className="cart__total-cont">
          <h1 className="cart__total-head">Order Total : </h1>
          <div className="cart__total-amt-place">
            <h1 className="cart__total-head">{`₹ ${total}.00`}</h1>
            <button
              type="button"
              onClick={c}
              className="header__desktop-logout"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <TastyContext.Consumer>
        {value => {
          const {cartlist, clearCart, plusButton, minusButton} = value
          const {placed} = this.state
          console.log(placed)
          let total = 0
          cartlist.forEach(each => {
            const {quantity, cost} = each
            total += quantity * cost
          })
          console.log(total)

          return (
            <div className="cart__main-cont">
              <Header />
              {this.renderfinal(
                cartlist,
                plusButton,
                minusButton,
                total,
                clearCart,
              )}
              <Footer />
            </div>
          )
        }}
      </TastyContext.Consumer>
    )
  }
}

export default Cart
