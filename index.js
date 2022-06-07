const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node 101 ORT Proyecto' })
})

app.listen(process.env.PORT ||port, () => {
  console.log(`App running on port ${port}.`)
})

app.get('/personas', db.getPersonas)
app.get('/personas/:id', db.getPersonaById)
app.post('/personas', db.createPersona)
app.put('/personas/:id', db.updatePersona)
app.delete('/personas/:id', db.deletePersona)
