import { useState } from "react";
import { useTodo } from "./contexts/Todo";
import checkSign from "/check.svg";
import { space } from "postcss/lib/list";

function TodoForm() {
	const { addTodo } = useTodo();
	const [content, setContent] = useState("");

	return (
		<form className="flex">
			<input
				type="text"
				placeholder="Write Your Todo..."
				className="w-full border border-black/5 rounded-l-lg px-4 outline-none duration-150 bg-white/20 py-2"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<button
				className="rounded-r-lg px-3 shrink-0 items-center bg-green-600 text-white "
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
