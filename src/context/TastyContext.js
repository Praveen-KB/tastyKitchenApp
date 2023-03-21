import React from 'react'

const TastyContext = React.createContext({
  cartList: [],
  addCartlist: () => {},
  plusButton: () => {},
  minusButton: () => {},
  clearCart: () => {},
})

export default TastyContext
