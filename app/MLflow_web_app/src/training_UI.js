import "./App.css";
import {events} from "./events.js";

function TrainingUI(props) { 
	return (
		<div className="UI_wrapper">

			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Segmenter</legend>					
					<br></br>
								
					<select id="selector_segmenter" onChange={function(){
							// Getting the model selector
							var selector = document.getElementById("selector_segmenter");
					
							// Getting the UIs associated with each of the available models
							var quickshift_ui = document.getElementById("quickshift_UI");
							var felzenszwalb_ui = document.getElementById("felzenszwalb_UI");								
							var slic_ui = document.getElementById("slic_UI");
					
							// Creating a dictionary with our UI objects
							var uis = {"quickshift": quickshift_ui, "felzenszwalb": felzenszwalb_ui, "slic": slic_ui}
							
							
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
						<option value="quickshift" selected="selected">quickshift</option>
						<option value="felzenszwalb">felzenszwalb</option>  
						<option value="slic">slic</option> 
					</select>
					
					<div className="description">
						<br></br>
						<p>The scikit-learn estimator that you want to train.</p>
					</div>
				</fieldset>
			</div>
		
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Model arch</legend>
					<div className="input">
						<input type="file" id="model_arch"></input>
					</div>
					<button id="data_shown" onClick={(e) => {document.getElementById("model_arch").click()}}>UPLOAD</button>
					<div className="description">
						<br></br>
						<p>The data that will be used for training.</p>
					</div>
				</fieldset>
			</div>  	


			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Model weights</legend>
					<div className="input">
						<input type="file" id="model_weights"></input>
					</div>
					<button id="data_shown" onClick={(e) => {document.getElementById("model_weights").click()}}>UPLOAD</button>
					<div className="description">
						<br></br>
						<p>The data that will be used for training.</p>
					</div>
				</fieldset>
			</div>  	 					


			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Image indices</legend>
					<div className="input">
						<input id="image_indices" type="text" defaultValue="0"></input>
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
					<legend className="legend">Top labels</legend>
					<div className="input">
						<input id="top_labels" type="text" defaultValue="3"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 3</p>
						<br></br>
						<p>The number of CPU cores that will be used during training.</p>
					</div>
				</fieldset>
			</div>
		  
		  
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Top predictions</legend>
					<div className="input">
						<input id="top_predictions" type="text" defaultValue="None"></input>
					</div>
					<div className="description">
						<p className="type">Integer or None, default: None</p>
						<br></br>
						<p>The number of cross-validation folds for grid search.</p>
					</div>
				</fieldset>
			</div>	  
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Labels to explain</legend>
					<div className="input">
						<input id="labels_to_explain" type="text" defaultValue="0"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 0</p>
						<br></br>
						<p>The number of cross-validation folds for grid search.</p>
					</div>
				</fieldset>
			</div>	  
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Number of samples</legend>
					<div className="input">
						<input id="num_samples" type="text" defaultValue="250"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 250</p>
						<br></br>
						<p>The number of cross-validation folds for grid search.</p>
					</div>
				</fieldset>
			</div>	  
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">positive_only</legend>
					<div className="input">
						<input type="checkbox" id="positive_only" defaultChecked={true}></input>
					</div>
					<div className="description">
						<p className="type">Bool, default: True</p>
						<br></br>
						<p>If False, the <i>cv_results_</i> attribute will not include training scores.</p>
					</div>
				</fieldset>
			</div>
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">negative_only</legend>
					<div className="input">
						<input type="checkbox" id="negative_only" defaultChecked={false}></input>
					</div>
					<div className="description">
						<p className="type">Bool, default: False</p>
						<br></br>
						<p>If False, the <i>cv_results_</i> attribute will not include training scores.</p>
					</div>
				</fieldset>
			</div>
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">hide_rest</legend>
					<div className="input">
						<input type="checkbox" id="hide_rest" defaultChecked={false}></input>
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
					<legend className="legend">Model arch</legend>
					<div className="input">
						<input type="file" id="model_arch"></input>
					</div>
					<button id="upload_button" onClick={(e) => {document.getElementById("model_arch").click()}}>UPLOAD</button>
					<div className="description">
						<br></br>
						<p>The data that will be used for training.</p>
					</div>
				</fieldset>
			</div>


			<div className="ui_item">
				<button id="upload_btn" onClick={(event) => {events.uploadFiles()}}>Upload</button> 
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
