import React from 'react'
import {connect} from 'react-redux'
import ProductItem from './ProductItem'

const ProductList = ({products}) => {
  return (
    <ul>
      {
        products.map(product => (
          <ProductItem product={product} />
        ))
      }
    </ul>
  )
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(ProductList)
