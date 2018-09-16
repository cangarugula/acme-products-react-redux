import React from 'react'
import {connect} from 'react-redux'
import { _deleteProduct } from './store';

const ProductItem = ({product,deleteProduct}) => {
  return (
    <li>
    {product.name} {product.rating}
    <button key={product.id} onClick={()=> {
      deleteProduct(product)
      window.history.back()
      }}>x</button>
    </li>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (product)=> dispatch(_deleteProduct(product))
  }
}


export default connect(null, mapDispatchToProps)(ProductItem)
