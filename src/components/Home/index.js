import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsCaretDownFill, BsCheck2, BsStarFill} from 'react-icons/bs'
import {MdOutlineSort} from 'react-icons/md'
import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'
import LoaderSpinner from '../LoaderSpinner'
import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const load = {
  load: 'LOAD',
  suc: 'SUCCESS',
  fail: 'FAIL',
}

class Home extends Component {
  state = {
    offerList: [],
    selecedValue: 'Highest',
    sortDropDown: false,
    offset: 0,
    restList: [],
    totalPages: 0,
    pageNo: 1,
    bannerstatue: load.load,
    fetchStatues: load.load,
  }

  componentDidMount() {
    this.getOffers()
    this.getRestaruntList()
  }

  getRestaruntList = async () => {
    this.setState({fetchStatues: load.load})
    const jwt = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const {offset, selecedValue} = this.state
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${selecedValue}`
    const response = await fetch(apiUrl, option)
    const data = await response.json()
    const {total} = data
    const totalPages = Math.ceil(total / 9)
    this.setState({
      restList: data.restaurants,
      totalPages,
      fetchStatues: load.suc,
    })
  }

  getOffers = async () => {
    this.setState({bannerstatue: load.load})
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwt = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(apiUrl, option)
    const data = await response.json()
    this.setState({offerList: data.offers, bannerstatue: load.suc})
  }

  leftArrow = () =>
    this.setState(p => {
      let pgn = p.pageNo
      let off = p.offset

      if (pgn !== 1) {
        pgn -= 1
        off -= 9
      }

      return {pageNo: pgn, offset: off}
    }, this.getRestaruntList)

  rightArrow = () =>
    this.setState(p => {
      let pgn = p.pageNo
      let off = p.offset
      const tp = p.totalPages

      if (pgn !== tp) {
        pgn += 1
        off += 9
      }

      return {pageNo: pgn, offset: off}
    }, this.getRestaruntList)

  renderOffer = list => (
    <div key={list.id} className="home__slider-item">
      <img className="home__slider-img" src={list.image_url} alt="offer" />
    </div>
  )

  changeSort = event =>
    this.setState(
      {selecedValue: event.target.value, sortDropDown: false},
      this.getRestaruntList,
    )

  showSort = () => this.setState({sortDropDown: true})

  renderSortby = list => {
    const {id, value, displayText} = list
    const {selecedValue} = this.state
    return (
      <button
        type="button"
        className={`home__options ${selecedValue === value && 'select-active'}`}
        key={id}
        value={value}
        onClick={this.changeSort}
      >
        {displayText}
        {selecedValue === value && <BsCheck2 className="home__check-icon" />}
      </button>
    )
  }

  renderRestCard = list => (
    <li className="home__restaurant-list-item" key={list.id}>
      <Link to={`/restaurant/${list.id}`} className="home__restaurant-link">
        <img
          src={list.image_url}
          alt="restarunt img"
          className="home__restaurant-img"
        />
        <div className="home_restaurant-details-cont">
          <h1 className="home__restaurant-name">{list.name}</h1>
          <p className="home__restaurant-cuisine">{list.cuisine}</p>
          <div className="home__rating-cont">
            <BsStarFill className="home_rating-star" />
            <p className="home__rating">{list.user_rating.rating}</p>
            <p className="home__total-ratings">
              {`(${list.user_rating.total_reviews} ratings)`}
            </p>
          </div>
        </div>
      </Link>
    </li>
  )

  render() {
    const {
      offerList,
      selecedValue,
      sortDropDown,
      restList,
      pageNo,
      totalPages,
      bannerstatue,
      fetchStatues,
    } = this.state

    console.log(
      offerList,
      selecedValue,
      sortDropDown,
      restList,
      pageNo,
      totalPages,
    )
    const settings = {
      dots: true,
      infinite: true,
      speed: 2000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    }
    return (
      <div className="home__main-cont">
        <Header />

        <div className="home__slider-cont">
          {bannerstatue === load.load ? (
            <LoaderSpinner />
          ) : (
            <Slider {...settings}>
              {offerList.map(each => this.renderOffer(each))}
            </Slider>
          )}
        </div>
        <div className="home__body-main-cont">
          <h1 className="home__body-heading">Popular Restaurants</h1>
          <div className="home__body-para-sort">
            <p className="home__body-para">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
            <div className="home__select-main-cont">
              <button
                onClick={this.showSort}
                className="home__select-text-cont"
                type="button"
              >
                <MdOutlineSort />
                <span className="home__select-span">Sort by</span>
                <span className="home__select" name="sort">
                  {selecedValue}
                </span>
                <BsCaretDownFill />
              </button>
              <div
                className={`home__select-option-cont ${
                  !sortDropDown && 'option-hidden'
                }`}
              >
                {sortByOptions.map(each => this.renderSortby(each))}
              </div>
            </div>
          </div>
        </div>
        {fetchStatues === load.load ? (
          <LoaderSpinner />
        ) : (
          <ul className="home__restaurant-all-cont">
            {restList.map(each => this.renderRestCard(each))}
          </ul>
        )}
        <div className="home__controll-cont">
          <button
            type="button"
            onClick={this.leftArrow}
            className="home_left-arrow"
          >
            <AiOutlineDoubleLeft />
          </button>
          <p className="home__pagination">{`${pageNo} of ${totalPages}`}</p>
          <button
            type="button"
            onClick={this.rightArrow}
            className="home_right-arrow"
          >
            <AiOutlineDoubleRight />
          </button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
