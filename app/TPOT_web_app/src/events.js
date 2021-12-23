import { config } from "./config.js";
import papa from "papaparse";

// Creating variables for text areas that will be used across the script
var downloadArea;
var responseArea;
var logArea;

export const events = {
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

  // Function for training TPOT
  trainTPOT: function () {
    // Obtaining the provided CSV dataset and selected training mode
    var file = document.getElementById("data").files[0];
    //var mode = document.querySelector('input[name="mode"]:checked').value;
    //var mode = events.toggle_choice;
	var model = document.getElementById("selector_model").value;
	var experimentId = document.getElementById("experiment_id").value;
	
	var penalty = events.checkedVals(document.getElementsByName("penalty"));	
	
	var dual = events.checkedBoxes(document.getElementsByName("dual"));	
	console.log(dual);
	console.log(document.getElementsByName("dual")[0].checked);
	
	var tol = JSON.stringify(document.getElementById("tol").value);
	var C = JSON.stringify(document.getElementById("C").value);
	
	
	var selector = document.getElementById("selector_model");
	
	if (selector.value == "logistic_regression"){
		var fitIntercept = events.checkedBoxes(document.getElementsByName("fit_intercept"));
	} else if (selector.value == "linear_regression"){
		var fitIntercept = events.checkedBoxes(document.getElementsByName("fit_intercept_lin"));
	}
	
	//var fitIntercept = events.checkedBoxes(document.getElementsByName("fit_intercept"));
	console.log(document.getElementsByName("fit_intercept"));
	var interceptScaling = JSON.stringify(document.getElementById("intercept_scaling").value);
	// var classWeight
	var randomState = JSON.stringify(document.getElementById("random_state").value);
	
	var solver = events.checkedVals(document.getElementsByName("solver"));
	
	var maxIter = JSON.stringify(document.getElementById("max_iter").value);
	var multiClass = events.checkedVals(document.getElementsByName("multi_class"));
	var verbose = JSON.stringify(document.getElementById("verbose").value);
	var warmStart = events.checkedBoxes(document.getElementsByName("warm_start"));	
	var nJobs = JSON.stringify(document.getElementById("n_jobs").value);
	var l1Ratio = JSON.stringify(document.getElementById("l1_ratio").value);	

    // Obtaining the button object for training
    var trainButton = document.getElementById("train_button");

    // Hiding the script download link and log area and showing the response area
    downloadArea.hidden = true;
    responseArea.hidden = false;
    logArea.hidden = true;

    // Changing the status message in the response area
    responseArea.innerText = "Training...";

    /* Setting an interval to continuously monitor training logs
		in order to update them on-screen as training progresses
		*/
    var interval = setInterval(events.readLog, 50, true);

    // Trying to parse CSV data and train TPOT
    try {
      papa.parse(file, {
        download: false,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          // Defining our JSON payload for POST
          var payload = JSON.stringify({
			penalty: penalty,
            data: JSON.stringify(results.data),
			model: model,
			experiment_id: experimentId,
			dual: dual,
			tol: tol,
			C: C,
			fit_intercept: fitIntercept,
			intercept_scaling: interceptScaling,
			random_state: randomState,
			solver: solver,
			max_iter: maxIter,
			multi_class: multiClass,
			verbose: verbose,
			warm_start: warmStart,
			n_jobs: nJobs,
			l1_ratio: l1Ratio
          });

          // Showing log area if verbosity isn't 0
          /*if (verbosity != 0) {
            logArea.hidden = false;
          }*/

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
            .then((data) => (responseArea.innerText = data.Output)) // Showing the success message defined in the Python API
            //.then(() => (downloadArea.hidden = false)) // Showing download link for the pipeline script
            .then(() => (trainButton.style.visibility = "visible")) // Making train button visible
            .then(() => clearInterval(interval)) // Clearing the interval that repeatedly checked logs
            .catch((error) => {
              console.error("Error", error);
            });
        },
      });
    } catch {
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
