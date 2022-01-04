import "./App.css";
import TrainingUI from "./training_UI.js";
import PredictionUI from "./prediction_UI.js";
import LogisticRegressionUI from "./logistic_regression_UI.js"
import LinearRegressionUI from "./linear_regression_UI.js"

import {events} from "./events.js"


function App() {
	return (
		<div className="App">
			<p className="title">MLflow TRAINER</p>
			<p className="subtitle">Select parameters for MLflow training.</p>
				
			<div id="selector_mode_parent">				
				<fieldset className="fieldset">
					<legend className="legend">Mode</legend>
					<div className="selector">
						<br></br>
						<select className="selector" id="selector_mode" onChange={function(){
								var selector = document.getElementById("selector_mode");
								
								var training_ui = document.getElementById("training_ui");
								var prediction_ui = document.getElementById("prediction_ui");									
								
								var uis = {"training_ui": training_ui, "prediction_ui": prediction_ui}
								
								for (var key in uis){
									if (key == selector.value){
										uis[key].hidden = false
									} else {
										uis[key].hidden = true				
									}				
								}
							}}>
							<option value="training_ui" selected="selected">Training</option>
							<option value="prediction_ui">Prediction</option>  
						</select>
					</div>
					<div className="description">
						<p>The mode of operation. Select <i>Training</i> to train grid search or <i>Prediction</i> to do inference.</p>
				</div>
				</fieldset>
			</div>
				
				
			<div id="training_ui">
				<br></br>
				<br></br>
				<p className="subtitle">MLFLOW AND GRID SEARCH PARAMETERS</p>				
				<TrainingUI/>		
				<p className="subtitle">ESTIMATOR HYPERPARAMETERS</p>			
				<LogisticRegressionUI/>
				<LinearRegressionUI/>
			</div>
								
				
			<div id="prediction_ui" hidden>
				<br></br>
				<br></br>
				<p className="subtitle">PREDICTION PARAMETERS</p>
				<PredictionUI/>
			</div>
		</div>
	);
}

export default App;