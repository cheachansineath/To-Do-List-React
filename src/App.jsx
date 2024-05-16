import { useEffect, useState } from "react";
import {
	Navigate,
	Outlet,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Todos from "./components/Todos";
import Share from "./components/Share";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<Outlet />}>
				<Route path="" element={<Navigate to="todos" />} />
				<Route path="todos" element={<Todos />} />
				<Route path="share" element={<Share />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}

export default App;
