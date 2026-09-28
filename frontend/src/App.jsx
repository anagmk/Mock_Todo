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

  async function updateTodo(id, title) {
    try {
      const response = await fetch(`http://localhost:3000/api/todos/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update todo: ${response.status}`)
      }

      const updatedTodo = await response.json()
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)))
      setEditingTodoId(null)
      setEditingTodoTitle('')
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  async function toggleComplete(todo) {
    try {
      const response = await fetch(`http://localhost:3000/api/todos/complete/${todo._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      })

      if (!response.ok) {
        throw new Error(`Failed to toggle complete: ${response.status}`)
      }

      const updatedTodo = await response.json()
  setTodos(todos.map((currentTodo) => (currentTodo._id === todo._id ? updatedTodo : currentTodo)))
    } catch (error) {
      console.error('Error toggling complete:', error)
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

      <div>
        {todos.map((todo) => (
          <div key={todo._id}>
            {editingTodoId === todo._id ? (
              <>
                <input
                  value={editingTodoTitle}
                  onChange={(e) => setEditingTodoTitle(e.target.value)}
                />
                <button type="button" onClick={() => updateTodo(todo._id, editingTodoTitle)}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingTodoId(null)
                    setEditingTodoTitle('')
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button
                  type="button"
                  onClick={() => {
                    setEditingTodoId(todo._id)
                    setEditingTodoTitle(todo.title)
                  }}
                >
                  Edit
                </button>
              </>
            )}
            <button type="button" onClick={() => toggleComplete(todo)}>
              {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button type="button" onClick={() => deleteTodo(todo._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
