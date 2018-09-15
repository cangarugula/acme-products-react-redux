const express = require('express')
const path = require('path')
const { syncAndSeed, Product } = require('./db')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3000

syncAndSeed()

app.use(bodyParser.json())

app.get('/',(req,res,next)=> {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/dist',express.static(path.join(__dirname,'dist')))

app.get('/api/products', (req,res,next) => {
  Product.findAll()
    .then( products => res.send(products) )
})

app.post('/api/products/create', (req,res,next) => {
  Product.create(req.body)
    .then(product => res.send(product))
})

app.delete('/api/products/:id', (req,res,next) => {
  return Product.destroy({
    where: {
      id: req.params.id
    }
  })
})

app.listen(port, ()=> console.log(`listening on port: ${port}`))

