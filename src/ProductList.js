import React from 'react'
import {connect} from 'react-redux'
import ProductItem from './ProductItem'
import { _createProduct } from './store';
import faker from 'faker'

const ProductList = ({products,createProduct}) => {
  return (
    <div>
      <div>
        <button onClick={()=> createProduct() }>Create Product</button>
      </div>
      <ul>
        {
          products.map(product => (
            <ProductItem key={product.id} product={product} location={location}/>
          ))
        }
      </ul>
    </div>
  )
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: ()=> dispatch(_createProduct({
      name: faker.commerce.product() + ' ' + faker.commerce.productAdjective(),
      rating: Math.floor((faker.finance.amount())/10)
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
