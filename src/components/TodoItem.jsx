import React, { useState } from "react";
import { useTodo } from "./contexts/Todo";
import editIcon from "/edit.svg";
import saveIcon from "/save.svg";
import deleteIcon from "/delete.svg";

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
			className={`flex items-center rounded-lg px-3 py-1.5 gap-x-3 shadow-xl shadow-gray-800 duration-300 text-black 
			${todo.checked ? "bg-emerald-400" : "bg-gray-500"}
			`}
		>
			<input
				type="checkbox"
				className="cursor-pointer checkbox checkbox-primary checkbox-sm border border-white"
				checked={todo.checked}
				onChange={() => {
					toggleTodo(todo.id);
				}}
			/>
			<input
				type="text"
				className={`border outline-none w-full bg-transparent rounded-lg ml-1 py-1
				${
					isTodoEditable
						? "border-black/10 dark:border-white pl-2"
						: "border-transparent"
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
				className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-zinc-300 hover:bg-zinc-100 shrink-0 disabled:opacity-50"
				onClick={() => {
					if (todo.completed) return;

					if (isTodoEditable) {
						editTodo();
					} else setIsTodoEditable((prev) => !prev);
				}}
				disabled={todo.checked}
			>
				{isTodoEditable ? (
					<img
						src={saveIcon}
						alt="Edit the TODO"
						className={`w-4 h-4`}
					/>
				) : (
					<img
						src={editIcon}
						alt="Edit the TODO"
						className={`w-4 h-4`}
					/>
				)}
			</button>
			<button
				className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center  bg-zinc-300 hover:bg-zinc-100 shrink-0"
				onClick={() => deleteTodo(todo.id)}
			>
				<img className="w-4 h-4" src={deleteIcon} alt="Delete TODO" />
			</button>
		</div>
	);
}

export default TodoItem;
