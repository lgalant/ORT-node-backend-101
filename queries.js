const Pool = require('pg').Pool
const databaseURL='postgres://tchvxezibrybmr:9424df5a9928fe9b9e69972bc436b4ba533283920b82e072228a2cd8002b6853@ec2-52-73-184-24.compute-1.amazonaws.com:5432/d4cb68hgmced7f'
const pool = new Pool({
//  user: 'tchvxezibrybmr',
//  host: 'ec2-52-73-184-24.compute-1.amazonaws.com',
//  database: 'd4cb68hgmced7f',
//  password: '9424df5a9928fe9b9e69972bc436b4ba533283920b82e072228a2cd8002b6853',
  connectionString: databaseURL,
  port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM esquema1.persona  ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM   esquema1.persona WHERE "Id" = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  getUserById,
//  createUser,
//  updateUser,
//  deleteUser,
}
