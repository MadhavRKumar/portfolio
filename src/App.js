import "./App.css";
import { Link } from "react-router-dom";

function App() {
	return (
		<>
			<nav className="nav">
				<header className="nav__title">
					<h1>madhav kumar</h1>
				</header>
				<ul className="nav__list">
					<li className="nav__list-item">
						<Link className="nav__list-item__link" to="/about">
							/about/
						</Link>
					</li>
					<li className="nav__list-item">
						<Link className="nav__list-item__link" to="/projects">
							/projects/
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default App;
