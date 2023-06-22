import './App.css'
import Todolist from './components/DisplayTodo/Todolist'
import CreateTodo from './components/CreateTodo/CreateTodo'

function App() {
  return (
    <div className='App'>
      <CreateTodo />
      <Todolist />
    </div>
  )
}

export default App
