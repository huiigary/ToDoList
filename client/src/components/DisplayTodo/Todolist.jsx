import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  Modal,
  Box,
  TextField,
  Typography,
} from '@mui/material'
import { LOCAL_HOST } from '../constants'
// import './Todolist.css'

// Important to have this style to show the modal in the center
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Todolist = () => {
  const [todoList, setTodoList] = useState([]) // To display list of todos on screen
  const [isModalOpen, setisModalOpen] = useState(false) // To display edit modal on click
  const [selectedEditTodo, setSelectedEditTodo] = useState({}) // To get the selected todo for edit

  useEffect(() => {
    getAllTodos()
  }, [])

  const getAllTodos = async () => {
    let response = await fetch(`${LOCAL_HOST}/todos`)
    let data = await response.json()
    data.sort((a, b) => a.id - b.id) // sort todos by increasing id (fixes issue where edits change the ordering of list displayed)
    console.log({ data })
    setTodoList(data)
    return data
  }

  // update todo with id
  // Note: to pass body parameter, need: headers and stringify object
  const updateTodo = async (id, description = 'N/A') => {
    console.log({ id, description })
    await fetch(`${LOCAL_HOST}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    })
  }

  const handleCheck = (e) => {
    console.log('task is checked', e.target.checked)
  }

  const deleteTodo = async (id) => {
    // call API update backend
    await fetch(`${LOCAL_HOST}/todos/${id}`, { method: 'DELETE' })
    // update client with new list
    setTodoList(
      todoList.filter((todo) => todo.id != id).sort((a, b) => a.id - b.id)
    )
  }

  const showModal = (todo) => {
    setSelectedEditTodo(todo)
    console.log('showing modal', { todo, selectedEditTodo })
    setisModalOpen(true)
  }

  // save the description changed on the selected todo
  const saveEdit = async (todo, newDescription) => {
    console.log('save edit with new description', {
      todo,
      newDescription,
      selectedEditTodo,
    })
    // local update
    todo.description = newDescription
    // backend update
    await updateTodo(todo.id, newDescription)
    // close modal
    setisModalOpen(false)
  }

  const handlePressEnter = (e, todo, newDescription) => {
    console.log('key pressed is:', e.key)
    if (e.key == 'Enter') {
      saveEdit(todo, newDescription)
      // window.location = '/'
    }
  }

  const EditModal = ({ todo }) => {
    const [description, setDescription] = useState(todo.description) // Added local state to fix issue where I couldnt edit textfield inside the modal using a parent state
    return (
      <Modal open={isModalOpen} onClose={() => setisModalOpen(false)}>
        <Box sx={style}>
          <Typography variant='h6' component='h2'>
            Edit Todo: Id# {todo.id}
          </Typography>

          <div style={{ display: 'flex' }}>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyUp={(e) => handlePressEnter(e, todo, description)}
            ></TextField>
            <Button
              variant='contained'
              onClick={() => saveEdit(todo, description)}
            >
              Ok
            </Button>
          </div>
        </Box>
      </Modal>
    )
  }

  return (
    <div>
      <h1>Todo List</h1>

      <Table sx={{ minWidth: 800 }} aria-label='Todo List'>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>

        {/* Create editTodo state to get the current todo being edited... MUST BE A BETTER WAY */}
        <EditModal todo={selectedEditTodo} />

        <TableBody>
          {todoList.map((todo, index) => (
            <TableRow key={index}>
              <TableCell>
                {todo.id}
                <Checkbox onChange={handleCheck}></Checkbox>
              </TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>
                <Button onClick={() => showModal(todo)}>Edit</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Todolist
