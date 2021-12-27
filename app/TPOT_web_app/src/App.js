import "./App.css";
import UI from "./UI.js";
import PredictionUI from "./prediction_UI.js";
import LogisticRegressionUI from "./logistic_regression_UI.js"
import LinearRegressionUI from "./linear_regression_UI.js"

import {events} from "./events.js"


function App() {
	return (
		<div className="App">
			<p className="title">TPOT TRAINER</p>
			<p className="subtitle">Select parameters for TPOT training.</p>			
			<p className="subtitle">Training params</p>
			<div id="training_ui" hidden>
			<UI/>		
			<p className="subtitle">Estimator hyperparameters</p>			
			<LogisticRegressionUI/>
			<LinearRegressionUI/>
			</div>
			<div id="prediction_ui">
			<PredictionUI/>
			</div>
		</div>
	);
}

export default App;