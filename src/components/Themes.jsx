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
				className="btn btn-accent text-accent-content w-full  px-5"
			>
				Themes
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content menu bg-base-100 rounded-box [&>li]:text-base-content z-[1] mt-2 w-40 p-2 shadow-md"
			>
				{themes.map((theme, key) => (
					<li key={key} className="mb-2">
						<a
							onClick={(e) => {
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
	);
}

export default Themes;
