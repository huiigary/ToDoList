import React, { useState } from 'react'
import Todolist from './DisplayTodo/Todolist'
import CreateTodo from './CreateTodo/CreateTodo'
import { LOCAL_HOST } from './constants'

export const TodoWrapper = () => {
  const [todoList, setTodoList] = useState([])

  //  add new todo to local and backend
  const addTodo = async (todo) => {
    // check if todo is empty --> not add and show error
    if (!todo || todo == '') {
      console.log('fail addtodo, todo is null')
      return null
    } else {
      // local add todo to todolist
      setTodoList([...todoList, todo])

      // add todo to backend
      const description = { description: todo }
      await fetch(`${LOCAL_HOST}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // require header with contentType to allow backend to access body
        },
        body: JSON.stringify(description),
      })
    }
  }

  return (
    <div>
      <CreateTodo addTodo={addTodo} />
      <Todolist todolist={todoList} />
    </div>
  )
}
