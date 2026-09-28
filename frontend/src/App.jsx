import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingTodoId, setEditingTodoId] = useState(null)
  const [editingTodoTitle, setEditingTodoTitle] = useState('')

  async function allTodos() {
    await fetch('http://localhost:3000/api/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => {
        console.error('Error fetching todos:', error)
      })
  }

  async function addTodo(e) {
    e.preventDefault()
    const title = newTodo.trim()
    if (title === '') return

    try {
      const response = await fetch('http://localhost:3000/api/todos/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      })

      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.status}`)
      }

      const createdTodo = await response.json()
      setTodos([...todos, createdTodo])
      setNewTodo('')
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }
  useEffect(() => {
    allTodos()
  }, [])

  async function deleteTodo(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/todos/delete/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.status}`)
      }

      setTodos(todos.filter((todo) => todo._id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <>
      <form action="" onSubmit={addTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
    </>
  )
}

export default App
