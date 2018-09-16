import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

const Nav = ({products,topRated}) => {
  return (
    <ul>
      <Link to='/'><li>Products ({products.length})</li></Link>
      <Link to={`/${topRated.id}`}><li>Top Rated ({topRated.name})</li></Link>
    </ul>
  )
}

const mapStateToProps = ({products,topRated}) => {
  return {
    products,
    topRated
  }
}

export default connect(mapStateToProps)(Nav)
