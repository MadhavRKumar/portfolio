import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return ( 
	  <nav>
	  	<header className=""> 
			<h1>Madhav Kumar</h1> 
	  	</header>
	  	<Link to="/about">About</Link>
	  	<Link to="/projects">Projects</Link>
	  </nav>
  );
}

export default App;
