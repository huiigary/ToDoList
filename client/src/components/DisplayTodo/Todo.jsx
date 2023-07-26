import { Grid, Checkbox, TextField } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

// To display todo with: the todo description, edit, delete, complete
export const Todo = ({
  todo,
  toggleEdit,
  deleteTodo,
  toggleComplete,
  editTodo,
}) => {
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
      className={'todoRow'}
      style={{
        textDecoration: todo.iscompleted ? 'line-through' : null,
        background: todo.iscompleted ? 'grey' : null,
        bor: todo.iscompleted ? 'grey' : null,
      }}
      id='table'
    >
      {/* todo description. Can edit on click */}

      {todo.isediting ? (
        <>
          <TextField
            value={todo.description}
            onChange={(e) => editTodo(todo, e.target.value)}
            onKeyUp={(e) => handleEnter(todo, e)}
          />
        </>
      ) : (
        <>
          <Checkbox
            checked={todo.iscompleted}
            onClick={() => toggleComplete(todo)}
          ></Checkbox>
          <Grid item sx={{ width: 'auto' }}>
            {todo?.description || 'N/A'}
          </Grid>
        </>
      )}

      {/* edit button  */}
      <Grid item sx={{ display: 'flex', marginLeft: 20 }}>
        <Grid item sx={{ paddingRight: 2 }} onClick={() => toggleEdit(todo)}>
          <EditIcon />
        </Grid>
        {/* delete button */}
        <Grid item sx={{ paddingLeft: 2 }} onClick={() => deleteTodo(todo.id)}>
          <DeleteIcon />
        </Grid>
      </Grid>
    </Grid>
  )
}
