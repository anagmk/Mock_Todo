import Todo from '../model/todo.model.js'

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createTodo = async (req, res) => {
    try {
        const { title } = req.body
        if (!title || title.trim() === '') {
            res.status(400).json({ message: 'Title is required' })
            return
        }

        const newTodo = await Todo.create({ title: title.trim() })
        res.status(201).json(newTodo)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}