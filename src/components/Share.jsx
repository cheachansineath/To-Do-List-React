import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TodoBody from "./TodoBody";

function Share() {
	const [searchParams] = useSearchParams();
	const todos = JSON.parse(searchParams.get("todos"));
	const [sharedTodos, setSharedTodos] = useState(
		JSON.parse(searchParams.get("todos"))
	);

	// todos && setSharedTodos(todos);

	return (
		<div className="flex justify-center min-h-screen no-scrollbar py-8 bg-gray-700 duration-250">
			<div className="h-full max-w-2xl w-full m-4 p-8 rounded-lg shadow-lg bg-base-300 text-neutral-content">
				<div className="text-3xl font-semibold text-center mb-6 text-base-content">
					Todos Shared with you
				</div>
				<TodoBody todos={sharedTodos} setTodos={setSharedTodos} />
			</div>
		</div>
	);
}

export default Share;
