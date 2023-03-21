import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import TastyContext from './context/TastyContext'
import LoginForm from './components/LoginForm/index'
import Home from './components/Home'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import './App.css'

class App extends Component {
  state = {cartlist: []}

  componentDidMount() {
    this.getLocal()
  }

  getLocal = () => {
    const localList = localStorage.getItem('cartData')
    let cartlist
    if (localList !== null) {
      cartlist = JSON.parse(localList)
    } else {
      cartlist = []
    }

    this.setState({cartlist})
  }

  localSet = () => {
    const {cartlist} = this.state
    const stringed = JSON.stringify(cartlist)

    localStorage.setItem('cartData', stringed)
  }

  clearCart = () => this.setState({cartlist: []}, this.localSet)

  addCartlist = list =>
    this.setState(p => {
      const nL = p.cartlist
      return {cartlist: [...nL, list]}
    }, this.localSet)

  plusButton = idv =>
    this.setState(p => {
      const nl = p.cartlist.map(each => {
        if (each.id === idv) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }, this.localSet)

      return {cartlist: nl}
    })

  minusButton = idv =>
    this.setState(p => {
      const nl = p.cartlist.filter(each => each.id === idv)
      const obj = nl[0]
      let n
      if (obj.quantity === 1) {
        n = p.cartlist.filter(each => each.id !== idv)
      } else {
        n = p.cartlist.map(each =>
          each.id === idv ? {...each, quantity: each.quantity - 1} : each,
        )
      }
      return {cartlist: n}
    }, this.localSet)

  render() {
    const {cartlist} = this.state
    console.log(cartlist)
    return (
      <TastyContext.Provider
        value={{
          cartlist,
          addCartlist: this.addCartlist,
          plusButton: this.plusButton,
          minusButton: this.minusButton,
          clearCart: this.clearCart,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </TastyContext.Provider>
    )
  }
}

export default App
