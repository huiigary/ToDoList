import { TextField, Grid } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import './Todo.css'

// To display todo with: the todo description, edit, delete, complete
export const EditTodo = ({ todo, editTodo, toggleEdit }) => {
  const handleEnter = async (todo, e) => {
    if (e.key === 'Enter') {
      await editTodo(todo, e.target.value)
      toggleEdit(todo)
    }
  }
  return (
    <Grid
      container
      spacing={2}
      justifyContent={'space-between'}
      alignItems={'center'}
      className='todoRow'
    >
      {/* todo description. Can edit on click */}
      <Grid item>EDIT{todo.id}</Grid>
      <TextField
        value={todo.description}
        onChange={(e) => editTodo(todo, e.target.value)}
        onKeyUp={(e) => handleEnter(todo, e)}
      />
      {/* edit button  */}
      <Grid item onClick={() => toggleEdit(todo)}>
        <EditIcon />
      </Grid>
      {/* delete button */}
      {/* <Grid item onClick={() => deleteTodo(todo.id)}>
        <DeleteIcon />
      </Grid> */}
    </Grid>
  )
}
