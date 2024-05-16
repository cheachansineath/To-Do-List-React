import { useEffect, useMemo, useState } from "react";
import { TodoProvider } from "../contexts/Todo";
import TodoForm from "./TodoForm";
import TodoBody from "./TodoBody";

function Todos() {
	const [todos, setTodos] = useState([]);

	const addTodo = (content) => {
		setTodos((prev) => [
			{ id: Date.now(), content, checked: false },
			...prev,
		]);
	};
	const deleteTodo = (id) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	};
	const updateTodo = (content, id) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id
					? { id: todo.id, content, checked: todo.checked }
					: todo
			)
		);
	};
	const toggleTodo = (id) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, checked: !todo.checked } : todo
			)
		);
	};

	useEffect(() => {
		localStorage.getItem("theme") &&
			document.documentElement.setAttribute(
				"data-theme",
				localStorage.getItem("theme")
			);
	});

	useEffect(() => {
		localStorage.getItem("todos") &&
		JSON.parse(localStorage.getItem("todos")).length > 0
			? setTodos(JSON.parse(localStorage.getItem("todos")))
			: "";
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	return (
		<TodoProvider
			value={{ todos, addTodo, deleteTodo, updateTodo, toggleTodo }}
		>
			<div className="flex justify-center min-h-screen no-scrollbar py-8 bg-gray-700 duration-250">
				<div className="h-full max-w-2xl w-full m-4 p-8 rounded-lg shadow-lg bg-base-300 text-neutral-content">
					<div className="text-3xl font-semibold text-center mb-6 text-base-content">
						Manage Your Todos
					</div>
					<TodoForm />
					<TodoBody todos={todos} setTodos={setTodos} />
				</div>
			</div>
		</TodoProvider>
	);
}

export default Todos;
