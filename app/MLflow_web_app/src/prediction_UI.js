import "./App.css";
import {events} from "./events.js";

function PredictionUI(props) { 
  return (
	<div className="UI_wrapper">	
		<div className="ui_item">
			<fieldset className="fieldset">
				<legend className="legend">Prediction data</legend>
				<div className="input">
					<input type="file" id="prediction_data"></input>
				</div>
				<button id="prediction_data_shown" onClick={(e) => {document.getElementById("prediction_data").click()}}>UPLOAD</button>
				<div className="description"><br></br>
					<p>The data that will be used for prediction.</p>
				</div>
			</fieldset>
		</div>
				
		
		<div className="ui_item">
			<fieldset className="fieldset">
				<legend className="legend">Prediction file name</legend>
				<div className="input">
					<input id="prediction_name" type="text" defaultValue="results.csv"></input>
				</div>
				<div className="description">
					<p className="type">String, default: results.csv</p>
					<br></br>
					<p>The name of the file that predictions will be saved to.</p>
				</div>
			</fieldset>
		</div> 

		<div className="ui_item">
			<fieldset className="fieldset">
				<legend className="legend">Experiment name</legend>
				<br></br>
				
				<select id="selector_experiment" onChange={function(){
						// Getting selector objects for
						// run IDs and experiments
						var selectorID = document.getElementById("selector_id");
						var selectorExperiment = document.getElementById("selector_experiment")						
						
						// Obtaining the run IDs under the selected experiment
						var runIDs = JSON.parse(sessionStorage.getItem(selectorExperiment.value));												
						
						// Emptying the HTML contents of the run ID selector
						selectorID.innerHTML = "";
				
						// Inserting existing run IDs into the selector
						for (var i=0; i < runIDs.length; i++){
							selectorID.add(new Option(runIDs[i], runIDs[i]))
						}}}>
				</select>
				
				<div className="description">
						<p>The experiment under which the desired model was saved.</p>
				</div>
			</fieldset>
		</div>

		<div className="ui_item">
			<fieldset className="fieldset">
			<legend className="legend">Run ID</legend>
				<br></br>
				
				<select id="selector_id"></select>
				
				<div className="description">
						<p>The run ID under which the desired model was saved.</p>
				</div>
			</fieldset>
		</div>

	  
		<div className="ui_item">
			<button id="deploy_button" onClick={(event) => {events.deployModel()}}>Deploy</button> 
		</div>
	  
		<div className="ui_item">
			<button id="predict_button" onClick={(event) => {events.predict()}}>Predict</button> 
		</div>

		
		<div className="ui_item">
			<fieldset className="fieldset">
			<legend align="center" className="legend">RESPONSE</legend>
				<div className="text" id="response_inference">
					<p>Waiting for inference to start...</p>
				</div>
			</fieldset>
		</div>
	  
		<div className="ui_item">
			<fieldset className="fieldset">
				<legend align="center" className="legend">Saved prediction files</legend>
				<div className="log" id="prediction_file_names"></div>        
			</fieldset>
		</div>	        
    </div>
  );
}
// {parse_data(props.data)}
export default PredictionUI;
