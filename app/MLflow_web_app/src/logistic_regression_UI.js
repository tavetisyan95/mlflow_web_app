import "./App.css";
import {config} from "./config.js";
import {events} from "./events.js";
import LinearRegressionUI from "./linear_regression_UI.js"

function LogisticRegressionUI(props){
	return (
		<div id="logistic_regression_UI">			
			<div className="UI_wrapper">								
			
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
							<p className="type">Default: l2</p>
							<br></br>
							<p>The penalty norm used.</p>
							<p>You can select one or more norm.</p>
							<p>At least one must be selected.</p>
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
							<br></br>
							<p>Whether to use dual or primal formulation.</p>
							<p>You can select either or both.</p>
							<p>At least one must be selected.</p>
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
							<br></br>
							<p>Tolerance for stopping criteria.</p>
							<p>Multiple values can be entered.</p>
							<p>Separate each value with a comma, e.g. <i>"1e-4, 1e-3, ..."</i></p>
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
							<br></br>
							<p>Regularization strength C.</p>
							<p>Multiple values can be entered.</p>
							<p>Separate each value with a comma, e.g. <i>"1.0, 1.5, ..."</i></p>
						</div>
					</fieldset>
				</div>
		  
			  
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">fit_intercept</legend>
						<input type="checkbox" name="fit_intercept" value="True" defaultChecked={true}></input>
						<label for="True">True</label>
						<input type="checkbox" name="fit_intercept" value="False"></input>
						<label for="false">False</label>		  
						<div className="description">
							<p className="type">Bool, default: True</p>
							<br></br>
							<p>Specifies if a constant (a.k.a. bias or intercept) should be added to the decision function.</p>
							<p>You can select either or both.</p>
							<p>At least one must be selected.</p>
						</div>
					</fieldset>
				</div>
			  
			  
				<div className="ui_item" >
					<fieldset className="fieldset">
						<legend className="legend">intercept_scaling</legend>
						<div className="input">
							<input id="intercept_scaling" type="text" defaultValue="1.0"></input>
						</div>
						<div className="description">
							<p className="type">Float, default: 1.0</p>
							<br></br>
							<p>If solver <i>liblinear</i> is used and <i>fit_intercept</i> is set to True, 
							a "synthetic feature" equal to <i>intercept_scaling</i> is appended to the instance vector 
							<i>([x, intercept_scaling])</i></p>	
							<p>Multiple values can be entered.</p>
							<p>Separate each value with a comma, e.g. <i>"1.0, 1.5, ..."</i></p>							
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
							<p className="type">Integer or None, default: None</p>
							<br></br>
							<p>Used as a seed when solver == ‘sag’, ‘saga’ or ‘liblinear’ to shuffle the data.</p>
							<p>A single number is expected.</p>
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
							<p className="type">Default: lbfgs</p>
							<br></br>							
							<p>Algorithm to use for optimization.</p>
							<p>You can select one or more solver.</p>
							<p>At least one must be selected.</p>
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
							<br></br>
							<p>Maximum number of iterations to try for training.</p>
							<p>Multiple values can be entered.</p>
							<p>Separate each value with a comma, e.g. <i>"100, 150, ..."</i></p>	
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
							<p className="type">Default: auto</p>
							<br></br>
							<p>Whether to handle labels as binary or multi-class</p>
							<p>You can select one or more option.</p>
							<p>At least one must be selected.</p>
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
							<br></br>
							<p>Whether to reuse the previous trained estimator.</p>
							<p>You can select either or both.</p>
							<p>At least one must be selected.</p>
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
							<br></br>
							<p>Used if penalty is <i>elasticnet</i>.
							If set to 0, equivalent to <i>penalty='l2'</i>.
							If set to 1, equivalent to <i>penalty='l1'</i>.
							If between 0 and 1, a mix of L1 and L2 is used.</p>
							<p>Multiple values can be entered.</p>
							<p>Separate each value with a comma, e.g. <i>"0, 0.1, ..."</i></p>	
						</div>
					</fieldset>
				</div>
			 
			</div>
		</div>
);}

export default LogisticRegressionUI;