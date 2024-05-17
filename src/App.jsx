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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path="/"
				element={
					<div className="no-scrollbar duration-250 flex h-full min-h-screen justify-center bg-gray-700 py-8">
						<ToastContainer />
						<Outlet />
					</div>
				}
			>
				<Route path="" element={<Navigate to="todos" />} />
				<Route path="todos" element={<Todos />} />
				<Route path="share" element={<Share />} />
			</Route>,
		),
	);

	return <RouterProvider router={router} />;
}

export default App;
