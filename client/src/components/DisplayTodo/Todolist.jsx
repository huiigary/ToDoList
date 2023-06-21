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
// import './Todolist.css'

const Todolist = () => {
  const LOCAL_HOST = `http://localhost:5000`
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    getAllTodos()
  }, [])

  const getAllTodos = async () => {
    let response = await fetch('http://localhost:5000/todos')
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
    setTodoList(todoList.filter((todo) => todo.id != id))
  }

  return (
    <div>
      <h1>Todo List</h1>

      <Table sx={{ minWidth: 800 }} aria-label='Todo List'>
        <TableHead>
          <TableRow>
            <TableCell>Task#</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoList.map((todo, index) => (
            <TableRow key={index}>
              <TableCell>
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
