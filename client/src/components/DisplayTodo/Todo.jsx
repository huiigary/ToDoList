import { Grid, Checkbox, TextField } from '@mui/material'
import React from 'react'
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

  const createdDate = todo.creation_time
    ? new Date(todo.creation_time).toDateString()
    : null

  return (
    <Grid
      alignItems={'center'}
      className={'todoRow'}
      style={{
        display: 'flex',
        textDecoration: todo.iscompleted ? 'line-through' : null,
        background: todo.iscompleted ? 'grey' : null,
      }}
      id='table'
    >
      <Grid
        container
        alignItems={'center'}
        xs={8}
        sx={{ overflowWrap: 'break-word' }}
      >
        {/* todo description. Can edit on click */}
        {todo.isediting ? (
          <Grid item width={'100%'}>
            <TextField
              fullWidth
              size='large'
              variant='outlined'
              value={todo.description}
              onChange={(e) => editTodo(todo, e.target.value)}
              onKeyUp={(e) => handleEnter(todo, e)}
            />
          </Grid>
        ) : (
          // checkbox and todo description
          <Grid item sx={{ display: 'flex' }}>
            <Checkbox
              checked={todo.iscompleted}
              onClick={() => toggleComplete(todo)}
            ></Checkbox>

            <Grid
              item
              width={'100%'}
              sx={{
                overflowWrap: 'anywhere',
              }}
            >
              {todo?.description || 'N/A'}
              <div>
                <h5>{createdDate}</h5>
              </div>
            </Grid>
          </Grid>
        )}
      </Grid>

      <Grid
        container
        alignItems={'center'}
        justifyContent={'flex-end'}
        // backgroundColor='yellow'
      >
        {/* edit button  */}
        <Grid
          item
          sx={{ paddingRight: 2, cursor: 'pointer' }}
          onClick={() => toggleEdit(todo)}
        >
          <EditIcon />
        </Grid>
        {/* delete button */}
        <Grid
          item
          sx={{ paddingLeft: 2, cursor: 'pointer' }}
          onClick={() => deleteTodo(todo.id)}
        >
          <DeleteIcon />
        </Grid>
      </Grid>
    </Grid>
  )
}
