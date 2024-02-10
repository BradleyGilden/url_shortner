const express = require('express');

const app = express();

app.use(express.json())
// body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
// use ejs as template engine
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.status(200).render('index')
})

app.listen(3000, () => {
  console.log("server listening on port 3000...")
})
