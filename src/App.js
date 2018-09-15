import React, {Component} from 'react'
import Nav from './Nav'
import store, {_loadProducts, _createProduct, _deleteProduct} from './store'
import ProductList from './ProductList'
import { Provider } from 'react-redux'
import faker from 'faker'


class App extends Component {

  componentDidMount(){
    store.dispatch(_loadProducts())
  }

  handleCreate(event) {
    event.preventDefault()
    store.dispatch(_createProduct({
      name: faker.commerce.product() + " " + faker.commerce.productAdjective(),
      rating: Math.floor((faker.finance.amount())/10)
    }))
  }

  render() {

    return (
      <Provider store={store} >
        <div>
          <Nav />
          <div>
            <button onClick={this.handleCreate}>Create Product</button>
          </div>
          <ProductList />
        </div>
      </Provider>
    )
  }
}

export default App
