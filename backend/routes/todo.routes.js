import express from "express";
import {
    getTodos,
    createTodo,
    updateTodo
} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/create", createTodo);
router.put("/update/:id", updateTodo);

export default router;