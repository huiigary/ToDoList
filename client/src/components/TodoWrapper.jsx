import React, { useState, useEffect } from 'react'
import Todolist from './DisplayTodo/Todolist'
import CreateTodo from './CreateTodo/CreateTodo'
import { LOCAL_HOST } from './constants'
import { Todo } from './DisplayTodo/Todo'
import { EditTodo } from './DisplayTodo/EditTodo'

export const TodoWrapper = () => {
  const [todoList, setTodoList] = useState([]) // list of todos

  // onMount, get all todos
  useEffect(() => {
    getAllTodos()
  }, [])

  const getAllTodos = async () => {
    let response = await fetch(`${LOCAL_HOST}/todos`)
    let data = await response.json()
    data.sort((a, b) => a.id - b.id) // sort todos by increasing id (fixes issue where edits change the ordering of list displayed)
    console.log('getalltodos', { data })
    setTodoList(data)
    return data
  }

  //  add new todo to local and backend
  const addTodo = async (todoTask) => {
    // check if todo is empty --> not add and show error
    console.log('add todo:', { todoTask })
    if (!todoTask || todoTask == '') {
      console.log('fail addtodo, todo is null')
      return null
    } else {
      console.log('new todolist is:', { todoList })

      // add todo to backend
      const description = { description: todoTask }
      let response = await fetch(`${LOCAL_HOST}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // require header with contentType to allow backend to access body
        },
        body: JSON.stringify(description),
      })
      let newTodo = await response.json()
      console.log({ newTodo })
      // set local todo created by backend
      // (Fixed the error where display was not showing newly created task because I adding only a description to the list instead of a full todo object.
      //... Hence the refresh fixed the issue when it occured bc it will get the backend created todo object)
      newTodo && setTodoList([...todoList, newTodo])
    }
  }

  const toggleEdit = async (todo) => {
    // local toggle edit flag: find todo from list and change the isEditing flag
    console.log('editing', todo.isediting)
    setTodoList(
      todoList.map((todoElement) =>
        todoElement.id === todo.id
          ? { ...todo, isediting: !todo.isediting }
          : todoElement
      )
    )
  }

  const editTodo = async (todo, newTodoDescription) => {
    // local update todo's description with new description in todolist
    setTodoList(
      todoList.map((todoElement) =>
        todoElement.id === todo.id
          ? { ...todoElement, description: newTodoDescription }
          : todoElement
      )
    )
    // // backend update
    await fetch(`${LOCAL_HOST}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: newTodoDescription }),
    })
  }

  const deleteTodo = async (id) => {
    // local update todoList
    setTodoList(
      todoList.filter((todo) => todo.id != id).sort((a, b) => a.id - b.id)
    )
    // update backend
    await fetch(`${LOCAL_HOST}/todos/${id}`, { method: 'DELETE' })
  }

  return (
    <div>
      {/* Textfield to create todo */}
      <CreateTodo addTodo={addTodo} />
      {/* display list of todos */}
      {todoList.length > 0 &&
        todoList.map((todo, index) =>
          todo.isediting ? (
            <EditTodo
              key={index}
              todo={todo}
              editTodo={editTodo}
              toggleEdit={toggleEdit}

              // deleteTodo={deleteTodo}
            />
          ) : (
            <Todo
              key={index}
              todo={todo}
              toggleEdit={toggleEdit}
              deleteTodo={deleteTodo}
            />
          )
        )}
    </div>
  )
}
