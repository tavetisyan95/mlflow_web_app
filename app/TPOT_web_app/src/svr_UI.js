import "./App.css";
import {config} from "./config.js";
import {events} from "./events.js";

function SVRUI(props){
	return (
<div id="svr_UI">
<div className="UI_wrapper">

<div>SVR</div>

<div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">kernel</legend>
        <div className="ui_item">
		<select id="selector_kernel"> 
			<option value="1">linear</option>
			<option value="2">poly</option>  
			<option value="3" selected="selected">rbf</option>  
			<option value="4">sigmoid</option>  
			<option value="5">precomputed</option>  
		</select>
		</div>
        <div className="description">
          <p className="type">Default: rbf</p>
          <p>The SVC kernel.</p>
        </div>
      </fieldset>
	</div>

<div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">degree</legend>
        <div className="input">
          <input id="degree" type="text" defaultValue="3"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: 3</p>
          <p>Degree for the poly kernel</p>
        </div>
      </fieldset>
	</div>


<div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">gamma</legend>
        <div className="input">
          <input id="gamma" type="text" defaultValue="3"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: 3</p>
          <p>NOT IMPLEMENTED</p>
        </div>
      </fieldset>
	</div>

<div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">coef0</legend>
        <div className="input">
          <input id="coef0" type="text" defaultValue="0"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: 0.0</p>
          <p>Independent term in kernel function. </p>
        </div>
      </fieldset>
	</div>

<div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">tol</legend>
        <div className="input">
          <input id="tol" type="text" defaultValue="1e-3"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: 1e-3</p>
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


	
	<div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">epsilon</legend>
        <div className="input">
          <input id="epsilon" type="text" defaultValue="0.1"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: 0.1</p>
          <p>Epsilon in the Epsilon-SVR model</p>
        </div>
      </fieldset>
	</div>
	
	
	
	
	
	
	

<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">shrinking</legend>
        <div className="input">
          <input type="checkbox" id="shrinking" value="True"></input>
        </div>
        <div className="description">
          <p className="type">Bool, default: True</p>
          <p>Whether to use the shrinking heuristic.</p>
        </div>
      </fieldset>
      </div>
	  
	  
	  
	  
	  <div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">cache_size</legend>
        <div className="input">
          <input id="cache_size" type="text" defaultValue="200"></input>
        </div>
        <div className="description">
          <p className="type">Float, default: 200</p>
          <p>The size of the kernel cache in MB.</p>
        </div>
      </fieldset>
	</div>

	<div className="ui_item">
      <fieldset className="fieldset">
        <legend className="legend">verbose</legend>
        <div className="input">
          <input type="checkbox" id="verbose" value="False"></input>
        </div>
        <div className="description">
          <p className="type">Bool, default: False</p>
          <p>Enable verbosity.</p>
        </div>
      </fieldset>
      </div>
	  
	  
	  <div className="ui_item" >
      <fieldset className="fieldset">
        <legend className="legend">max_iter</legend>
        <div className="input">
          <input id="max_iter" type="text" defaultValue="-1"></input>
        </div>
        <div className="description">
          <p className="type">Integer, default: -1</p>
          <p>Maximum number of iterations tried.</p>
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

export default SVRUI;