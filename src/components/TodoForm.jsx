import { useState } from "react";
import { useTodo } from "./contexts/Todo";
import checkSign from "/check.svg";
import { space } from "postcss/lib/list";

function TodoForm() {
	const { addTodo } = useTodo();
	const [content, setContent] = useState("");

	return (
		<form className="flex join">
			<input
				type="text"
				placeholder="Write Your Todo..."
				className="join-item w-full px-4 outline-none bg-gray-700 py-2"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<button
				className="join-item px-3 shrink-0 bg-emerald-600"
				onClick={(e) => {
					e.preventDefault();
					content !== "" ? addTodo(content) : "";
					setContent("");
				}}
			>
				<img src={checkSign} alt="Check sign" className="w-5" />
			</button>
		</form>
	);
}

export default TodoForm;
