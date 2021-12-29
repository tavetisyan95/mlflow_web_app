import { config } from "./config.js";
import papa from "papaparse";

// Creating variables for text areas that will be used across the script
var downloadArea;
var responseArea;
var logArea;
var fileArea;

export const events = {
deployModel: function(){
	var runID = document.getElementById("selector_id").value;
	var experimentNameInference = document.getElementById("selector_experiment").value;
	
	console.log(runID);
	
	fetch(
            "http://" +
              config.api_url +
              ":" +
              config.api_port +
              "/" +
              "deploy-model"
				+ "?run_id="			  + encodeURI(runID) +
				 "&experiment_name_inference=" + encodeURI(experimentNameInference)
          )
},
predict: function(){
	var file = document.getElementById("prediction_data").files[0];
	var predictionFileName = document.getElementById("prediction_name").value;
	console.log(predictionFileName)

		try {
		papa.parse(file, {
			download: false,
			header: true,
			skipEmptyLines: true,
			complete: function (results){				
				
				var payload = JSON.stringify({data: JSON.stringify(results.data),
				prediction_name: predictionFileName})			

          // Sending a POST request to our Python API
          fetch(
            "http://" +
              config.api_url +
              ":" +
              config.api_port +
              "/" +
              "deploy-model",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: payload,
            }
          )
            .then((response) => response.json())
			//.then((data) => (console.log(data)))
            .then((data) => {console.log(data.Output);		;		  
			var para = document.createElement("p");
			var url = document.createElement("a");
			url.href = "http://localhost:8080/" + data.prediction_name;
			url.innerText = data.prediction_name
			para.appendChild(url)
		  
			fileArea.appendChild(para);
			
			if (localStorage.getItem("prediction_file_names") == null){
				localStorage.setItem("prediction_file_names", JSON.stringify([data.prediction_name]));
			} else {
				var predictionFileNames = JSON.parse(localStorage.getItem("prediction_file_names"));
				console.log(predictionFileNames)
				predictionFileNames.push(data.prediction_name);				
				localStorage.setItem("prediction_file_names", JSON.stringify(predictionFileNames));
			}
			

			
			
			
			//localStorage.setItem(data.prediction_name, data.prediction_name)
			}) // Showing the success message defined in the Python API
            //.then(() => (downloadArea.hidden = false)) // Showing download link for the pipeline script
			//.then((data) => (idSelector.add(new Option(data.ID, data.ID))))			
            ///.then(() => (trainButton.style.visibility = "visible")) // Making train button visible
            //.then(() => clearInterval(interval)) // Clearing the interval that repeatedly checked logs
            .catch((error) => {
              console.error("Error", error);
            });
		  
		}})} catch {
      // Updating response message if papa.parse fails because a CSV dataset was not selected
      responseArea.innerText =
        "Dataset not selected. Please select a dataset for tuning.";
    }
},
  checkedVals: function(checkboxes){
	 var checked = []
	 for (var i=0; i < checkboxes.length; i++){
		 //console.log(checkboxes[i].checked);
		 if (checkboxes[i].checked){
			 checked.push(checkboxes[i].value);
		 }
	 }
	 
	 return checked
  },
  checkedBoxes: function(checkboxes){
	var checked = []
	
	for (var i=0; i < checkboxes.length; i++){
		 //console.log(checkboxes[i].checked);
		 if (checkboxes[i].checked){
			 checked.push(checkboxes[i].value == "True");
		 }
	}
	 
	 return checked
	
  },
  // Function for checking training logs upon launch
  checkLog: async function () {
    // Waiting for 1 second to allow UI elements to load
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);

    /* Assigning values to the variables instantiated at the top of the script.
		The variables will be available to other functions in the script.
		*/
    logArea = document.getElementById("log_area");
    downloadArea = document.getElementById("download");
    responseArea = document.getElementById("response");

    // Reading log files
    events.readLog();
  },

  // Function for reading training logs
  readLog: async function (training = false, noScript = false) {
    /* Fetching training logs and showing them in the log area.
		While training, logs will be shown if verbosity is not 0.
		*/
    await fetch("http://localhost:8080/logs.txt")
      .then((response) => response.text())
      .then((response) => (logArea.innerText = response));
	
	/*localStorage.setItem("TestKey", JSON.stringify(["TestValue"]));
	var arr = JSON.parse(localStorage.getItem("TestKey"));
	arr.push("TestValue")
	console.log(arr);
	//console.log(JSON.parse(localStorage.getItem("TestKey")).push("Test Value"))
	localStorage.setItem("TestKey", JSON.stringify(arr));
	console.log(JSON.parse(localStorage.getItem("TestKey")));*/
	
	fileArea = document.getElementById("prediction_files")
	
	if (localStorage.getItem("prediction_file_names") !== null){
	
	var predictionFileNames = JSON.parse(localStorage.getItem("prediction_file_names"));
	
	console.log(predictionFileNames);
	
	for (var i=0; i < predictionFileNames.length; i++){
		console.log(predictionFileNames[i]);
		var para = document.createElement("p");
			var url = document.createElement("a");
			url.href = "http://localhost:8080/" + predictionFileNames[i];
			url.innerText = predictionFileNames[i];
			para.appendChild(url);
		  
			fileArea.appendChild(para);
	}}
	
	
	var idSelector = document.getElementById("selector_id");
	
	
	if (localStorage.getItem("model_ids") !== null){
	
	var modelIDs = JSON.parse(localStorage.getItem("model_ids"));
	
	console.log(modelIDs);
	
	for (var i=0; i < modelIDs.length; i++){
		console.log(modelIDs[i]);
		idSelector.add(new Option(modelIDs[i], modelIDs[i]))
	}}
	
	
	if (localStorage.getItem("experiment_names") !== null){
	var experimentSelector = document.getElementById("selector_experiment");
	
	var experimentNames = JSON.parse(localStorage.getItem("experiment_names"));
	
	console.log(!experimentNames.includes("name"));
	
	console.log(experimentNames);
	
	for (var i=0; i < experimentNames.length; i++){
		console.log(experimentNames[i]);
		experimentSelector.add(new Option(experimentNames[i], experimentNames[i]))
	}}
	
	/*var values = [],
	keys = Object.keys(localStorage),
	i = keys.length	
	
	console.log(keys)
	
	fileArea = document.getElementById("prediction_files")
	
	while (i--){
		//console.log(localStorage.getItem(keys[i]));
		var para = document.createElement("p");
			var url = document.createElement("a");
			url.href = "http://localhost:8080/" + localStorage.getItem(keys[i]);
			url.innerText = localStorage.getItem(keys[i])
			para.appendChild(url)
		  
			fileArea.appendChild(para)
	}*/

    // Behavior while not training. Intended to execute only upon page load or refresh
    if (training == false) {
      // Trying to fetch the TPOT pipeline script
      var response = await fetch(
        "http://localhost:8080/predictions.csv"
      );

      // Obtaining fetch status code
      if (response.status == 404) {
        noScript = true;
      }

      // If the script exists, showing download link and update status message
      if (noScript == false) {
        downloadArea.hidden = false;
        responseArea.innerText =
          "Previously completed training, script available";

        // If the logs are empty, hiding the log area and only show download link
        if (logArea.innerText != "") {
          logArea.hidden = false;
        }
      }
    }
    // Scrolling to the bottom of the training logs
    logArea.scrollTop = logArea.scrollHeight;
  },
  trainModel: function()
  {
	  // Obtaining the provided CSV dataset and selected training mode
	  var file = document.getElementById("data").files[0];
    //var mode = document.querySelector('input[name="mode"]:checked').value;
    //var mode = events.toggle_choice;
	var model = document.getElementById("selector_model").value;
	var experimentName = document.getElementById("experiment_name").value;
	
	var selector = document.getElementById("selector_model");
	
	//var scoring = JSON.stringify(document.getElementById("scoring").value);
	var nJobs = JSON.stringify(document.getElementById("n_jobs").value);
	//var refit = document.getElementById("refit").checked;
	var cv = JSON.stringify(document.getElementById("cv").value);
	//var verboseGridSearch = document.getElementById("verbose_gridsearch").value;
	//var preDispatch
	var return_train_score = document.getElementById("return_train_score").checked;
	
	var gridSearchParams = {
		//scoring: scoring,
		n_jobs: nJobs,
		//refit: refit,
		cv: cv,
		//verbose_gridsearch: verboseGridSearch,
		return_train_score: return_train_score
	}
	
	if (selector.value == "logistic_regression"){
		events.trainClassifier(file, gridSearchParams, model, experimentName);
	} else if (selector.value == "linear_regression"){
		events.trainRegressor(file, gridSearchParams, model, experimentName);
	}
	
  },  
  // Function for training TPOT
  trainClassifier: function (file, gridSearchParams, model, experimentName) {
    
    
	
	var penalty = events.checkedVals(document.getElementsByName("penalty"));	
	
	var dual = events.checkedBoxes(document.getElementsByName("dual"));	
	console.log(dual);
	console.log(document.getElementsByName("dual")[0].checked);
	
	var tol = JSON.stringify(document.getElementById("tol").value);
	var C = JSON.stringify(document.getElementById("C").value);
	
	
	
		var fitIntercept = events.checkedBoxes(document.getElementsByName("fit_intercept"));	
		

	
	//var fitIntercept = events.checkedBoxes(document.getElementsByName("fit_intercept"));
	var interceptScaling = JSON.stringify(document.getElementById("intercept_scaling").value);
	// var classWeight
	var randomState = JSON.stringify(document.getElementById("random_state").value);
	
	var solver = events.checkedVals(document.getElementsByName("solver"));
	
	var maxIter = JSON.stringify(document.getElementById("max_iter").value);
	var multiClass = events.checkedVals(document.getElementsByName("multi_class"));
	//var verbose = JSON.stringify(document.getElementById("verbose").value);
	var warmStart = events.checkedBoxes(document.getElementsByName("warm_start"));	
	var l1Ratio = JSON.stringify(document.getElementById("l1_ratio").value);
	
	events.parseData(file, {penalty: penalty,					
					model: model,
					experiment_name: experimentName,
					dual: dual,
					tol: tol,
					C: C,
					fit_intercept: fitIntercept,
					intercept_scaling: interceptScaling,
					random_state: randomState,
					solver: solver,
					max_iter: maxIter,
					multi_class: multiClass,
					//verbose: verbose,
					warm_start: warmStart,
					l1_ratio: l1Ratio},
					gridSearchParams);
  },
  trainRegressor: function (file, gridSearchParams, model, experimentName){
	  var fitIntercept = events.checkedBoxes(document.getElementsByName("fit_intercept_lin"));
	  var normalize = events.checkedBoxes(document.getElementsByName("normalize"));
	  var copyX = events.checkedBoxes(document.getElementsByName("copy_X"));
	  var positive = events.checkedBoxes(document.getElementsByName("positive"));	  
	  
	  
	  events.parseData(file, {fit_intercept: fitIntercept,					
					model: model,
					experiment_name: experimentName,
					normalize: normalize,
					copy_X: copyX,
					positive: positive},
					gridSearchParams);	  
  },
  parseData: function(){	 
	  console.log("Initial check")
	  console.log(arguments[1]["penalty"])
	  
	  console.log("Before adding parsed data")				
	  //var payload = arguments[1];
	  //console.log(payload)
	  
	  var payload = {};
	  
	  for (var key in arguments[1]){
		  console.log(key)
		  payload[key] = arguments[1][key];	  
	  }
	  for (var key in arguments[2]){
		  console.log(key)
		  payload[key] = arguments[2][key];
	  }
	  
	  console.log(payload)
	  
	  
	var trainButton = document.getElementById("train_button");
	var idSelector = document.getElementById("selector_id");
	var experimentSelector = document.getElementById("selector_experiment");
	logArea = document.getElementById("log_area");
    downloadArea = document.getElementById("download");
    responseArea = document.getElementById("response");

    // Hiding the script download link and log area and showing the response area
    downloadArea.hidden = true;
    responseArea.hidden = false;
    logArea.hidden = true;

    // Changing the status message in the response area
    responseArea.innerText = "Training...";
	  
	  try {
		papa.parse(arguments[0], {
			download: false,
			header: true,
			skipEmptyLines: true,
			complete: function (results){				
				
				payload.data = JSON.stringify(results.data);
				console.log("After adding parsed data")
				console.log(payload);
				payload = JSON.stringify(payload);
				console.log(payload.max_iter);				
		
		  
		  // Hiding train button
          trainButton.style.visibility = "hidden";

          // Sending a POST request to our Python API
          fetch(
            "http://" +
              config.api_url +
              ":" +
              config.api_port +
              "/" +
              config.api_endpoint,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: payload,
            }
          )
            .then((response) => response.json())
			//.then((data) => (console.log(data)))
            .then((data) => {responseArea.innerText = data.Output;
			idSelector.add(new Option(data.ID, data.ID));
			if (localStorage.getItem("model_ids") == null){
				localStorage.setItem("model_ids", JSON.stringify([data.ID]));
			} else {
				var modelIDs = JSON.parse(localStorage.getItem("model_ids"));
				console.log(modelIDs)
				modelIDs.push(data.ID);				
				localStorage.setItem("model_ids", JSON.stringify(modelIDs));
			}					
			
			if (localStorage.getItem("experiment_names") == null){
				localStorage.setItem("experiment_names", JSON.stringify([data.experiment_name]));
				experimentSelector.add(new Option(data.experiment_name));
			} else {
				var experimentNames = JSON.parse(localStorage.getItem("experiment_names"));
				console.log(experimentNames)
				if (!experimentNames.includes(data.experiment_name)){
					experimentNames.push(data.experiment_name);			
					experimentSelector.add(new Option(data.experiment_name));					
				localStorage.setItem("experiment_names", JSON.stringify(experimentNames));
				}				
			}
			
			}) // Showing the success message defined in the Python API
            //.then(() => (downloadArea.hidden = false)) // Showing download link for the pipeline script
			//.then((data) => (idSelector.add(new Option(data.ID, data.ID))))			
            .then(() => (trainButton.style.visibility = "visible")) // Making train button visible
            //.then(() => clearInterval(interval)) // Clearing the interval that repeatedly checked logs
            .catch((error) => {
              console.error("Error", error);
            });
		  
		}})} catch {
      // Updating response message if papa.parse fails because a CSV dataset was not selected
      responseArea.innerText =
        "Dataset not selected. Please select a dataset for tuning.";
    }
  },
  toggle_train_state : {},
  toggle_choice : "Classification",
  toggle_training_mode : function(id, choice) {
    events.toggle_choice = choice;
    const possible = ["ball_id", "ball_id2"];
    const elem = document.getElementById(id);
    if(typeof(events.toggle_train_state[id]) === "undefined") {
      events.toggle_train_state[id] = false;
    }
    if(events.toggle_train_state[id]) {
      elem.style.marginLeft = "35px";
      elem.style.background = "limegreen";
      const other_id = possible.filter((x) => x !== id)[0]
      const other_elem = document.getElementById(other_id);
      other_elem.style.marginLeft = "0px";
      other_elem.style.background = "red";
    } else {
      elem.style.marginLeft = "0px";
      elem.style.background = "red";
      const other_id = possible.filter((x) => x !== id)[0]
      const other_elem = document.getElementById(other_id);
      other_elem.style.marginLeft = "35px";
      other_elem.style.background = "limegreen";
    }
    elem.style.transition = "all 0.2s ease-in-out";
    events.toggle_train_state[id] = !events.toggle_train_state[id];
  }
};
