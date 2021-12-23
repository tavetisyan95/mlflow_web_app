import "./App.css";
import {config} from "./config.js";
import {events} from "./events.js";
import FitInterceptUI from "./fit_intercept_UI.js";

function LinearRegressionUI(props){
	return (
	<div id="linear_regression_UI" hidden>
<div className="UI_wrapper">

<div>Linear Regression</div>


{<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">fit_intercept</legend>
		<input type="checkbox" name="fit_intercept_lin" value="True" defaultChecked={true}></input>
		  <label for="True">True</label>
          <input type="checkbox"  name="fit_intercept_lin" value="False"></input>
		  <label for="false">False</label>		  
        <div className="description">
          <p className="type">Bool, default: False</p>
          <p>Whether to use dual or primal formulation.</p>
        </div>
      </fieldset>
		  </div>}

{/*<FitInterceptUI/>*/}

{<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">normalize</legend>
		<input type="checkbox" name="normalize" value="True" defaultChecked={true}></input>
		  <label for="True">True</label>
          <input type="checkbox"  name="normalize" value="False"></input>
		  <label for="false">False</label>		  
        <div className="description">
          <p className="type">Bool, default: False</p>
          <p>Whether to use dual or primal formulation.</p>
        </div>
      </fieldset>
		  </div>}
	  
	  
	  {<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">copy_X</legend>
		<input type="checkbox" name="copy_X" value="True" defaultChecked={true}></input>
		  <label for="True">True</label>
          <input type="checkbox"  name="copy_X" value="False"></input>
		  <label for="false">False</label>		  
        <div className="description">
          <p className="type">Bool, default: False</p>
          <p>Whether to use dual or primal formulation.</p>
        </div>
      </fieldset>
		  </div>}
	  
	  {<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">positive</legend>
		<input type="checkbox" name="positive" value="True"></input>
		  <label for="True">True</label>
          <input type="checkbox"  name="positive" value="False" defaultChecked={true}></input>
		  <label for="false">False</label>		  
        <div className="description">
          <p className="type">Bool, default: False</p>
          <p>Whether to use dual or primal formulation.</p>
        </div>
      </fieldset>
		  </div>}
	  
	  
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
        <legend className="legend">degree</legend>
        <div className="input">
          <input
            type="range"
            list="tickmarks"
            id="mutation_rate"
            min="0"
            max="1.0"
            step="0.1"
            defaultValue="0.9"
            oninput="this.nextElementSibling.value = this.value"
          ></input>
        </div>
        <div className="description">
          <p className="type">Float in the range [0.0, 1.0], default: 0.9</p>
          <p>
            The percentage of pipelines to randomly change every generation.
          </p>
        </div>
      </fieldset>
      </div>

      <div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">crossover_rate</legend>
        <div className="input">
          <input
            id="crossover_rate"
            type="range"
            list="tickmarks"
            min="0"
            max="1.0"
            step="0.1"
            defaultValue="0.1"
          ></input>
        </div>
        <div className="description">
          <p className="type">Float in the range [0.0, 1.0], default: 0.1</p>
          <p className="type">
            Sum of mutation_rate and crossover_rate cannot exceed 1.0
          </p>
          <p>The percentage of pipelines to randomly breed every generation.</p>
        </div>
      </fieldset>
</div>*/}
{/*
      <div className="ui_item">
      <datalist className="tickmarks" id="tickmarks">
        <option value="0.0"></option>
        <option value="0.1"></option>
        <option value="0.2"></option>
        <option value="0.3"></option>
        <option value="0.4"></option>
        <option value="0.5"></option>
        <option value="0.6"></option>
        <option value="0.7"></option>
        <option value="0.8"></option>
        <option value="0.9"></option>
        <option value="1.0"></option>
      </datalist>
      </div>
*/}
		
		
	{/*<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">Training mode</legend>
	
		
     
	 <div className="toggle_wrapper">
        <div className='ball_container'><div id="ball_id" class="ball" onClick={(e) => {events.toggle_training_mode(e.target.id, "Classification")}}></div></div>
        <div className="choice_title">CLASSIFICATION</div>
        <div></div>
        <div></div>
        <div className='ball_container'><div id="ball_id2" class="ball" onClick={(e) => {events.toggle_training_mode(e.target.id, "Regression")}}></div></div>
        <div className="choice_title">REGRESSION</div>
      </div>
      <div className="description">
          The mode of training for the optimizer.
	 </div>







               
        
        <div className="input">
          <input
            type="radio"
            name="mode"
            value="Classification"
            defaultChecked
          ></input>
          Classification
          <input type="radio" name="mode" value="Regression"></input>Regression
        </div>
        <div className="description">
          The mode of training for the optimizer.
        </div>
  





      </fieldset>
      </div>*/}		
      
</div>
</div>
);}

export default LinearRegressionUI;