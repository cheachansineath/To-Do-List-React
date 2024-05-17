import { useState, useEffect, useMemo } from "react";
import { TodoProvider } from "../contexts/Todo.js";
import TodoItem from "./TodoItem.jsx";
import Themes from "./Themes.jsx";
import { toast } from "react-toastify";

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
							.includes(searchString.toLowerCase()),
					),
				);
	}, [searchString, todos]);
	return (
		<>
			<div className="flex w-full gap-2">
				<input
					type="text"
					placeholder="Search your todos"
					className="input input-bordered bg-base-100 text-base-content grow"
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
			<div className="mb-3 grid grid-cols-2 items-center justify-between gap-3 md:flex md:flex-wrap">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-info text-info-content w-full px-5"
					>
						Filter
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content menu bg-base-100 rounded-box [&>li]:text-base-content z-[1] mt-2 w-40 p-2 shadow-md"
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
										todos.filter((todo) => !todo.checked),
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
										todos.filter((todo) => todo.checked),
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
							}/share?todos=${JSON.stringify(todos)}`,
						);
						toast("URL copied successfully", {
							position: "top-center",
							type: "success",
						});
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
			<div className="no-scrollbar flex flex-col gap-y-3 overflow-y-scroll">
				{filteredTodos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</div>
			{/* <ToastContainer /> */}
		</>
	);
}

export default TodoBody;
