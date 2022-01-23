import "./App.css";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import "./shaders/Waves.js";

function Background() {
	const shader = useRef();
	const { viewport } = useThree();
	const seed = Math.random();
	useFrame((state) => {
		shader.current.uniforms.time.value = state.clock.getElapsedTime();
	});
	return (
		<mesh>
			<planeGeometry args={[viewport.width, viewport.height]} />
			<waveMaterial
				bgColor={"#0d0d0f"}
				waveColor={"#cc8888"}
				ref={shader}
				seed={seed}
			/>
		</mesh>
	);
}

function App() {
	return (
		<>
			<div
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					zIndex: 10,
				}}
			>
				<Canvas linear>
					<Background />
				</Canvas>
			</div>

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
