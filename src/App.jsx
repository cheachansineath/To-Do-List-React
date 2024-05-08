import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import { TodoProvider } from "./components/contexts/Todo";
import TodoItem from "./components/TodoItem";

function App() {
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
				todo.id === id ? { id: todo.id, content, checked: false } : todo
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
		localStorage.getItem("todos") &&
		JSON.parse(localStorage.getItem("todos")).length > 0
			? setTodos(JSON.parse(localStorage.getItem("todos")))
			: "";
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	document.querySelector("html").classList.add("light");

	return (
		<TodoProvider
			value={{ todos, addTodo, deleteTodo, updateTodo, toggleTodo }}
		>
			<div data-theme="dark" className="flex justify-center min-h-screen py-8 bg-gray-200 dark:bg-gray-800/90 duration-150">
				<div className="max-w-2xl w-full m-4 p-8 rounded-lg shadow-md bg-white dark:bg-gray-900 dark:text-white">
					<h1 className="text-3xl font-semibold text-center mb-6">
						Manage Your Todos
					</h1>
					<div className="mb-4">
						<TodoForm />
					</div>
					<div className="flex flex-col gap-y-3">
						{todos.map((todo) => (
							<TodoItem key={todo.id} todo={todo} />
						))}
					</div>
				</div>
			</div>
		</TodoProvider>
	);
}

export default App;
