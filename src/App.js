import DrinksChoice from "./DrinksChoice";
import Models from "./Models";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				{/* <h1 className="text-3xl font-bold underline">Hello World!</h1> */}

				<Switch>
					<Route exact path="/">
						<DrinksChoice />
					</Route>
					<Route path="/models">
						<Models />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
