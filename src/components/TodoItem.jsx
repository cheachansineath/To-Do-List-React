import React, { useState } from "react";
import { useTodo } from "./contexts/Todo";
import editIcon from "/edit.svg";

function TodoItem({ todo }) {
	const [isTodoEditable, setIsTodoEditable] = useState(false);
	const [todoContent, setTodoContent] = useState(todo.content);
	const { deleteTodo, updateTodo, toggleTodo } = useTodo();

	const editTodo = () => {
		updateTodo(todoContent, todo.id);
		setIsTodoEditable(false);
	};

	return (
		<div
			className={`flex items-center rounded-lg px-3 py-1.5 gap-x-3 duration-300 text-black 
			${
				todo.checked
					? "bg-success text-success-content"
					: "bg-neutral text-neutral-content"
			}
			`}
		>
			<input
				type="checkbox"
				className="cursor-pointer checkbox checkbox-primary checkbox-sm border border-white"
				checked={todo.checked}
				onChange={() => {
					toggleTodo(todo.id);
					setIsTodoEditable(false)
				}}
			/>
			<input
				type="text"
				className={`border outline-none w-full bg-transparent rounded-lg ml-1 py-1
				${
					isTodoEditable
						? "border-black/10 dark:border-white pl-2 cursor-text"
						: "border-transparent cursor-pointer"
				}
				${todo.checked ? "line-through" : ""}`}
				value={todoContent}
				readOnly={!isTodoEditable}
				onChange={(e) => {
					setTodoContent(e.target.value);
				}}
				onKeyDown={(e) => {
					e.key == "Enter" ? editTodo() : "";
				}}
			/>

			<button
				className="btn btn-xs w-8 h-8"
				onClick={() => {
					if (todo.completed) return;

					if (isTodoEditable) {
						editTodo();
					} else setIsTodoEditable((prev) => !prev);
				}}
				disabled={todo.checked}
			>
				{isTodoEditable ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						fill="currentColor"
						className="w-4"
					>
						<path
							fillRule="evenodd"
							d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
							clipRule="evenodd"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						fill="currentColor"
						className="w-4"
					>
						<path
							fillRule="evenodd"
							d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"
							clipRule="evenodd"
						/>
					</svg>
				)}
			</button>
			<button
				className="btn btn-xs w-8 h-8"
				onClick={() => deleteTodo(todo.id)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 384 512"
					fill="currentColor"
					className="w-4"
				>
					<path
						fillRule="evenodd"
						d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</div>
	);
}

export default TodoItem;
