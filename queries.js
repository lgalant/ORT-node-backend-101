const Pool = require('pg').Pool
const isProduction = process.env.NODE_ENV === "production";

//  user: 'tchvxezibrybmr',
//  host: 'ec2-52-73-184-24.compute-1.amazonaws.com',
//  database: 'd4cb68hgmced7f',
//  password: '9424df5a9928fe9b9e69972bc436b4ba533283920b82e072228a2cd8002b6853',
const connectionString='postgres://tchvxezibrybmr:9424df5a9928fe9b9e69972bc436b4ba533283920b82e072228a2cd8002b6853@ec2-52-73-184-24.compute-1.amazonaws.com:5432/d4cb68hgmced7f'

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
})

const getPersonas = (request, response) => {
  pool.query('SELECT * FROM persona  ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPersonaById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM  persona WHERE "Id" = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const createPersona = (request, response) => {
  const { Nombre, FechaNac } = request.body

  pool.query('INSERT INTO persona ("Nombre", "FechaNac") VALUES ($1, $2) RETURNING *', [Nombre, FechaNac], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Persona added with ID: ${results.rows[0].Id}`)
  })
}


const updatePersona  = (request, response) => {
  const id = parseInt(request.params.id)
  const { Nombre, FechaNac } = request.body

  pool.query(
    'UPDATE persona SET "Nombre" = $1, "FechaNac" = $2 WHERE "Id" = $3',
    [Nombre, FechaNac, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Persona  modified with ID: ${id}`)
    }
  )
}

const deletePersona = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM persona WHERE "Id" = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getPersonas,
  getPersonaById,
  createPersona,
  updatePersona,
  deletePersona
}
