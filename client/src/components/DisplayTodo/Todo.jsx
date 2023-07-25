import { TextField, Grid } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

// To display todo with: the todo description, edit, delete, complete
export const Todo = ({ todo, editTodo, deleteTodo }) => {
  return (
    <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}>
      {/* todo description. Can edit on click */}
      <Grid item>{todo.id}</Grid>
      <Grid item>{todo?.description || 'N/A'}</Grid>
      {/* edit button  */}
      <Grid item onClick={() => editTodo(todo)}>
        <EditIcon />
      </Grid>
      {/* delete button */}
      <Grid item onClick={() => deleteTodo(todo.id)}>
        <DeleteIcon />
      </Grid>
    </Grid>
  )
}
