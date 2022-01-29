#!/usr/bin/env python
# coding: utf-8

# In[4]:


# Importing dependencies
from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import mlflow
from sklearn import datasets
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.model_selection import GridSearchCV
import pandas as pd
import numpy as np
import json
from parsers import data_parser, gridsearch_parser, classification_parser, regression_parser, deployment_parser, inference_parser


# In[5]:


# Setting our tracking URI
mlflow.set_tracking_uri(uri="static/mlruns")


# In[6]:


# Setting up a Flask application
app = Flask(import_name=__name__)
CORS(app)
api = Api(app=app)


# Class for endpoint track-experiment
class TrackExperiment(Resource):
    def post(self):
        """
        Handle POST requests to the endpoint.

        """

        # PARSING ARGUMENTS

        # Data arguments
        data_args = data_parser.parse_args()

        # Grid search arguments
        gridsearch_args = gridsearch_parser.parse_args()

        # INITIAL HANDLING OF GRID SEARCH NUMERIC ARGS
        # Setting the keys for numeric int args for grid search
        numeric_int_args = ["cv", "n_jobs"]

        # Processing numeric args for grid search
        gridsearch_args = self.process_numeric_args(args=gridsearch_args,
                                            numeric_int_args=numeric_int_args)

        # Checking which model type was submitted to the endpoint
        # LogisticRegression
        if data_args["model"] == "logistic_regression":
            # HANDLING LOGISTIC REGRESSION ARGS
            # Parsing LogisticRegression args
            config_args = classification_parser.parse_args()

            # Setting the keys for numeric float args
            numeric_float_args = ["tol", "C", "intercept_scaling", "l1_ratio"]

            # Setting the keys for numeric int args
            numeric_int_args = ["random_state", "max_iter"]

            # Processing numeric args for LogisticRegression
            config_args = self.process_numeric_args(args=config_args,
                                            numeric_float_args=numeric_float_args,
                                            numeric_int_args=numeric_int_args)

            # Instantiating LogisticRegression
            estimator = LogisticRegression()

        # LinearRegression
        elif data_args["model"] == "linear_regression":
            # HANDLING LINEAR REGRESSION ARGS
            # Parsing LinearRegression args
            config_args = regression_parser.parse_args()

            # Instantiating LinearRegression
            estimator = LinearRegression()


        # Getting the integer from the cv arg list
        gridsearch_args["cv"] = gridsearch_args["cv"][0]

        # Setting logistic/linear regression n_jobs equal to grid search n_jobs
        config_args["n_jobs"] = gridsearch_args["n_jobs"]

        # Getting the integer from the n_jobs arg list
        gridsearch_args["n_jobs"] = gridsearch_args["n_jobs"][0]

        # Training grid search and obtaining the
        # ID of the run under which the best estimator is stored.
        run_id = self.train_gridsearch(estimator=estimator,
                                       data=data_args["data"],
                                       config_args=config_args,
                                       gridsearch_args=gridsearch_args,
                                       experiment_name=data_args["experiment_name"])

        # Returning an OK message
        return {"Output": "Training complete!",
                "ID": run_id,
                "experiment_name": data_args["experiment_name"]}, 200

    def process_numeric_args(self,
                     args,
                     numeric_float_args=[],
                     numeric_int_args=[]):
        """
        Convert string arguments to their proper numeric form.

        1. Check if string is "None". Convert to Python None if true.
        2. Otherwise, convert the string to float or int.

        Parameters
        ----------
        args: Python dictionary
            The arguments passed to
            the endpoint

        numeric_float_args: Python list
            The names of the numeric arguments
            that must be converted to float.

        numeric_int_args: Python list
            The names of the numeric arguments
            that must be converted to int.

        Returns
        -------
        args: Python dictionary
            The arguments with processed numeric
            values.

        """

        # Processing float arguments
        for arg in numeric_float_args:
            # Parsing float arguments as a single string
            args[arg] = json.loads(s=args[arg][0])

            # Breaking the parsed string up into string numbers
            args[arg] = args[arg].split(sep=",")

            # Iterating over the string numbers
            for i, value in enumerate(args[arg]):
                # Checking if current string value is "None"
                if "None" in value:
                    # Assigning None to current string value if it is "None"
                    args[arg][i] = None
                else:
                    # Converting current string value to float if it is not "None"
                    args[arg][i] = float(args[arg][i])

        # Processing int arguments
        for arg in numeric_int_args:
            # Parsing int arguments as a single string
            args[arg] = json.loads(s=args[arg][0])

             # Breaking the parsed string up into string numbers
            args[arg] = args[arg].split(sep=",")

            # Iterating over the string numbers
            for i, value in enumerate(args[arg]):
                # Checking if current string value is "None"
                if "None" in value:
                     # Assigning None to current string value if it is "None"
                    args[arg][i] = None
                else:
                    # Converting current string value to integer if it is not "None"
                    args[arg][i] = int(args[arg][i])

        # Returning processed arguments
        return args

    def train_gridsearch(self,
                         estimator,
                         data,
                         config_args,
                         gridsearch_args,
                         experiment_name):
        """
        Run the scikit-learn grid search algorithm on estimator.
        Return the run ID of the best estimator trained.

        Parameters
        ---------
        estimator: a scikit-learn estimator
            The estimator to run parameter search on.

        data: JSON string
            JSON string representation of
            the training data.

        config_args: Python dictionary
            The hyperparameters for estimator

        gridsearch_args: Python dictionary
            The hyperparameters for the scikit-learn
            grid search algorithm.

        experiment_name: Python string
            The name of the experiment to
            log the run under.

        Returns
        ------

        run_id: Python string
            The ID of the run that the best
            estimator was logged under.

        """

        # Setting current experiment
        mlflow.set_experiment(experiment_name=experiment_name)

        # Enabling automatic MLflow logging for scikit-learn runs
        mlflow.sklearn.autolog(max_tuning_runs=None)

        # Instantiating scikit-learn's grid search algorithm with parsed hyperparameters
        grid_search = GridSearchCV(estimator=estimator,
                                   param_grid=config_args,
                                   **gridsearch_args)

        # Parsing the JSON dataset into a pandas DataFrame
        df = pd.io.json.read_json(path_or_buf=data)

        # Processing features and labels in the DataFrame dataset
        features = df.drop(["target"], axis=1).to_numpy().astype(np.float64)
        labels = df["target"].to_numpy().astype(np.int32)

        # Starting a logging run
        with mlflow.start_run(run_name="CV_RUN") as run:
            # Obtaining the ID of the parent run. This run will store the best estimator
            run_id = run.info.run_id

            # Fitting GridSearchCV
            grid_search.fit(X=features,
                            y=labels)

        # Disabling autologging
        mlflow.sklearn.autolog(disable=True)

        # Returning the run ID of the parent run
        return run_id


# In[14]:


# Class for endpoint deploy-model
class DeployModel(Resource):
    def get(self):
        """
        Handle GET requests.
        """

        # Parsing ID arguments
        deployment_args = deployment_parser.parse_args()

        # Setting the experiment and obtaining its ID
        mlflow.set_experiment(experiment_name=deployment_args["experiment_name_inference"])
        experiment_id = mlflow.get_experiment_by_name(name=deployment_args["experiment_name_inference"]).experiment_id
        print(experiment_id)
        print(deployment_args['run_id'])
        # Loading the model under the current experiment and under the specified ID and saving it in the app's config file
        app.config['model'] = mlflow.pyfunc.load_model(model_uri=f"static/mlruns/{experiment_id}/{deployment_args['run_id']}/artifacts/best_estimator")

        # Returning an OK message
        return {"Output": "Model Deployed!"}, 200

    def post(self):
        """
        Handle POST requests.
        """

        # Parsing inference arguments
        inference_args = inference_parser.parse_args()

        # Parsing the JSON dataset into a pandas DataFrame
        df = pd.io.json.read_json(path_or_buf=inference_args["data_inference"])

        # Running inference on the model and saving the predictions
        pd.DataFrame(data=app.config['model'].predict(df)).to_csv(f'static/{inference_args["prediction_file_name"]}')

        # Returning an OK message
        return {"Output": "Inference Complete!", "prediction_file_name": inference_args["prediction_file_name"]}, 200


# In[15]:


# Adding the endpoints to our app
api.add_resource(TrackExperiment, "/track-experiment")
api.add_resource(DeployModel, "/deploy-model")


# In[16]:


# launching our app
if __name__ == "__main__":
    app.run()


# In[ ]:




