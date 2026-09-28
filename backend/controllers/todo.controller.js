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

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { title, completed } = req.body

        if (!title || !title.trim()) {
            res.status(400).json({ message: 'Title is required' })
            return
        }

        const updatedTodo = await Todo.findByIdAndUpdate(id,
            {
                title: title.trim(),
                completed
            },
        )

        if (!updatedTodo) {
            res.status(404).json({ message: 'Todo not found' })
            return
        }

        res.status(200).json(updatedTodo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findByIdAndDelete(id)

        if (!todo) {
            res.status(404).json({ message: 'Todo not found' })
            return
        }

        res.status(200).json({ message: 'Todo deleted successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}