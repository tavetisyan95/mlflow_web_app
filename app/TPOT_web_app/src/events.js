import { config } from "./config.js";
import papa from "papaparse";

// Creating variables for text areas that will be used across the script
var downloadArea;
var responseArea;
var logArea;

export const events = {
deployModel: function(){
	var runID = document.getElementById("selector_id").value;
	console.log(runID);
	
	fetch(
            "http://" +
              config.api_url +
              ":" +
              config.api_port +
              "/" +
              "deploy-model"
				+ "?run_id="			  + encodeURI(runID)
          )
},
predict: function(){
	var file = document.getElementById("prediction_data").files[0];

		try {
		papa.parse(file, {
			download: false,
			header: true,
			skipEmptyLines: true,
			complete: function (results){				
				
				var payload = JSON.stringify({data: JSON.stringify(results.data)})			

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
            .then((data) => (console.log(data.Output))) // Showing the success message defined in the Python API
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

    // Behavior while not training. Intended to execute only upon page load or refresh
    if (training == false) {
      // Trying to fetch the TPOT pipeline script
      var response = await fetch(
        "http://localhost:8080/script.py"
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
            .then((data) => (responseArea.innerText = data.Output,
			console.log(idSelector.add(new Option(data.ID, data.ID))))) // Showing the success message defined in the Python API
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
