import { createStore, applyMiddleware } from 'redux'
import {logger} from 'redux-logger'
import axios from 'axios'
import thunk from 'redux-thunk'


// action types
 const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
 const CREATE_PRODUCT = 'CREATE_PRODUCT'
 const DELETE_PRODUCT = 'DELETE_PRODUCT'



 // action creators

const loadProducts = (products)=> ({type: LOAD_PRODUCTS, products})
const createProduct = (product) => ({type: CREATE_PRODUCT, product})
const deleteProduct = (product) => ({type: DELETE_PRODUCT, product})


// thunks

const _loadProducts = ()=> {
  return (dispatch) => {
    axios.get('/api/products')
    .then(response => dispatch(loadProducts(response.data)))
  }
}

const _createProduct = (product) => {
  return (dispatch) => {
    axios.post('/api/products/create',product)
      .then(product => dispatch(createProduct(product.data)))
  }
}

const _deleteProduct = (product) => {
  return (dispatch) => {
    axios.delete(`/api/products/${product.id}`)
      .then(()=> dispatch(deleteProduct(product)))
  }
}


const initialState = {
  products: [],
  topRated: {}
}



const reducer = (state=initialState,action)=> {
  switch(action.type) {
    case LOAD_PRODUCTS:
      let topRating = 0
      let topRated = {}
      action.products.forEach(product => {
        if(product.rating >= topRating) {
          topRating = product.rating
          topRated = product
        }
      })
      return {...state, products: action.products, topRated: topRated}
    case CREATE_PRODUCT:
      if(action.product.rating >= state.topRated.rating) {
        return {...state, products: [...state.products, action.product], topRated: action.product}
      } else {
        return {...state, products: [...state.products, action.product], topRated: {...state.topRated}}
      }
    case DELETE_PRODUCT:
      const newProducts = state.products.filter( product => product.id !== action.product.id)
      let top = 0
      let topProduct = {}
      newProducts.forEach(product => {
        if(product.rating >= top) {
          top = product.rating
          topProduct = product
        }
      })

      return {...state, products: newProducts, topRated: topProduct}
    default: return state
  }
}

const store = createStore(reducer, applyMiddleware(logger, thunk))

export default store

export { _loadProducts, _createProduct, _deleteProduct }
