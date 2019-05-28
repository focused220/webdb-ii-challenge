const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', async (req, res) => {
  console.log(req.body)
  try{
    const newName = req.body;
    const newZoo = await db.insert(newName).into('zoos').then(zoo => {res.status(201).json(zoo)})
  }catch(error){res.status(500).json(`{error: Unable to add new Zoom item}`)}

})

server.get('/api/zoos', async (req, res) => {
  try{
    const allZoos = await db('zoos').then(zoo =>{res.status(201).json(zoo)})
  }
  catch(error){ res.status(500).json(`{error: unable to retrieve zoos}`)}
})

server.get('/api/zoos/:id', async (req, res) => {
  const {id} = req.params
  try{
    const allZoos = await db('zoos').where('id', '=', id).then(zoo =>{res.status(201).json(zoo)})
  }
  catch(error){ res.status(500).json(`{error: unable to retrieve zoos}`)}
})

server.put('/api/zoos/:id', async (req, res) => {
  const {id} = req.params
  const changes = req.body
  try{
    const updateZoo = await db('zoos').where('id', '=', id).update(changes).then(item => {res.status(201).json(item)})
  }catch(error){res.status(500).json(`{error: unable to update zoo}`)}
})

server.delete('/api/zoos/:id', async (req, res) => {
  const {id} = req.params

  try{
    const zoo = await db('zoos').where('id', '=', id).del().then(item => {res.status(201).json(item)})
  }
  catch(error){ res.status(500).json(`{error: unable to retrieve zoos}`)}
})
  
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
