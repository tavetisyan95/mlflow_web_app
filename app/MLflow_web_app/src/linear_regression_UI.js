import "./App.css";

function LinearRegressionUI(props){
	return (
		<div id="linear_regression_UI" hidden>
			<div className="UI_wrapper">


				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">fit_intercept</legend>
						<input type="checkbox" name="fit_intercept_lin" value="True" defaultChecked={true}></input>
						<label for="True">True</label>
						<input type="checkbox"  name="fit_intercept_lin" value="False"></input>
						<label for="false">False</label>		  
						<div className="description">
							<p className="type">Bool, default: True</p>
							<br></br>
							<p>Whether to calculate the intercept for this model.</p>
							<p>You can select either or both.</p>
							<p>At least one must be selected.</p>
						</div>
					</fieldset>
				 </div>


				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">normalize</legend>
						<input type="checkbox" name="normalize" value="True"></input>
						<label for="True">True</label>
						<input type="checkbox"  name="normalize" value="False" defaultChecked={true}></input>
						<label for="false">False</label>		  
						<div className="description">
							<p className="type">Bool, default: False</p>
							<br></br>
							<p>When <i>fit_intercept</i> is True, normalize data by subtracting the mean and dividing by the l2-norm.</p>
							<p>You can select either or both.</p>
							<p>At least one must be selected.</p>
						</div>
					</fieldset>
				</div>
			  
			  
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">copy_X</legend>
						<input type="checkbox" name="copy_X" value="True" defaultChecked={true}></input>
						<label for="True">True</label>
						<input type="checkbox"  name="copy_X" value="False"></input>
						<label for="false">False</label>		  
						<div className="description">
							<p className="type">Bool, default: False</p>
							<br></br>
							<p>If True, X will be copied; else, it may be overwritten.</p>
							<p>You can select either or both.</p>
							<p>At least one must be selected.</p>
						</div>
					</fieldset>
				</div>
			  
			  
				<div className="ui_item">
					<fieldset className="fieldset">
						<legend className="legend">positive</legend>
						<input type="checkbox" name="positive" value="True"></input>
						<label for="True">True</label>
						<input type="checkbox"  name="positive" value="False" defaultChecked={true}></input>
						<label for="false">False</label>		  
						<div className="description">
							<p className="type">Bool, default: False</p>
							<br></br>
							<p>When set to True, forces the coefficients to be positive.</p>
							<p>You can select either or both.</p>
							<p>At least one must be selected.</p>
						</div>
					</fieldset>
				</div>
		
			</div>
		</div>
);}

export default LinearRegressionUI;