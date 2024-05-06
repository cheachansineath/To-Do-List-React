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
			<div className="bg-[#172842] min-h-screen py-8">
				<div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
					<h1 className="text-2xl font-bold text-center mb-8 mt-2">
						Manage Your Todos
					</h1>
					<div className="mb-4">
						<TodoForm />
					</div>
					<div className="flex flex-wrap gap-y-3">
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
