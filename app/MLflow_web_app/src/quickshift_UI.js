import "./App.css";

function QuickshiftUI(props){
	return (
		<div id="quickshift_UI">
			<div className="UI_wrapper">


				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Ratio</legend>
					<div className="input">
						<input id="ratio" type="text" defaultValue="1.0"></input>
					</div>
					<div className="description">
						<p className="type">Float, default: 1.0</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
				</div> 
				
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Kernel size</legend>
					<div className="input">
						<input id="kernel_size" type="text" defaultValue="1.0"></input>
					</div>
					<div className="description">
						<p className="type">Float, default: 1.0</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
			</div> 
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Max dist</legend>
					<div className="input">
						<input id="max_dist" type="text" defaultValue="10"></input>
					</div>
					<div className="description">
						<p className="type">Float, default: 10</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
			</div> 
			
			
			<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Sigma</legend>
					<div className="input">
						<input id="sigma_quickshift" type="text" defaultValue="0"></input>
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
					<legend className="legend">Channel axis</legend>
					<div className="input">
						<input id="channel_axis_quickshift" type="text" defaultValue="-1"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: -1</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
			</div> 
				
				

				
		
			</div>
		</div>
);}

export default QuickshiftUI;