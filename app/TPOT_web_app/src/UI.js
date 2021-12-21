import "./App.css";
import {config} from "./config.js";
import {events} from "./events.js";


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
		<select id="selector_model" onChange={function(){
			var selector = document.getElementById("selector_model");
			
			var log_reg_ui = document.getElementById("logistic_regression_UI");
			var lin_reg_ui = document.getElementById("linear_regression_UI");		
			var svc_ui = document.getElementById("svc_UI");
			var svr_ui = document.getElementById("svr_UI");								
			
			var uis = {"logistic_regression": log_reg_ui, "linear_regression": lin_reg_ui, "svc": svc_ui, "svr": svr_ui}
					
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
			<option value="svc">Support Vector Classifier</option> 
			<option value="svr">Support Vector Regressor</option> 
		</select>
		</div>

      <div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">experiment_id</legend>
        <div className="input">
          <input id="experiment_id" type="text" defaultValue="0"></input>
        </div>
        <div className="description">
          <p className="type">Integer, default: 0</p>
          <p>
            The ID of the experiment that the run will be logged to.
          </p>
        </div>
      </fieldset>
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
      <div className="ui_item">
      <button id="train_button" onClick={(event) => {events.trainTPOT()}}>Train</button> 
      </div>
    </div>
  );
}
// {parse_data(props.data)}
export default UI;
