import { useState } from "react";
import { useTodo } from "../contexts/Todo";

function TodoForm() {
	const { addTodo } = useTodo();
	const [content, setContent] = useState("");

	return (
		<>
			<div className="mb-3 flex w-full gap-2">
				<input
					type="text"
					placeholder="What needs to be done?"
					className="input input-bordered bg-base-100 text-base-content grow"
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
					onKeyDown={(e) => {
						if (e.key == "Enter") {
							content !== "" ? addTodo(content) : "";
							setContent("");
						}
					}}
				/>
				<button
					className="btn btn-success"
					onClick={(e) => {
						e.preventDefault();
						content !== "" ? addTodo(content) : "";
						setContent("");
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
						fill="currentColor"
						className="w-4"
					>
						<path
							fillRule="evenodd"
							d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</>
	);
}

export default TodoForm;
