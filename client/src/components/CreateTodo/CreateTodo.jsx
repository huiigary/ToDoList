import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import '../../App.css'

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
    <div className='createTodoContainer'>
      <h1 style={{ textAlign: 'center' }}>Tasks for Today</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem',
        }}
      >
        <TextField
          sx={{
            width: '100%',
            background: 'white',
            outline: 'none',
            borderColor: 'red',
          }}
          label='Add task'
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
