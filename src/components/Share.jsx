import React, { useState, useMemo, useEffect } from "react";
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
				localStorage.getItem("theme"),
			);
	});

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
	}, [searchString]);

	return (
		<div className="bg-base-300 text-neutral-content m-4 h-full w-full max-w-2xl rounded-lg p-8 shadow-lg">
			<div className="text-base-content mb-6 text-center text-3xl font-semibold">
				Todos Shared with you
			</div>
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
			<div className="mb-3 grid grid-cols-2 items-center justify-between gap-3 sm:flex">
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
			</div>
			<div className="no-scrollbar flex flex-col gap-y-3 overflow-y-scroll">
				{filteredTodos.length > 0 ? (
					filteredTodos.map((todo) => (
						<TodoItem key={todo.id} todo={todo} />
					))
				) : (
					<div className="mt-6 w-full text-center text-xl font-semibold">
						No TODOs Found
					</div>
				)}
			</div>
		</div>
	);
}

export default Share;
