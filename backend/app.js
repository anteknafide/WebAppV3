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

const multer = require('multer')
const jwt = require('jsonwebtoken')
const argon = require('argon2')

const UPLOAD_FOLDER = 'uploads'
const JWT_SEKRET = 'sekret'

const IUser = require('./user.interface')

// Udostępnienie całego folderu `uploads`
app.use(`/${UPLOAD_FOLDER}`, express.static(`${UPLOAD_FOLDER}`))

const ustawieniaZapisu = multer.diskStorage({
  destination: function (req, file, fz) {
    fz(null, UPLOAD_FOLDER)
  },
  filename: function(req, file, fz) {
    fz(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({
  storage: ustawieniaZapisu,
  dest: `${UPLOAD_FOLDER}/`,
  fileFilter: (req, file, fz) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      fz(null, true)
    } else {
      fz(new MediaError('Nieprawidłowy format pliku'))
    }
  }
})
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

// UŻYTKOWNICY
app.post(`/api/v1/login`, async (req, res) => {
  const {login, password} = req.body

  try {
    const user = await IUser.findUserByUsername(login)
    if(!user) {
      return res.status(404).json({message: "Nie znaleziono użytkownika"})
    }

    const czyTakieSame = await argon.verify(user.password, password)
    if(!czyTakieSame) {
      return res.status(401).json({message: "Błędne hasło"})
    }

    const token = jwt.sign({userId: user._id, login: user.login}, JWT_SEKRET, { expiresIn: '1h'})
    res.status(200).json({token})

  } catch(e) {
    return res.status(500).json({message: `Wewnątrzny błąd serwera: ${e}`})
  }
})
app.post(`/api/v1/register`, async (req, res) => {
  const {login, password} = req.body
  
  try {
    
    const hashPassword = await argon.hash(password)

    const nowyUser = {login, password: hashPassword}

    await IUser.createUser(nowyUser)

    res.status(201).json({message: `Konto o nazwie '${login}' zostało stworzone`})
  } catch(e) {
    res.status(500).json({message: `Wewnątrzny błąd serwera ${e}`})
  }
})

/**
 * Wartswa pośrednicza weryfikująca, czy w żądaniu występuje nagłówek zawierający token użytkownika
 * @param {Request} req obiekt przychodzącego żądania
 * @param {Response} res obiekt zawierający odpowiedź
 * @param {NextFunction} next następna funkcja pośrednicza w cyklu żądania
 * @returns Odpowiedź JSON w przypadku niepowodzenia autoryzacji
 */
function weryfikujToken(req, res, next) {

  const token = req.get('Authorization')

  if(!token) {
    return res.status(401).json({message: "Brak autoryzacji: Brak JWT"})
  }

  try {
    const zdekodowanyToken = jwt.verify(token.split(' ')[1], JWT_SEKRET)
    req.user = zdekodowanyToken
    next()
  } catch(e) {
    return res.status(401).json({message: `Brak autoryzacji: ${e}`})
  }}