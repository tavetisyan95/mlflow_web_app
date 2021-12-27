import "./App.css";
import {config} from "./config.js";
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
        <button id="data_shown" onClick={(e) => {document.getElementById("prediction_data").click()}}>UPLOAD</button>
        <div className="description"><br></br>
          <p>The data that will be used for prediction</p>
        </div>
      </fieldset>
      </div>  	 

		<div className="ui_item">
		<div className="selector">
		<select className="selector" id="selector_id" onChange={function(){
			var selector = document.getElementById("selector_id");
			
			var log_reg_ui = document.getElementById("logistic_regression_UI");
			var lin_reg_ui = document.getElementById("linear_regression_UI");									
			
			var uis = {"logistic_regression": log_reg_ui, "linear_regression": lin_reg_ui}
					
			for (var key in uis){
				if (key == selector.value){
					uis[key].hidden = false
				} else {
					uis[key].hidden = true				
				}				
			}
			
			var newoption = new Option("Option text", "Option Value");
			selector.add(newoption);
			}}>
		</select>
		</div>
		</div>
	  
	  {/*<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">scoring</legend>
        <div className="input">
          <input id="scoring" type="text" defaultValue="None"></input>
        </div>
        <div className="description">
          <p className="type">Integer or None, default: None</p>
          <p>
            The scoring functions to try.
          </p>
        </div>
      </fieldset>
      </div> */}
	  {/*<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">refit</legend>
        <div className="input">
          <input type="checkbox" id="refit" defaultChecked={true}></input>
        </div>
        <div className="description">
          <p className="type">Bool, default: True</p>
          <p>Whether to refit an estimator using the best found parameters on the whole dataset..</p>
        </div>
      </fieldset>
	  </div>*/}
	 
	  
	  
	  {/*<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">verbose</legend>
        <div className="input">
          <input type="text" id="verbose_gridsearch" defaultValue="2"></input>
        </div>
        <div className="description">
          <p className="type">0 or any positive integer, default: 0</p>
          <p>The verbosity level of the optimizer.</p>
        </div>
      </fieldset>
      </div>*/}
	  
	  {/*<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">pre_dispatch</legend>
        <div className="input">
          <input id="pre_dispatch" type="text" defaultValue="0"></input>
        </div>
        <div className="description">
          <p className="type">Integer, default: 2*n_jobs</p>
          <p>
            The ID of the experiment that the run will be logged to.
          </p>
        </div>
      </fieldset>
      </div>*/}


	  
	  <div className="ui_item">
      <button id="deploy_button" onClick={(event) => {events.deployModel()}}>Deploy</button> 
      </div>
	  
	  <div className="ui_item">
      <button id="predict_button" onClick={(event) => {events.predict()}}>Predict</button> 
      </div>
		
      <div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">output</legend>
      <div hidden className="log" id="log_area"></div>
      </fieldset>
      </div>
		
		
      <div className="ui_item">
      <fieldset className="fieldset">
        <legend align="center" className="legend">
          RESPONSE
        </legend>
        <div className="text" id="response">
          Waiting for training to start...
        </div>
        <div hidden className="text" id="download">
          <a
            href={`http://${config.api_url}:${config.api_port}/static/script.py`}
            download="script.py"
          >
            Download script
          </a>
        </div>
      </fieldset>
      </div>
	  
      
    </div>
  );
}
// {parse_data(props.data)}
export default PredictionUI;
