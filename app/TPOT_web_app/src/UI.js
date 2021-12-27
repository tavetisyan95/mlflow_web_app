import "./App.css";
import {config} from "./config.js";
import {events} from "./events.js";

import LogisticRegressionUI from "./logistic_regression_UI.js"
import LinearRegressionUI from "./linear_regression_UI.js"

function UI(props) { 
  return (
	<div className="UI_wrapper">
	
		
	
	<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">Training data</legend>
        <div className="input">
          <input type="file" id="data"></input>
        </div>
        <button id="data_shown" onClick={(e) => {document.getElementById("data").click()}}>UPLOAD</button>
        <div className="description"><br></br>
          <p>The data that will be used for training</p>
        </div>
      </fieldset>
      </div>  	 
			
		<div className="ui_item">
		<div className="selector">
		<select className="selector" id="selector_model" onChange={function(){
			var selector = document.getElementById("selector_model");
			
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
			}}>
			<option value="logistic_regression" selected="selected">Logistic Regression</option>
			<option value="linear_regression">Linear Regression</option>  
		</select>
		</div>
		</div>

      <div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">experiment_name</legend>
        <div className="input">
          <input id="experiment_name" type="text" defaultValue="name"></input>
        </div>
        <div className="description">
          <p className="type">String, default: name</p>
          <p>
            The ID of the experiment that the run will be logged to.
          </p>
        </div>
      </fieldset>
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
	  
	  <div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">n_jobs</legend>
        <div className="input">
          <input id="n_jobs" type="text" defaultValue="None"></input>
        </div>
        <div className="description">
          <p className="type">Integer or None, default: None</p>
          <p>The number of CPU cores used for training.</p>
        </div>
      </fieldset>
      </div>
	  
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
	 
	 <div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">cv</legend>
        <div className="input">
          <input id="cv" type="text" defaultValue="5"></input>
        </div>
        <div className="description">
          <p className="type">Integer, default: 5</p>
          <p>The number of cross-validation folds.</p>
        </div>
      </fieldset>
      </div>
	  
	  
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
      <fieldset className="fieldset">
        <legend className="legend">return_train_score</legend>
        <div className="input">
          <input type="checkbox" id="return_train_score" defaultChecked={false}></input>
        </div>
        <div className="description">
          <p className="type">Bool, default: False</p>
          <p>If False, the cv_results_ attribute will not include training scores.</p>
        </div>
      </fieldset>
     </div>
	  
	  <div className="ui_item">
      <button id="train_button" onClick={(event) => {events.trainModel()}}>Train</button> 
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
export default UI;
