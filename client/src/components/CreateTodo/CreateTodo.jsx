import { Button, TextField, Input } from '@mui/material'
import React, { useState } from 'react'
import './CreateTodo.css'

const CreateTodo = ({ addTodo }) => {
  const [input, setInput] = useState('') // To control the input to the todo textfield

  const handleSubmit = (value) => {
    if (value) {
      addTodo(value)
      setInput('')
    }
  }

  const handleEnter = (event, value) => {
    if (event.key === 'Enter' && value) {
      addTodo(value)
      setInput('')
    }
  }

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center' }}>CreateTodo</h1>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <TextField
          sx={{ width: '50%' }}
          label='Add task'
          color='secondary'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={(e) => handleEnter(e, input)}
        ></TextField>
        {/* add button */}
        <Button onClick={(e) => handleSubmit(input)} variant='contained'>
          Add
        </Button>
      </div>
    </div>
  )
}

export default CreateTodo
