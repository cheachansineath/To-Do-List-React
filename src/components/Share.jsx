import React, { useState, useMemo,useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Themes from "./Themes";
import TodoItem from "./TodoItem";

function Share() {
	const [searchParams] = useSearchParams();
	const todos = JSON.parse(searchParams.get("todos"));
	const [filteredTodos, setFilteredTodos] = useState(todos);
	const [searchString, setSearchString] = useState("");

	useEffect(() => {
		localStorage.getItem("theme") &&
			document.documentElement.setAttribute(
				"data-theme",
				localStorage.getItem("theme")
			);
	});

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
	}, [searchString]);

	return (
		<div className="h-full max-w-2xl w-full m-4 p-8 rounded-lg shadow-lg bg-base-300 text-neutral-content">
			<div className="text-3xl font-semibold text-center mb-6 text-base-content">
				Todos Shared with you
			</div>
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
			<div className="grid grid-cols-2 gap-3 sm:flex items-center justify-between mb-3">
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
			</div>
			<div className="flex flex-col gap-y-3 overflow-y-scroll no-scrollbar">
				{filteredTodos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} showOptions={false}/>
				))}
			</div>
		</div>
	);
}

export default Share;
