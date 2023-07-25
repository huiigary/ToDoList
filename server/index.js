const express = require('express')
const cors = require('cors')
const pool = require('./database')
const PORT = 5000
const app = express()

require('dotenv').config()
console.log('ENV file pass:', process.env.PSQL_PASSWORD)

// middleware
app.use(cors())
app.use(express.json())

// Routes:

// create a todo
app.post('/todos', async (req, res) => {
  try {
    console.log('create todo body:', req.body)
    const { description } = req.body
    // optional "RETURNNG *" to return info of the inserted row
    const newTodo = await pool.query(
      'INSERT INTO todolist (description) VALUES($1) RETURNING *',
      [description]
    )
    console.log('newly created todo:', newTodo.rows[0])
    res.json(newTodo.rows[0]) // return the first todo in the row created(inserted)
  } catch (error) {
    console.error(error.message)
  }
})

// get a todos
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    console.log('getting a todo:', { id })
    const todo = await pool.query('SELECT * from todolist WHERE id= $1', [id])
    console.log('getting a todo:', { id })
    res.json(todo.rows[0])
  } catch (error) {
    console.error(error.message)
  }
})

// get all todo
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * from todolist')
    res.status(200).json(allTodos.rows)
  } catch (error) {
    console.error('error:', error.message)
  }
})

// update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const updatedTodo = await pool.query(
      'UPDATE todolist SET description = $1 WHERE id = $2',
      [description, id]
    )
    console.log({ id, description })
    res.json(`todo: ${id} is updated`)
  } catch (error) {
    console.error(error.message)
  }
})

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedTodo = await pool.query('DELETE from todolist WHERE id= $1', [
      id,
    ])
    console.log('deleting TODO', id)
    res.json('deleted this')
  } catch (error) {
    console.error(error.message)
  }
})

app.listen(PORT, () => {
  console.log('Server started on port 5000')
})
