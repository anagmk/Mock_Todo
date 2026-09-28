import express from "express";
import {
    getTodos,
    createTodo,
    updateTodo,
    completeTodo,
    deleteTodo
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/create", createTodo);
router.put("/update/:id", updateTodo);
router.patch("/complete/:id", completeTodo);
router.delete("/delete/:id", deleteTodo);

export default router;