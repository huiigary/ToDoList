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
} from '@mui/material'
import { LOCAL_HOST } from '../constants'
// import './Todolist.css'

const Todolist = () => {
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    getAllTodos()
  }, [])

  const getAllTodos = async () => {
    let response = await fetch(`${LOCAL_HOST}/todos`)
    let data = await response.json()
    console.log({ data })
    setTodoList(data)
    return data
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
        <TableBody>
          {todoList.map((todo, index) => (
            <TableRow key={index}>
              <TableCell>
                {todo.id}
                <Checkbox onChange={handleCheck}></Checkbox>
              </TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>
                <Button>Edit</Button>
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
