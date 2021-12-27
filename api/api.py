#!/usr/bin/env python
# coding: utf-8

# In[1]:


# Importing dependencies
from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import mlflow
from sklearn import datasets
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.svm import SVC, SVR
from sklearn.model_selection import GridSearchCV, train_test_split
import pandas as pd
import numpy as np
import json


# In[2]:


mlflow.set_tracking_uri("./app/TPOT_web_app/mlruns")


# In[3]:


# Setting up a Flask application
app = Flask(import_name=__name__)
CORS(app)
api = Api(app=app)


# In[4]:


# Data arguments
data_parser = reqparse.RequestParser()
data_parser.add_argument(name="data", type=str,                         
                         help="Data to be used for training",
                         required=True)

data_parser.add_argument(name="model", type=str,
                         help="The type of model used in training",
                         required=True)

# Experiment argument
experiment_parser = reqparse.RequestParser()
experiment_parser.add_argument(name="experiment_name", type=str,
                               help="The ID of the experiment to log under",
                               required=True)

# Gridsearcha arguments
gridsearch_parser = reqparse.RequestParser()

"""gridsearch_parser.add_argument(name="scoring", type=str,
                              action="append",
                              help="Scoring functions to try")"""

gridsearch_parser.add_argument(name="n_jobs", type=str,
                               action="append",
                              help="Number of processes to run")

"""gridsearch_parser.add_argument(name="refit", type=bool)"""

gridsearch_parser.add_argument(name="cv", type=str,
                               action="append",
                              help="NUmber of cross-validation folds")

"""gridsearch_parser.add_argument(name="verbose_gridsearch", type=int,
                              help="Verbosity of the estimator")"""

"""gridsearch_parser.add_argument(name="pre_dispatch", type=int,
                              help="The number of jobs that get dispatched during parallel execution")"""

gridsearch_parser.add_argument(name="return_train_score", type=bool,
                              help="Whether to include training scores in results")

# MLflow classification arguments
classification_parser = reqparse.RequestParser()

classification_parser.add_argument(name="penalty", type=str,
                           action="append",
                           help="Regularization norm")

classification_parser.add_argument(name="dual", type=bool,
                           action="append",
                           help="Whether to use dual or primal formulation")

classification_parser.add_argument(name="tol", type=str,
                           action="append",
                           help="Tolerance for the stopping criteria")

classification_parser.add_argument(name="C", type=str,
                           action="append",
                           help="Regularization strength C")

classification_parser.add_argument(name="fit_intercept", type=bool,
                           action="append",
                           help="Whether a constant (bias or intercept) should be added to the decision function")

classification_parser.add_argument(name="intercept_scaling", type=str,
                           action="append",
                           help="Pending explanation")

## CLASS WEIGHT SHOULD BE HERE

classification_parser.add_argument(name="random_state", type=str,
                           action="append",
                           help="Seed for the random number generator")

classification_parser.add_argument(name="solver", type=str,
                           action="append",
                           help="The solver for logistic regression")

classification_parser.add_argument(name="max_iter", type=str,
                           action="append",
                           help="Maximum number of iterations")

classification_parser.add_argument(name="multi_class", type=str,
                           action="append",
                           help="Regularization norm")

"""classification_parser.add_argument(name="verbose", type=str,
                           action="append",
                           help="The verbosity of the optimizer")"""

classification_parser.add_argument(name="warm_start", type=bool,
                           action="append",
                           help="Whether or not to reuse populations from previous runs.")

"""classification_parser.add_argument(name="n_jobs", type=str,
                           action="append",
                           help="Number of CPU cores used")"""

classification_parser.add_argument(name="l1_ratio", type=str,
                           action="append",
                           help="The Elastic-Net mixing parameter")

# MLflow regression arguments
regression_parser = reqparse.RequestParser()

regression_parser.add_argument(name="fit_intercept", type=bool,
                           action="append",
                           help="Whether a constant (bias or intercept) should be added to the decision function")

regression_parser.add_argument(name="normalize", type=bool,
                           action="append",
                           help="Whether a constant (bias or intercept) should be added to the decision function")

regression_parser.add_argument(name="copy_X", type=bool,
                           action="append",
                           help="Whether a constant (bias or intercept) should be added to the decision function")

regression_parser.add_argument(name="positive", type=bool,
                           action="append",
                           help="Whether a constant (bias or intercept) should be added to the decision function")

"""regression_parser.add_argument(name="n_jobs", type=str,
                           action="append",
                           help="Number of CPU cores used")"""


# In[5]:


class TrackExperiment(Resource):
    def __init__(self):
        self.run_id = None
    
    def process_args(self, args, numeric_float_args=[], numeric_int_args=[], string_args=[]):
        
        for arg in numeric_float_args:
                args[arg] = json.loads(args[arg][0])
                print(args[arg])
                args[arg] = args[arg].split(",")  
                for i, value in enumerate(args[arg]):
                    if "None" in value:
                        args[arg][i] = None
                    else:
                        args[arg][i] = float(args[arg][i])


        for arg in numeric_int_args:
            args[arg] = json.loads(args[arg][0])
            print(args[arg])
            args[arg] = args[arg].split(",")
            for i, value in enumerate(args[arg]):
                if "None" in value:
                    args[arg][i] = None
                else:
                    args[arg][i] = int(args[arg][i])
        
        """for arg in string_args:
            args[arg] = json.loads(args[arg][0])
            print(args[arg])
            args[arg] = args[arg].split(",")
            for i, value in enumerate(args[arg]):
                if "None" in value:
                    args[arg] = None"""
            
        return args
    
    def train_gridsearch(self, estimator, data_args, config_args, gridsearch_args, experiment_args):
        #self.train_grid_search(estimator, args, experiment_args["experiment_name"])
        mlflow.set_experiment(experiment_name=experiment_args["experiment_name"])
        
        # Enabling automatic logging for scikit-learn runs
        mlflow.sklearn.autolog(max_tuning_runs=None)

        # Setting hyperparameter values to try                       
        grid_search = GridSearchCV(estimator=estimator, param_grid=config_args, **gridsearch_args)       
        
        # Reading and preprocessing the JSON dataset
        df = pd.io.json.read_json(data_args["data"])  
        
        features = df.drop(["target"], axis=1).to_numpy().astype(np.float64)
        labels = df["target"].to_numpy().astype(np.int32)
        
        # Starting a logging run
        with mlflow.start_run(run_name="CV_RUN") as run:            
            self.run_id = run.info.run_id
            print(self.run_id)
            # Fitting GridSearchCV
            grid_search.fit(X=features, y=labels)        

        # Disabling autologging
        mlflow.sklearn.autolog(disable=True)
        
        print(grid_search.get_params())       
                        
        
    def post(self):
        #client = mlflow.tracking.MlflowClient()
        data_args = data_parser.parse_args()
        experiment_args = experiment_parser.parse_args()
        
        gridsearch_args = gridsearch_parser.parse_args()
        
        #string_args = ["scoring"]
        numeric_int_args = ["cv", "n_jobs"]
        
        print(gridsearch_args)
        
        gridsearch_args = self.process_args(args=gridsearch_args,
                                            numeric_int_args=numeric_int_args)
        
        
        
        print(gridsearch_args)
        
        if data_args["model"] == "logistic_regression":
            estimator = LogisticRegression()
            config_args = classification_parser.parse_args()
            
            numeric_float_args = ["tol", "C", "intercept_scaling", "l1_ratio"]
        
            numeric_int_args = ["random_state", "max_iter"]

            print(config_args)   
            
            config_args = self.process_args(args=config_args, 
                                            numeric_float_args=numeric_float_args, 
                                            numeric_int_args=numeric_int_args)           
            
            print(config_args)
            
        elif data_args["model"] == "linear_regression":
            estimator = LinearRegression()
            config_args = regression_parser.parse_args()
            
            print(config_args)
            
            """numeric_int_args = ["n_jobs"]
            
            config_args = self.process_args(args=config_args, 
                                            numeric_int_args=numeric_int_args)"""
            
            print(config_args)
                
        gridsearch_args["cv"] = gridsearch_args["cv"][0]
        config_args["n_jobs"] = gridsearch_args["n_jobs"]
        gridsearch_args["n_jobs"] = gridsearch_args["n_jobs"][0]
                           
        
        print(config_args)   
    
        print(experiment_args)
        print(data_args["model"])
        
        
        self.train_gridsearch(estimator, data_args, config_args, gridsearch_args, experiment_args)
        
         # Returning the prediction
        return {"Output": "Training complete!"}, 200


# In[6]:


# Adding the endpoint to our app
api.add_resource(TrackExperiment, "/track-experiment")


# In[ ]:


# launching our app
if __name__ == "__main__":
    app.run()

