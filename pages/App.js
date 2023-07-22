import React from 'react'
import HomePage from './HomePage'
import { Provider } from 'react-redux'
import store from './store/index';

export default function App() {
  return (
    <Provider store={store}>
    <div className="bg- white   text-white">
      <HomePage/>
    </div>
    </Provider> 
  )
}


