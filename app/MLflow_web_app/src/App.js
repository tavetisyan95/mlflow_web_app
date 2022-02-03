import "./App.css";
import TrainingUI from "./training_UI.js";
import PredictionUI from "./prediction_UI.js";
import QuickshiftUI from "./quickshift_UI.js"
import FelzenszwalbUI from "./felzenszwalb_UI.js"
import SlicUI from "./slic_UI.js"


function App() {
	return (
		<div className="App">
			<p className="title">MLflow TRAINER</p>
			<p className="subtitle">Select parameters for MLflow training.</p>
				
			<div id="selector_mode_parent">				
				<fieldset className="fieldset">
					<legend className="legend">Mode</legend>
					<br></br>
					<select id="selector_mode" onChange={function(){
						// Getting the selector object
						var selector = document.getElementById("selector_mode");
						
						// Getting the interfaces for training and prediction
						var training_ui = document.getElementById("training_ui");
						var prediction_ui = document.getElementById("prediction_ui");									
						
						// Creating a dictionary with our UI objects
						var uis = {"training_ui": training_ui, "prediction_ui": prediction_ui}
						
						// Iterating over the elements in the dict,
						// checking which one is selected,
						// and showing/hiding the corresponding UIs
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
					
					<div className="description">
						<p>The mode of operation. Select <i>Training</i> to train grid search or <i>Prediction</i> to do inference.</p>
				</div>
				</fieldset>
			</div>
				
				
			<div id="training_ui">
				<br></br>
				<br></br>
				<br></br>
				<p className="subtitle">MLFLOW AND GRID SEARCH PARAMETERS</p>
				<p className="description">In this section, select your training data, the desired estimator, and tweak grid search parameters.</p>
				<TrainingUI/>		
				{/*<p className="subtitle">ESTIMATOR HYPERPARAMETERS</p>			
				<p className="description">In this section, tweak estimator hyperparameters.</p>*/}
				{<QuickshiftUI/>}
				{<FelzenszwalbUI/>}
				{<SlicUI/>}
			</div>
								
				
			<div id="prediction_ui" hidden>
				<br></br>
				<br></br>
				<br></br>
				<p className="subtitle">PREDICTION PARAMETERS</p>
				<p className="description">In this section, select your data for inference, the desired model, do inference, and save predictions.</p>
				<PredictionUI/>
			</div>
		</div>
	);
}

export default App;