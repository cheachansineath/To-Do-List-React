import { useEffect, useMemo, useState } from "react";
import TodoForm from "./components/TodoForm";
import { TodoProvider } from "./components/contexts/Todo";
import TodoItem from "./components/TodoItem";

function App() {
	const [todos, setTodos] = useState([]);
	const [filteredTodos, setFilteredTodos] = useState(todos);
	const [searchString, setSearchString] = useState("");

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
		localStorage.getItem("todos") &&
		JSON.parse(localStorage.getItem("todos")).length > 0
			? setTodos(JSON.parse(localStorage.getItem("todos")))
			: "";
	}, []);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	useEffect(() => {
		searchString == ""
			? setFilteredTodos(todos)
			: setFilteredTodos(
					todos.filter((todo) => todo.content.includes(searchString))
			  );
	}, [searchString, todos]);

	document.querySelector("html").classList.add("light");
	return (
		<TodoProvider
			value={{ todos, addTodo, deleteTodo, updateTodo, toggleTodo }}
		>
			<div
				data-theme="dark"
				className=" flex justify-center min-h-screen no-scrollbar py-8 bg-gray-200 dark:bg-gray-800/90 duration-150"
			>
				<div className="h-full max-w-2xl w-full m-4 p-8 rounded-lg shadow-md bg-white dark:bg-gray-900 dark:text-white">
					<h1 className="text-3xl font-semibold text-center mb-6">
						Manage Your Todos
					</h1>
					<div className="mb-4">
						<TodoForm />
					</div>
					<label className="input input-bordered flex items-center gap-2 mb-3">
						<input
							type="text"
							className="grow"
							placeholder="Search"
							value={searchString}
							onChange={(e) => {
								setSearchString(e.target.value);
							}}
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							className="w-4 h-4 opacity-70"
						>
							<path
								fillRule="evenodd"
								d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
								clipRule="evenodd"
							/>
						</svg>
					</label>
					<div className="dropdown mb-3">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-info px-5"
						>
							Filter
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
						>
							<li>
								<a
									onClick={(e) => {
										setFilteredTodos(todos);
									}}
								>
									All
								</a>
							</li>
							<li>
								<a
									onClick={(e) => {
										setFilteredTodos(
											todos.filter(
												(todo) => !todo.checked
											)
										);
									}}
								>
									Pending
								</a>
							</li>
							<li>
								<a
									onClick={(e) => {
										setFilteredTodos(
											todos.filter((todo) => todo.checked)
										);
									}}
								>
									Completed
								</a>
							</li>
						</ul>
					</div>
					<div className="flex flex-col gap-y-3 overflow-y-scroll no-scrollbar">
						{filteredTodos.map((todo) => (
							<TodoItem key={todo.id} todo={todo} />
						))}
					</div>
				</div>
			</div>
		</TodoProvider>
	);
}

export default App;
