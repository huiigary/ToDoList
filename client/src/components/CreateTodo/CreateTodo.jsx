import { Button, TextField, Input } from '@mui/material'
import React, { useState } from 'react'
import { LOCAL_HOST } from '../constants'
import './CreateTodo.css'

const CreateTodo = () => {
  const [newTodoDescription, setNewTodoDescription] = useState('')

  //  add new todo to backend
  const addTodo = async () => {
    // check if todo is empty --> not add and show error
    if (!newTodoDescription || newTodoDescription == '') {
      return null
    } else {
      const description = { description: newTodoDescription }
      await fetch(`${LOCAL_HOST}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // require header with contentType to allow backend to access body
        },
        body: JSON.stringify(description),
      })
      //   clear input
      setNewTodoDescription('')
      //   HACK: refresh to get updated list
      window.location = '/'
    }
  }

  const setTodoDescription = (input) => {
    console.log({ input })
    setNewTodoDescription(input)
  }

  const handleUserPressedEnter = async (e) => {
    // handle user clicking enter to add new todo
    console.log('key pressed is:', e.key)
    if (e.key === 'Enter') {
      await addTodo()
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
          value={newTodoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          onKeyDown={(e) => handleUserPressedEnter(e)}
        ></TextField>
        {/* add button */}
        <Button onClick={addTodo} variant='contained'>
          Add
        </Button>
      </div>
    </div>
  )
}

export default CreateTodo
