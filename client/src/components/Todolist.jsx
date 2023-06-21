import React, { useEffect, useState } from 'react'
import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Checkbox,
} from '@mui/material'

import './Todolist.css'
const Todolist = () => {
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

  const [checked, setChecked] = useState(false)

  return (
    <div>
      <h1>Todo List</h1>

      <Table sx={{ minWidth: 800 }} aria-label='Todo List'>
        <TableHead>
          <TableRow>
            <TableCell>Task#</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Completed?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todoList.map((todo, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox onChange={handleCheck}></Checkbox>
              </TableCell>
              <TableCell>{todo.description}</TableCell>
              <TableCell>{todo.iscompleted}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Todolist
