#!/usr/bin/env python
# coding: utf-8

# In[1]:


# Importing dependencies
from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import mlflow
from sklearn import datasets
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.model_selection import GridSearchCV, train_test_split
import pandas as pd
import numpy as np


# In[2]:


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

# MLflow arguments
config_parser = reqparse.RequestParser()
config_parser.add_argument(name="C", type=int,
                           default=[1.0],
                           action="append",
                           help="Regularization strength C")

config_parser.add_argument(name="kernel", type=str,
                           action="append",
                           default=["rbf"],
                           help="Penalty norm")

config_parser.add_argument(name="degree", type=int,
                           default=[3],
                           action="append",
                           help="Degree for the poly kernel")


# In[5]:


class TrackExperiment(Resource):
    def post(self):
        data_args = data_parser.parse_args()
        config_args = config_parser.parse_args()
        
        # Loading data
        """data = datasets.load_breast_cancer()

        # Splitting the data into train and test sets
        X_train, X_test, y_train, y_test = train_test_split(data.data, 
                                                            data.target,
                                                            stratify=data.target)"""
    
        print(config_args)
    
        # Starting a tracking run
        """with mlflow.start_run(run_name="PARENT_RUN"):
            # For each value of C, running a child run
            for key, params in config_args.items():
                for param in params:
                    args = {key: param}
                    with mlflow.start_run(run_name="CHILD_RUN", nested=True):
                        # Instantiating and fitting the model
                        model = LogisticRegression(**args)       
                        model.fit(X=X_train, y=y_train)

                        # Logging the current value of C
                        mlflow.log_param(key=key, value=param)

                        # Logging the test performance of the current model                
                        mlflow.log_metric(key="Score", value=model.score(X_test, y_test)) 

                        # Saving the model as an artifact
                        mlflow.sklearn.log_model(sk_model=model, artifact_path="model")"""
        
        # Enabling automatic logging for scikit-learn runs
        mlflow.sklearn.autolog(max_tuning_runs=5)

        # Setting hyperparameter values to try       

        # Instantiating LogisticRegression and GridSearchCV
        estimator = SVC()
        grid_search = GridSearchCV(estimator=estimator, param_grid=config_args, n_jobs=-1)       
        
        # Reading and preprocessing the JSON dataset
        df = pd.io.json.read_json(data_args["data"])  
        
        features = df.drop(["target"], axis=1).to_numpy().astype(np.float64)
        labels = df["target"].to_numpy().astype(np.int32)
        
        # Starting a logging run
        with mlflow.start_run() as run:
            # Fitting GridSearchCV
            grid_search.fit(X=features, y=labels)

        # Disabling autologging
        mlflow.sklearn.autolog(disable=True)
        
        print(grid_search.get_params())


# In[6]:


# Adding the endpoint to our app
api.add_resource(TrackExperiment, "/track-experiment")


# In[ ]:


# launching our app
if __name__ == "__main__":
    app.run()


# In[ ]:




