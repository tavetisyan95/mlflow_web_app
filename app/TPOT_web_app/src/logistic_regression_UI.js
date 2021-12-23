import "./App.css";
import {config} from "./config.js";
import {events} from "./events.js";
import FitInterceptUI from "./fit_intercept_UI.js";
import LinearRegressionUI from "./linear_regression_UI.js"

function LogisticRegressionUI(props){
	return (
<div id="logistic_regression_UI">
<div className="UI_wrapper">

<div>Logistic Regression</div>


{/*<div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">penalty</legend>
        <div className="ui_item">
		<select id="selector_penalty"> 
			<option value="1">None</option>
			<option value="2" selected="selected">l2</option>  
			<option value="3">l1</option>  
			<option value="4">elasticnet</option>  
		</select>
		</div>
        <div className="description">
          <p className="type">Float, default: 1.0</p>
          <p>Penalty norm.</p>
        </div>
      </fieldset>
</div>*/}

<div className="ui_item">
<fieldset className="fieldset">
        <legend className="legend">penalty</legend>
			<input type="checkbox" id="none" name="penalty" value="None"></input>
			<label for="none">None</label>
			<input type="checkbox" id="l1" name="penalty" value="l1"></input>
			<label for="l1">l1</label>
			<input type="checkbox" id="l2" name="penalty" value="l2" defaultChecked={true}></input>
			<label for="l2">l2</label>
			<input type="checkbox" id="elasticnet" name="penalty" value="elasticnet"></input>
			<label for="elasticnet">elasticnet</label>
        <div className="description">
          <p className="type">Float, default: 1.0</p>
          <p>Penalty norm.</p>
        </div>
      </fieldset>
	 </div>

<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">dual</legend>
		<input type="checkbox" id="true" name="dual" value="True"></input>
		  <label for="True">True</label>
          <input type="checkbox" id="false" name="dual" value="False" defaultChecked={true}></input>
		  <label for="false">False</label>		  
        <div className="description">
          <p className="type">Bool, default: False</p>
          <p>Whether to use dual or primal formulation.</p>
        </div>
      </fieldset>
      </div>
	  
	  <div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">tol</legend>
        <div className="input">
          <input id="tol" type="text" defaultValue="1e-4"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: 1e-4</p>
          <p>Tolerance for stopping criteria</p>
        </div>
      </fieldset>
	</div>


<div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">C</legend>
        <div className="input">
          <input id="C" type="text" defaultValue="1.0"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: 1.0</p>
          <p>Regularization strength C.</p>
        </div>
      </fieldset>
	</div>
	  
	  
	  {/*<FitInterceptUI/>*/}
		  {<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">fit_intercept</legend>
		<input type="checkbox" name="fit_intercept" value="True"></input>
		  <label for="True">True</label>
          <input type="checkbox" name="fit_intercept" value="False" defaultChecked={true}></input>
		  <label for="false">False</label>		  
        <div className="description">
          <p className="type">Bool, default: False</p>
          <p>Whether to use dual or primal formulation.</p>
        </div>
      </fieldset>
		  </div>}
	  
	  
	  <div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">intercept_scaling</legend>
        <div className="input">
          <input id="intercept_scaling" type="text" defaultValue="1.0"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: 1.0</p>
          <p>Pending explanation</p>
        </div>
      </fieldset>
	</div>
	
	<div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">class_weight</legend>
        <div className="input">
          <input id="class_weight" type="text" defaultValue="1.0"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: None</p>
          <p>Pending explanation</p>
        </div>
      </fieldset>
	</div>
	
	
	<div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">random_state</legend>
        <div className="input">
          <input id="random_state" type="text" defaultValue="None"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: 1.0</p>
          <p>Pending explanation</p>
        </div>
      </fieldset>
	</div>
	
	
	<div className="ui_item">
<fieldset className="fieldset">
        <legend className="legend">solver</legend>
			<input type="checkbox" id="newton-cg" name="solver" value="newton-cg"></input>
			<label for="newton-cg">newton-cg</label>
			<input type="checkbox" id="lbfgs" name="solver" value="lbfgs" defaultChecked={true}></input>
			<label for="lbfgs">lbfgs</label>
			<input type="checkbox" id="liblinear" name="solver" value="liblinear" ></input>
			<label for="liblinear">liblinear</label>
			<input type="checkbox" id="sag" name="solver" value="sag"></input>
			<label for="sag">sag</label>
			<input type="checkbox" id="saga" name="solver" value="saga"></input>
			<label for="saga">saga</label>
        <div className="description">
          <p className="type">Float, default: 1.0</p>
          <p>Penalty norm.</p>
        </div>
      </fieldset>
	 </div>
	
	<div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">max_iter</legend>
        <div className="input">
          <input id="max_iter" type="text" defaultValue="100"></input>
        </div>
        <div className="description">
          <p className="type">Integer, default: 100</p>
          <p>Maximum number of iterations tried.</p>
        </div>
      </fieldset>
	</div>
	
	
	<div className="ui_item">
<fieldset className="fieldset">
        <legend className="legend">multi_class</legend>
			<input type="checkbox" id="auto" name="multi_class" value="auto" defaultChecked={true}></input>
			<label for="auto">auto</label>
			<input type="checkbox" id="ovr" name="multi_class" value="ovr"></input>
			<label for="ovr">ovr</label>
			<input type="checkbox" id="multinomial" name="multi_class" value="multinomial" ></input>
			<label for="multinomial">multinomial</label>
        <div className="description">
          <p className="type">Float, default: 1.0</p>
          <p>Penalty norm.</p>
        </div>
      </fieldset>
	 </div>
	
	<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">verbose</legend>
        <div className="input">
          <input type="text" id="verbose" defaultValue="2"></input>
        </div>
        <div className="description">
          <p className="type">0 or any positive integer, default: 0</p>
          <p>The verbosity level of the optimizer.</p>
        </div>
      </fieldset>
      </div>
	  
	
	
	
	<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">warm_start</legend>
		<input type="checkbox" id="true" name="warm_start" value="True"></input>
		  <label for="True">True</label>
          <input type="checkbox" id="false" name="warm_start" value="False" defaultChecked={true}></input>
		  <label for="false">False</label>		  
        <div className="description">
          <p className="type">Bool, default: False</p>
          <p>Whether to use dual or primal formulation.</p>
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
          <p>The number of CPU cores used for training.</p>
        </div>
      </fieldset>
      </div>
	  
	  
	  <div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">l1_ratio</legend>
        <div className="input">
          <input id="l1_ratio" type="text" defaultValue="None"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: None</p>
          <p>The Elastic-Net mixing parameter</p>
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

export default LogisticRegressionUI;