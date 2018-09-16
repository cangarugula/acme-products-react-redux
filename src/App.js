import React, {Component} from 'react'
import Nav from './Nav'
import store, {_loadProducts, _createProduct, _deleteProduct} from './store'
import ProductList from './ProductList'
import ProductItem from './ProductItem'
import { Provider } from 'react-redux'
import faker from 'faker'
import {HashRouter as Router,Route, Switch} from 'react-router-dom'


class App extends Component {
  componentDidMount(){
    store.dispatch(_loadProducts())
  }


  render() {
    return (
        <Provider store={store} >
          <Router>

            <div>
              <Nav />
              <Switch>
                <Route exact path='/' component={ProductList} />
                <Route path='/:id' render={ ()=> <ProductItem product={store.getState().topRated}/>} />
              </Switch>
            </div>
            </Router>
        </Provider>
    )
  }
}

export default App
