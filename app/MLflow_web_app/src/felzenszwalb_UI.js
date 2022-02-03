import "./App.css";

function FelzenszwalbUI(props){
	return (
		<div id="felzenszwalb_UI" hidden>			
			<div className="UI_wrapper">								
			
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Scale</legend>
					<div className="input">
						<input id="scale" type="text" defaultValue="1.0"></input>
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
					<legend className="legend">Sigma</legend>
					<div className="input">
						<input id="scale_felzenszwalb" type="text" defaultValue="0.8"></input>
					</div>
					<div className="description">
						<p className="type">Float, default: 0.8</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
				</div> 
				
				
				<div className="ui_item">
				<fieldset className="fieldset">
					<legend className="legend">Min size</legend>
					<div className="min_size">
						<input id="scale_felzenszwalb" type="text" defaultValue="20"></input>
					</div>
					<div className="description">
						<p className="type">Integer, default: 20</p>
						<br></br>
						<p>The name of the MLflow experiment that the run will be logged to.</p>
					</div>
				</fieldset>
				</div>

								  
								  <div className="ui_item" >
					<fieldset className="fieldset">
						<legend className="legend">channel_axis</legend>
						<div className="input">
							<input id="channel_axis_felzenszwalb" type="text" defaultValue="-1"></input>
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

export default FelzenszwalbUI;