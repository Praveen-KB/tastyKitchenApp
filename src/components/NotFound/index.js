import NotImg from './imgs/erroring 1.png'

const NotFound = props => {
  const goHome = () => {
    const {history} = props
    history.push('/')
  }

  return (
    <div className="not__noitem-cont">
      <img src={NotImg} className="cart__noitem-image" alt="empty cart" />
      <h1 className="cart__noitem-heading">Page Not Found</h1>
      <p className="cart__noitem-para">
        We are sorry, the page you requested could not be found.Please go back
        to the homepage
      </p>
      <button type="button" onClick={goHome} className="header__desktop-logout">
        Home Page
      </button>
    </div>
  )
}

export default NotFound
