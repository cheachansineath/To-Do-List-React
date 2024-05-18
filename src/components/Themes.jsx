import constants from "../constants";

function Themes() {
	const themes = constants.themes;
	function changeTheme(newTheme) {
		document.documentElement.setAttribute("data-theme", newTheme);
	}

	return (
		<div className="dropdown">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-accent text-accent-content w-full px-5"
			>
				Themes
			</div>
			<div
				tabIndex={0}
				className="no-scrollbar dropdown-content menu bg-base-100 rounded-box text-base-content z-[1] mt-2 h-80 w-40 overflow-y-auto p-2 shadow-md"
			>
				<ul className="m-0 list-none p-0">
					{themes.map((theme, key) => (
						<li key={key} className="mb-2">
							<a
								className="block"
								onClick={() => {
									changeTheme(theme);
									localStorage.setItem("theme", theme);
								}}
							>
								{theme[0].toUpperCase() + theme.slice(1)}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Themes;
