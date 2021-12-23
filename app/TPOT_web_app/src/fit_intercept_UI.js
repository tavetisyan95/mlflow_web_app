import "./App.css";
import {config} from "./config.js";
import {events} from "./events.js";

function FitInterceptUI(props){
	return(
<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">fit_intercept</legend>
		<input type="checkbox" id="true" name="fit_intercept" value="True"></input>
		  <label for="True">True</label>
          <input type="checkbox" id="false" name="fit_intercept" value="False" defaultChecked={true}></input>
		  <label for="false">False</label>		  
        <div className="description">
          <p className="type">Bool, default: False</p>
          <p>Whether to use dual or primal formulation.</p>
        </div>
      </fieldset>
	</div>
	);
}

export default FitInterceptUI;