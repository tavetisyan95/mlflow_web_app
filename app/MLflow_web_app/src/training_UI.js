import "./App.css";
import {config} from "./config.js";
import {events} from "./events.js";

import LogisticRegressionUI from "./logistic_regression_UI.js"
import LinearRegressionUI from "./linear_regression_UI.js"

function TrainingUI(props) { 
	return (
		<div className="UI_wrapper">

			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Estimator</legend>					
					<br></br>
								
					<select id="selector_model" onChange={function(){
							// Getting the model selector
							var selector = document.getElementById("selector_model");
					
							// Getting the UIs associated with each of the available models
							var log_reg_ui = document.getElementById("logistic_regression_UI");
							var lin_reg_ui = document.getElementById("linear_regression_UI");								
					
							// Creating a dictionary with our UI objects
							var uis = {"logistic_regression": log_reg_ui, "linear_regression": lin_reg_ui}
							
							
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
						<option value="logistic_regression" selected="selected">Logistic Regression</option>
						<option value="linear_regression">Linear Regression</option>  
					</select>
					
					<div className="description">
						<br></br>
						<p>The scikit-learn estimator that you want to train.</p>
					</div>
				</fieldset>
			</div>
		
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Training data</legend>
					<div className="input">
						<input type="file" id="data"></input>
					</div>
					<button id="data_shown" onClick={(e) => {document.getElementById("data").click()}}>UPLOAD</button>
					<div className="description">
						<br></br>
						<p>The data that will be used for training.</p>
					</div>
				</fieldset>
			</div>  	 		


			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">experiment_name</legend>
					<div className="input">
						<input id="experiment_name" type="text" defaultValue="Experiment"></input>
					</div>
					<div className="description">
						<p className="type">String, default: Experiment</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
			</div> 
		  
		  
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">n_jobs</legend>
					<div className="input">
						<input id="n_jobs" type="text" defaultValue="None"></input>
					</div>
					<div className="description">
						<p className="type">Integer or None, default: None</p>
						<br></br>
						<p>The number of CPU cores that will be used during training.</p>
					</div>
				</fieldset>
			</div>
		  
		  
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">cv</legend>
					<div className="input">
						<input id="cv" type="text" defaultValue="5"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 5</p>
						<br></br>
						<p>The number of cross-validation folds for grid search.</p>
					</div>
				</fieldset>
			</div>	  
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">return_train_score</legend>
					<div className="input">
						<input type="checkbox" id="return_train_score" defaultChecked={false}></input>
					</div>
					<div className="description">
						<p className="type">Bool, default: False</p>
						<br></br>
						<p>If False, the <i>cv_results_</i> attribute will not include training scores.</p>
					</div>
				</fieldset>
			</div>
		  
		  
			<div className="ui_item">
				<button id="train_button" onClick={(event) => {events.handleParams()}}>Train Grid Search</button> 
			</div>			
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend align="center" className="legend">RESPONSE</legend>
					<div className="text" id="response">
						Waiting for training to start...
					</div>        
				</fieldset>
			</div>	  
		  
		</div>
  );
}
// {parse_data(props.data)}
export default TrainingUI;
