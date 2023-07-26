import { TextField, Grid } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import './Todo.css'

// To display todo with: the todo description, edit, delete, complete
export const Todo = ({ todo, toggleEdit, deleteTodo }) => {
  return (
    <Grid
      container
      spacing={2}
      justifyContent={'space-between'}
      alignItems={'center'}
      className='todoRow'
    >
      {/* todo description. Can edit on click */}
      <Grid item>{todo.id}</Grid>
      <Grid item>{todo?.description || 'N/A'}</Grid>
      {/* edit button  */}
      <Grid item onClick={() => toggleEdit(todo)}>
        <EditIcon />
      </Grid>
      {/* delete button */}
      <Grid item onClick={() => deleteTodo(todo.id)}>
        <DeleteIcon />
      </Grid>
    </Grid>
  )
}
