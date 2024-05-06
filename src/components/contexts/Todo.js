import { createContext, useContext } from "react";

const todo = createContext({
	todos: [{ id: "", content: "", checked: false }],
	addTodo: () => {},
	deleteTodo: () => {},
	updateTodo: () => {},
	toggleTodo: () => {},
});

export const TodoProvider = todo.Provider;

export const useTodo = () => useContext(todo);
