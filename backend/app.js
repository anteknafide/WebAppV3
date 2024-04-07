require('dotenv').config()

const nano = require('nano')(`http://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@localhost:5984`)
const colors = require('colors')
const bodyParser = require('body-parser')

const express = require('express')
const cors = require('cors')

const DB_NAME = 'clothingshop'
const PORT = 5555

const app = express()
app.use(cors())
app.use(bodyParser.json())

const DB = nano.use(DB_NAME)

function wypisz_blad(metoda, url, status, blad) {
  console.log(`${metoda}`.bold.green + ` ${url}`.underline + ` ${status}`.bold.red + ` ${blad}`.red)
}
function wypisz_trase(metoda, url, status) {
  console.log(`${metoda}`.bold.green + ` ${url}`.underline + ` ${status}`.bold.green)
}

app.get('/api/v1/clothingshop', (req, res) => {
  DB.list({include_docs: true}, (error, dane) => {
    if(error) {
      res.status(500).json({error: `Internal Server Error: ${error.message}`})
      wypisz_blad(req.method, req.url, res.statusCode, error.message)
      return
    }

    wypisz_trase(req.method, req.url, res.statusCode)
    const wszystkieDokumenty = dane.rows.map(wiersz => wiersz.doc)
    res.status(200).json(wszystkieDokumenty)
  })
})
app.post('/api/v1/clothingshop', (req, res) => {
  const dokument = {
    name:           req.body.name,
    description:    req.body.description,
    price:          req.body.price,
    category:       req.body.category
  }
  DB.insert(dokument, (err, body) => {
    if(err) {
      res.status(500).json({error: `Internal Server Error: ${err.message}`})
      wypisz_blad(req.method, req.url, res.statusCode, err.message)
      return
    }
    wypisz_trase(req.method, req.url, res.statusCode)
    console.log(`Dodano item ${dokument.name}`.green)
    res.status(200).json({message: 'Dokument dodany'})
  })
})
app.delete(`/api/v1/clothingshop/:id/:rev`, (req, res) => {
   const id = req.params.id
  const rev = req.params.rev

  DB.destroy(id, rev, (err, body) => {
    if(err) {
      res.status(500).json({error: `Internal Server Error: ${err.message}`})
      wypisz_blad(req.method, req.url, res.statusCode, err.message)
      return
    }
    wypisz_trase(req.method, req.url, res.statusCode)
    res.status(200).json({message: 'Dokument usunięty'})
  })
})
app.patch(`/api/v1/clothingshop`, (req, res) => {
  const dokument = {
    _id:            req.body._id,
    _rev:           req.body._rev,
    name:           req.body.name,
    description:    req.body.description,
    price:          req.body.price,
    category:       req.body.category
  }
  DB.insert(dokument, (err, body) => {
    if(err) {
      res.status(500).json({error: `Internal Server Error: ${err.message}`})
      wypisz_blad(req.method, req.url, res.statusCode, err.message)
      return
    }
    wypisz_trase(req.method, req.url, res.statusCode)
    console.log(`Edytowano item ${dokument.name}`.green)
    res.status(200).json({message: 'Dokument zaktualizowany'})
  })
})
app.listen(PORT, () => {
  console.log(`Serwer działa na adresie http://localhost:${PORT}`.green)
})