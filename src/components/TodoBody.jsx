import { useState, useEffect, useMemo } from "react";
import { TodoProvider } from "../contexts/Todo.js";
import TodoItem from "./TodoItem.jsx";
import Themes from "./Themes.jsx";

function TodoBody({ todos, setTodos }) {
	const [filteredTodos, setFilteredTodos] = useState(todos);
	const [searchString, setSearchString] = useState("");

	useMemo(() => {
		searchString == ""
			? setFilteredTodos(todos)
			: setFilteredTodos(
					todos.filter((todo) =>
						todo.content
							.toLowerCase()
							.includes(searchString.toLowerCase())
					)
			  );
	}, [searchString, todos]);
	return (
		<>
			<div className="flex gap-2 w-full">
				<input
					type="text"
					placeholder="Search your todos"
					className="input input-bordered grow bg-base-100 text-base-content"
					value={searchString}
					onChange={(e) => {
						setSearchString(e.target.value);
					}}
				/>
				<button className="btn btn-primary mb-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 16 16"
						fill="currentColor"
						className="w-4"
					>
						<path
							fillRule="evenodd"
							d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
			<div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap items-center justify-between mb-3">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-info px-5 text-info-content w-full"
					>
						Filter
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content z-[1] menu p-2 mt-2 shadow-md bg-base-100 rounded-box w-40 [&>li]:text-base-content"
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
										todos.filter((todo) => !todo.checked)
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
				<Themes />
				<div
					className="btn btn-info"
					onClick={async (e) => {
						e.preventDefault();
						await navigator.clipboard.writeText(
							`${
								window.location.origin
							}/share?todos=${JSON.stringify(todos)}`
						);
					}}
				>
					Share
				</div>
				<div
					className="btn btn-error"
					onClick={(e) => {
						e.preventDefault();
						setTodos([]);
					}}
				>
					Delete All
				</div>
			</div>
			<div className="flex flex-col gap-y-3 overflow-y-scroll no-scrollbar">
				{filteredTodos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</div>
		</>
	);
}

export default TodoBody;
