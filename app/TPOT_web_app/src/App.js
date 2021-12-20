import "./App.css";
import UI from "./UI.js";
import LogisticRegressionUI from "./logistic_regression_UI.js"
import LinearRegressionUI from "./linear_regression_UI.js"
import SVCUI from "./svc_UI.js"
import SVRUI from "./svr_UI.js"
import {events} from "./events.js"


function App() {
	return (
		<div className="App">
			<p className="title">TPOT TRAINER</p>
			<p className="subtitle">Select parameters for TPOT training.</p>			
			
			<UI/>			
			<LogisticRegressionUI/>
			<LinearRegressionUI/>
			<SVCUI/>
			<SVRUI/>
		</div>
	);
}

export default App;