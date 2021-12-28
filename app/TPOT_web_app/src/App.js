import "./App.css";
import UI from "./UI.js";
import PredictionUI from "./prediction_UI.js";
import LogisticRegressionUI from "./logistic_regression_UI.js"
import LinearRegressionUI from "./linear_regression_UI.js"

import {events} from "./events.js"


function App() {
	return (
		<div className="App">
			<p className="title">MLflow TRAINER</p>
			<p className="subtitle">Select parameters for MLflow training.</p>			
			
			
			{<div className="ui_item">
		<div className="selector">
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
			</div>}
			
			
			<div id="training_ui">
			<p className="subtitle">Training params</p>
			<UI/>		
			<p className="subtitle">Estimator hyperparameters</p>			
			<LogisticRegressionUI/>
			<LinearRegressionUI/>
			</div>
			<div id="prediction_ui" hidden>
			<PredictionUI/>
			</div>
		</div>
	);
}

export default App;