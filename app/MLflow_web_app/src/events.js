import { config } from "./config.js";
import papa from "papaparse";
import axios from "axios";

// Variable for a UI box that will display the names of existing CSV files
// that contain predictions
var fileArea;

export const events = {
  // Function for loading global UI elements
  
  
  uploadFiles: function()
  {
	  var file = document.getElementById("model_arch").files[0];
	  /*const formData = new FormData();
	  formData.append('model_weights', file);
	  
	  axios.defaults.headers.post['Content-Type'] = "application/json";
	  
	  axios.post("http://localhost:5000/post/", formData)
	  .then(res => res.json())
	  .then(res => console.log(res))
	  .catch(function (error) {
		  console.log(error.response);
	  });*/
	  
	  
	  const formData = new FormData();
	  formData.append('item', file);
	  
	  axios.defaults.headers.post['Content-Type'] = "application/json";
	  
	  console.log(formData);
	  
	  axios.post("http://localhost:5000/post_test/", formData)
	  .then(res => res.json())
	  .then(res => console.log(res))
	  .catch(function (error) {
		  console.log(error.response);
	  });
	  
  },
  loadUI: async function () {
    // Waiting for 1 second to allow UI elements to load
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(1000);

    //Assigning values to the variables instantiated at the top of the script.
    //The variables will be available to other functions in the script.
    fileArea = document.getElementById("prediction_file_names");

    // Reading prediction file names
    events.readSavedData();
  },
  // Function for getting and displaying existing files with predictions,
  // Existing experiments,
  // and existing run IDs
  readSavedData: async function (training = false, noScript = false) {
    // Getting the UI box where the prediction file names will be displayed

    // HANDLING EXISTING FILE NAMES

    // Checking	if prediction file names exist
    if (sessionStorage.getItem("prediction_file_names") !== null) {
      // Getting prediction file names, if they exist
      var predictionFileNames = JSON.parse(
        sessionStorage.getItem("prediction_file_names")
      );

      // Iterating over existing file names and displaying them
      for (var i = 0; i < predictionFileNames.length; i++) {
        // Adding the current file name to the UI box for file names
        events.addFileName(predictionFileNames[i]);
      }
    }

    // HANDLING EXISTING EXPERIMENT NAMES

    // Checking if any experiments exist
    if (sessionStorage.getItem("experiment_names") !== null) {
      // Getting experiment names, if they exist
      var experimentNames = JSON.parse(
        sessionStorage.getItem("experiment_names")
      );

      // Getting the experiment select object
      var experimentSelector = document.getElementById("selector_experiment");

      // Iterating over existing experiment names
      for (var i = 0; i < experimentNames.length; i++) {
        // Adding the current experiment name to the select object
        experimentSelector.add(
          new Option(experimentNames[i], experimentNames[i])
        );
      }

      // Getting the run ID select object
      var idSelector = document.getElementById("selector_id");

      // Getting the run IDs for the first saved experiment.
      // We do this because this is the experiment that
      // is shown in the app upon launch/refresh
      var runIDs = JSON.parse(sessionStorage.getItem(experimentNames[0]));

      // Iterating over the run IDs for the first saved experiment
      for (var i = 0; i < runIDs.length; i++) {
        // Adding the current run ID to the run ID select object
        idSelector.add(new Option(runIDs[i], runIDs[i]));
      }
    }
  },
  addFileName: function (fileName) {
    // Creating a new HTML paragraph
    var para = document.createElement("p");

    // Creating a new HTML a element for a hyperlink
    var url = document.createElement("a");

    // Assigning the URL of the current file with predictions
    //url.href = "http://localhost:8080/predictions/" + fileName;

    url.href = `http://${config.api_url}:${config.api_port}/static/${fileName}`;

    // Displaying the name of the prediction file
    url.innerText = fileName;

    // Appending the prediction file name with the URL to our paragraph
    para.appendChild(url);

    // Appending the paragraph to the file name box
    fileArea.appendChild(para);
  },
  // Function for updating run ID selector after training
  updateIDSelector: function () {
    // Getting selector objects for
    // run IDs and experiments
    var selectorID = document.getElementById("selector_id");
    var selectorExperiment = document.getElementById("selector_experiment");

    // Obtaining the run IDs under the selected experiment
    var runIDs = JSON.parse(sessionStorage.getItem(selectorExperiment.value));

    // Emptying the HTML contents of the run ID selector
    selectorID.innerHTML = "";

    // Inserting existing run IDs into the selector
    for (var i = 0; i < runIDs.length; i++) {
      selectorID.add(new Option(runIDs[i], runIDs[i]));
    }
  },
  // Function for getting the VALUES of selected checkboxes
  getCheckedCheckboxVals: function (checkboxes) {
    // Creating variable to store checkbox values
    var checkedVals = [];

    // Iterating over provided checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        // For each checked checkbox,
        // add its value to checkedVals
        checkedVals.push(checkboxes[i].value);
      }
    }

    return checkedVals;
  },
  // Function for getting the STATES (true or false) of selected checkboxes
  getCheckedCheckboxStates: function (checkboxes) {
    // Creating variable to store checkbox states
    var checkedStates = [];

    // Iterating over provided checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        // For each checked checkbox,
        // check if its value is equal to "True"
        // and add the results to checkedStates
        checkedStates.push(checkboxes[i].value == "True");
      }
    }

    return checkedStates;
  },
  // Function for handling params for grid search cv training
  handleParams: function () {
    // Getting the provided CSV dataset
    var file = document.getElementById("data").files[0];

    // Getting the name of the selected model
    var selectedModel = document.getElementById("selector_model").value;

    // Getting the entered experiment name
    var experimentName = document.getElementById("experiment_name").value;

    // Getting the value for the hyperparameter n_jobs
    var nJobs = JSON.stringify(document.getElementById("n_jobs").value);

    // Getting the value for the hyperparameter cv
    var cv = JSON.stringify(document.getElementById("cv").value);

    // Checking if the checkbox for the hyperparameter
    // return_train_score is checked
    var return_train_score =
      document.getElementById("return_train_score").checked;

    // Creating a dictionary with grid search hyperparameters
    var gridSearchParams = {
      n_jobs: nJobs,
      cv: cv,
      return_train_score: return_train_score,
    };

    // Calling the corresponding training function based
    // on the selected model
    if (selectedModel == "logistic_regression") {
      // Trainging logistic regression
      events.handleLogisticRegression(
        file,
        gridSearchParams,
        selectedModel,
        experimentName
      );
    } else if (selectedModel == "linear_regression") {
      // Trainging linear regression
      events.handleLinearRegression(
        file,
        gridSearchParams,
        selectedModel,
        experimentName
      );
    }
  },
  // Function for handling logistic regression params
  handleLogisticRegression: function (
    file,
    gridSearchParams,
    model,
    experimentName
  ) {
    // HANDLING LOGISTIC REGRESSION HYPERPARAMETERS

    // Getting the VALUES of checked checkboxes for the hyperparameter penalty
    var penalty = events.getCheckedCheckboxVals(
      document.getElementsByName("penalty")
    );

    // Getting the STATE of checked checkboxes for the hyperparameter dual
    var dual = events.getCheckedCheckboxStates(
      document.getElementsByName("dual")
    );

    // Getting the values for the hyperparameter tol
    var tol = JSON.stringify(document.getElementById("tol").value);

    // Getting the values for the hyperparameter C
    var C = JSON.stringify(document.getElementById("C").value);

    // Getting the STATE of checked checkboxes for the hyperparameter fit_intercept
    var fitIntercept = events.getCheckedCheckboxStates(
      document.getElementsByName("fit_intercept")
    );

    // Getting the values for the hyperparameter intercept_scaling
    var interceptScaling = JSON.stringify(
      document.getElementById("intercept_scaling").value
    );

    // Getting the value for the hyperparameter random_state
    var randomState = JSON.stringify(
      document.getElementById("random_state").value
    );

    // Getting the VALUES of checked checkboxes for the hyperparameter solver
    var solver = events.getCheckedCheckboxVals(
      document.getElementsByName("solver")
    );

    // Getting the values for the hyperparameter max_iter
    var maxIter = JSON.stringify(document.getElementById("max_iter").value);

    // Getting the VALUES of checked checkboxes for the hyperparameter multi_class
    var multiClass = events.getCheckedCheckboxVals(
      document.getElementsByName("multi_class")
    );

    // Getting the STATE of checked checkboxes for the hyperparameter warm_start
    var warmStart = events.getCheckedCheckboxStates(
      document.getElementsByName("warm_start")
    );

    // Getting the values for the hyperparameter l1_ratio
    var l1Ratio = JSON.stringify(document.getElementById("l1_ratio").value);

    // Send all parameters and hyperparameters to the grid search train function
    events.trainGridSearch(
      file,
      {
        penalty: penalty,
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
        warm_start: warmStart,
        l1_ratio: l1Ratio,
      },
      gridSearchParams
    );
  },
  // Function for handling linear regression params
  handleLinearRegression: function (
    file,
    gridSearchParams,
    model,
    experimentName
  ) {
    // HANDLING LINEAR REGRESSION HYPERPARAMETERS

    // Getting the STATE of checked checkboxes for hyperparameters
    // fit_intercept, normalize, copyX, and positive
    var fitIntercept = events.getCheckedCheckboxStates(
      document.getElementsByName("fit_intercept_lin")
    );
    var normalize = events.getCheckedCheckboxStates(
      document.getElementsByName("normalize")
    );
    var copyX = events.getCheckedCheckboxStates(
      document.getElementsByName("copy_X")
    );
    var positive = events.getCheckedCheckboxStates(
      document.getElementsByName("positive")
    );

    // Send all parameters and hyperparameters to the grid search train function
    events.trainGridSearch(
      file,
      {
        fit_intercept: fitIntercept,
        model: model,
        experiment_name: experimentName,
        normalize: normalize,
        copy_X: copyX,
        positive: positive,
      },
      gridSearchParams
    );
  },
  // Function for training grid search
  trainGridSearch: function () {
    // Creating a variable to hold our payload
    var payload = {};

    // Adding ESTIMATOR HYPERPARAMETERS to the payload.
    // Because estimator hyperparameters are passed SECOND,
    // they are located at arguments[1]
    for (var key in arguments[1]) {
      payload[key] = arguments[1][key];
    }

    // Adding GRID SEARCH HYPERPARAMETERS to the payload.
    // Because estimator hyperparameters are passed THIRD,
    // they are located at arguments[2]
    for (var key in arguments[2]) {
      payload[key] = arguments[2][key];
    }

    // Getting the object for the training button
    var trainButton = document.getElementById("train_button");

    // Getting the object for the run ID selector (necessary for inference)
    var idSelector = document.getElementById("selector_id");

    // Getting the object for the experiment selector (necessary for inference)
    var experimentSelector = document.getElementById("selector_experiment");

    // Getting the response area for training
    var responseAreaTraining = document.getElementById("response");

    // Changing the status message in the response area
    // to indicate that training is in process
    responseAreaTraining.innerText = "Training...";

    // Trying to perform training
    try {
      // Converting the training dataset to JSON
      papa.parse(arguments[0], {
        download: false,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          // Adding the JSON dataset to our payload
          payload.data = JSON.stringify(results.data);

          // JSONifying our payload
          payload = JSON.stringify(payload);

          // Hiding train button so that the user
          trainButton.style.visibility = "hidden";

          // Sending a POST request to our Python API
          fetch(
            "http://" +
              config.api_url +
              ":" +
              config.api_port +
              "/" +
              config.api_training_endpoint,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: payload,
            }
          )
            .then((response) => response.json()) // Obtaining the response from the API
            .then((response) => {
              // Displaying the success message for inference
              responseAreaTraining.innerText = response.Output;

              // Checking if the name of the current experiment exists in sessionStorage
              if (sessionStorage.getItem(response.experiment_name) == null) {
                // Adding the parent run ID under the current experiment name,
                // if the experiment doesn't exist
                sessionStorage.setItem(
                  response.experiment_name,
                  JSON.stringify([response.ID])
                );
              } else {
                // Getting existing run IDs under the current experiment, if the experiment exists
                var runIDs = JSON.parse(
                  sessionStorage.getItem(response.experiment_name)
                );

                // Adding the current run ID to existing IDs
                runIDs.push(response.ID);

                // Saving the updated run IDs
                sessionStorage.setItem(
                  response.experiment_name,
                  JSON.stringify(runIDs)
                );
              }

              // Checking if the current experiment name exists in sessionStorage
              if (sessionStorage.getItem("experiment_names") == null) {
                // Saving the experiment name, if it doesn't exist
                sessionStorage.setItem(
                  "experiment_names",
                  JSON.stringify([response.experiment_name])
                );

                // Adding the experiment name to the experiment selector (necessary for inference)
                experimentSelector.add(new Option(response.experiment_name));
              } else {
                // Getting existing experiment names, if they do exist
                var experimentNames = JSON.parse(
                  sessionStorage.getItem("experiment_names")
                );

                // Checking if the current experiment name already exists
                if (!experimentNames.includes(response.experiment_name)) {
                  // Adding the experiment name to existing names,
                  // if the current name doesn't exist
                  experimentNames.push(response.experiment_name);

                  // Adding the experiment name to the experiment selector (necessary for inference)
                  experimentSelector.add(new Option(response.experiment_name));

                  // Saving the updated experiment names
                  sessionStorage.setItem(
                    "experiment_names",
                    JSON.stringify(experimentNames)
                  );
                }
              }

              // Checking if the currently selected experiment in the prediction UI is
              // the same as the experiment that this run was logged to
              if (experimentSelector.value == response.experiment_name) {
                // Adding the parent run ID to the ID selector (necessary for inference)
                idSelector.add(new Option(response.ID, response.ID));
              }
            })
            .then(() => (trainButton.style.visibility = "visible")) // Making train button visible
            // Handling HTTP request errors
            .catch((error) => {
              console.error("Error", error);
            });
        },
      });
    } catch {
      // Updating the training response message if papa.parse fails because a CSV dataset was not selected
      responseAreaTraining.innerText =
        "Dataset not selected. Please select a dataset for tuning.";
    }
  },

  // Function for deploying trained models
  deployModel: function () {
    // Obtaining the run ID selected for inference
    var runID = document.getElementById("selector_id").value;
    // Obtaining the name of the experiment selected for inference
    var experimentNameInference = document.getElementById(
      "selector_experiment"
    ).value;

    // Obtaining the response area for inference
    var responseAreaInference = document.getElementById("response_inference");

    // Sending a GET request to deploy the model under the
    // selected experiment and run ID
    fetch(
      "http://" +
        config.api_url +
        ":" +
        config.api_port +
        "/" +
        config.api_inference_endpoint +
        "?run_id=" +
        encodeURI(runID) +
        "&experiment_name_inference=" +
        encodeURI(experimentNameInference)
    )
      .then((response) => response.json())
      .then((response) => {
        responseAreaInference.innerText = response.Output;
      });
  },
  // Function for running inference
  predict: function () {
    // Obtaining the file with features for prediction
    var file = document.getElementById("prediction_data").files[0];

    // Obtaining the name for the file that predictions will be saved to
    var predictionFileName = document.getElementById("prediction_name").value;

    // Obtaining the response area for inference
    var responseAreaInference = document.getElementById("response_inference");

    // Changing the response area text to indicate
    // that inference is running
    responseAreaInference.innerText = "Running inference...";

    // Trying to perform inference
    try {
      // Converting the inference dataset to JSON
      papa.parse(file, {
        download: false,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          // Creating payload with the data and to send with a POST request
          var payload = JSON.stringify({
            data_inference: JSON.stringify(results.data),
            prediction_file_name: predictionFileName,
          });

          // Sending a POST request for inference
          fetch(
            "http://" +
              config.api_url +
              ":" +
              config.api_port +
              "/" +
              config.api_inference_endpoint,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: payload,
            }
          )
            .then((response) => response.json()) // Obtaining the response from the API
            .then((response) => {
              // Displaying the success message for inference
              responseAreaInference.innerText = response.Output;

              // HANDLING THE UI BOX THAT CONTAINS THE FILE NAMES WITH PREDICTIONS

              // Checking if prediction file names exist
              if (sessionStorage.getItem("prediction_file_names") == null) {
                // If prediction file names don't exist, getting the file
                // name that was returned with the request and save it
                sessionStorage.setItem(
                  "prediction_file_names",
                  JSON.stringify([response.prediction_file_name])
                );

                // Adding the file name to the UI box for file names
                events.addFileName(response.prediction_file_name);
              } else {
                // If prediction names exist, getting and parsing them
                var predictionFileNames = JSON.parse(
                  sessionStorage.getItem("prediction_file_names")
                );

                // Checking if the name of the current prediction file already exists
                if (
                  !predictionFileNames.includes(response.prediction_file_name)
                ) {
                  // Saving and adding the prediction file name to the
                  // file area if the file name doesn't exist

                  // Adding the file name to the UI box for file names
                  events.addFileName(response.prediction_file_name);

                  // Adding the file name to our existing list of file names
                  predictionFileNames.push(response.prediction_file_name);

                  // Saving the updated file names in local storage
                  sessionStorage.setItem(
                    "prediction_file_names",
                    JSON.stringify(predictionFileNames)
                  );
                }
              }
            })
            // Handling HTTP request errors
            .catch((error) => {
              console.error("Error", error);
            });
        },
      });
    } catch {
      // Updating the inference response message if papa.parse fails because a CSV dataset was not selected
      responseAreaInference.innerText =
        "Dataset not selected. Please select a dataset for tuning.";
    }
  },
  /*
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
  }*/
};
