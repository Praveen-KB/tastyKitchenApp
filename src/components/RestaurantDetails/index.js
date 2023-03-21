import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'

import LoaderSpinner from '../LoaderSpinner'
import './index.css'

import TastyContext from '../../context/TastyContext'

class ReastaurantDetails extends Component {
  state = {details: {}, foodItem: [], load: true}

  componentDidMount() {
    this.getRestDetails()
  }

  getRestDetails = async () => {
    this.setState({load: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwt = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(apiUrl, option)
    const data = await response.json()
    console.log(data.food_items)
    this.setState({details: data, foodItem: data.food_items, load: false})
  }

  renderFoodItemsCard = (list, addCartlist, cartlist, plus, minus) => {
    const addButton = () => {
      const newDic = {
        id: list.id,
        quantity: 1,
        name: list.name,
        imageUrl: list.image_url,
        cost: list.cost,
      }
      addCartlist(newDic)
    }

    const onPlus = event => {
      plus(event.target.value)
    }
    const onMinus = event => {
      minus(event.target.value)
    }

    const findObj = cartlist.filter(each => list.id === each.id)

    return (
      <li key={list.id} className="details__food-item-cont">
        <img
          src={list.image_url}
          alt="thumbnail"
          className="details__food-item-image"
        />
        <div className="details__food-item-details-cont">
          <h1 className="details__food-item-name">{list.name}</h1>
          <p className="details__food-item-price">{`₹${list.cost}`}</p>
          <div className="details__food-rating-star-cont">
            <BsStarFill className="details__food-rating-star" />
            <p className="details__food-rating-text">{list.rating}</p>
          </div>
          {findObj[0] !== undefined ? (
            <div className="details__food-counter">
              <button
                type="button"
                className="details__food-plus-btn"
                value={list.id}
                onClick={onMinus}
              >
                -
              </button>
              <p className="details__food-quantity">{findObj[0].quantity}</p>
              <button
                type="button"
                className="details__food-plus-btn"
                value={list.id}
                onClick={onPlus}
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              value={list.id}
              className="details__food-add-btn"
              onClick={addButton}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }

  render() {
    return (
      <TastyContext.Consumer>
        {value => {
          const {cartlist, addCartlist, plusButton, minusButton} = value
          const {details, foodItem, load} = this.state
          console.log(cartlist)
          return (
            <div className="details__main-cont">
              <Header />
              {load ? (
                <LoaderSpinner />
              ) : (
                <>
                  <div className="details__banner-cont">
                    <img
                      src={details.image_url}
                      alt="hotel img"
                      className="details__banner-image"
                    />
                    <div className="details__banner-details-cont">
                      <h1 className="details__banner-heading">
                        {details.name}
                      </h1>
                      <p className="details__banner-cusine">
                        {details.cuisine}
                      </p>
                      <p className="details__banner-cusine">
                        {details.location}
                      </p>
                      <div className="details__banner-rating-amt-cont">
                        <div className="details__banner-rating-cont">
                          <div className="details__banner-rating-star-cont">
                            <BsStarFill className="details__banner-rating-star" />
                            <p className="details__banner-rating-text">
                              {details.rating}
                            </p>
                          </div>
                          <p className="details__banner-reviews-count">{`${details.reviews_count}+ Ratings`}</p>
                        </div>
                        <hr className="details__banner-hr" />
                        <div className="details__banner-rating-cont">
                          <p className="details__banner-rating-text">{`₹ ${details.cost_for_two}`}</p>
                          <p className="details__banner-reviews-count">
                            Cost for two
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="details__food-list-main">
                    {foodItem.map(each =>
                      this.renderFoodItemsCard(
                        each,
                        addCartlist,
                        cartlist,
                        plusButton,
                        minusButton,
                      ),
                    )}
                  </ul>
                </>
              )}
              <Footer />
            </div>
          )
        }}
      </TastyContext.Consumer>
    )
  }
}

export default ReastaurantDetails
