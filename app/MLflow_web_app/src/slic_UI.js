import "./App.css";

function SlicUI(props){
	return (
		<div id="slic_UI" hidden>			
			<div className="UI_wrapper">								
			
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">N_segments</legend>
					<div className="input">
						<input id="n_segments" type="text" defaultValue="100"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 100</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
				</div>
				
				
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">compactness</legend>
					<div className="input">
						<input id="compactness" type="text" defaultValue="10.0"></input>
					</div>
					<div className="description">
						<p className="type">Float, default: 10.0</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
				</div>
				
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">max_num_iter</legend>
					<div className="input">
						<input id="max_num_iter" type="text" defaultValue="10"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 10</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
				</div>
				
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">sigma</legend>
					<div className="input">
						<input id="sigma_slic" type="text" defaultValue="0"></input>
					</div>
					<div className="description">
						<p className="type">Float, default: 0</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
				</div>
				
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">convert2lab</legend>
					<div className="input">
						<input type="checkbox" id="convert2lab" defaultChecked={true}></input>
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
					<legend className="legend">enforce connectivity</legend>
					<div className="input">
						<input type="checkbox" id="enforce_connectivity" defaultChecked={true}></input>
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
					<legend className="legend">min size factor</legend>
					<div className="input">
						<input id="min_size_factor" type="text" defaultValue="0.5"></input>
					</div>
					<div className="description">
						<p className="type">Float, default: 0.5</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
				</div>
				
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">max size factor</legend>
					<div className="input">
						<input id="max_size_factor" type="text" defaultValue="3"></input>
					</div>
					<div className="description">
						<p className="type">Float, default: 3</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
				</div>
				
				
				
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">slic zero</legend>
					<div className="input">
						<input type="checkbox" id="slic_zero" defaultChecked={false}></input>
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
					<legend className="legend">start label</legend>
					<div className="input">
						<input id="start_label" type="text" defaultValue="0"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 0</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
				</div>
				
				
				<div className="ui_item" >
					<fieldset className="fieldset">
						<legend className="legend">channel_axis</legend>
						<div className="input">
							<input id="channel_axis_slic" type="text" defaultValue="-1"></input>
						</div>
						<div className="description">
							<p className="type">Integer, default: -1</p>
							<br></br>
							<p>Tolerance for stopping criteria.</p>
							<p>Multiple values can be entered.</p>
							<p>Separate each value with a comma, e.g. <i>"1e-4, 1e-3, ..."</i></p>
						</div>
					</fieldset>
				</div>
			
			 
			</div>
		</div>
);}

export default SlicUI;