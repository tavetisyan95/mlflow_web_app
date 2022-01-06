# Importing dependencies
from flask_restful import reqparse

# DATA ARGUMENTS

# Instantiating a request parser object
data_parser = reqparse.RequestParser()

# Argument for training data
data_parser.add_argument(name="data", type=str,                         
                         help="Data to be used for training",
                         required=True)

# Argument for estimator type
data_parser.add_argument(name="model", type=str,
                         help="The type of model used in training",
                         required=True)

# Argument for the experiment name
data_parser.add_argument(name="experiment_name", type=str,
                         help="The name of the experiment to log runs under",
                         required=True)


# SCIKIT-LEARN GRID SEARCH ARGUMENTS

# Instantiating a request parser object
gridsearch_parser = reqparse.RequestParser()

# Argument for n_jobs
gridsearch_parser.add_argument(name="n_jobs", type=str,
                               action="append",
                               help="Number of processes to run")

# Argument for cv
gridsearch_parser.add_argument(name="cv", type=str,
                               action="append",
                               help="Number of cross-validation folds")

# Argument for return_train_score
gridsearch_parser.add_argument(name="return_train_score", type=bool,
                               help="Whether to include training scores in results")


# SCIKIT-LEARN LOGISTIC REGRESSION ARGUMENTS

# Instantiating a request parser object
classification_parser = reqparse.RequestParser()

# Argument for penalty term
classification_parser.add_argument(name="penalty", type=str,
                                   action="append",
                                   help="Regularization norm")

# Argument for dual
classification_parser.add_argument(name="dual", type=bool,
                                   action="append",
                                   help="Whether to use dual or primal formulation")

# Argument for tol
classification_parser.add_argument(name="tol", type=str,
                                   action="append",
                                   help="Tolerance for the stopping criteria")

# Argument for regularization parameter C
classification_parser.add_argument(name="C", type=str,
                                   action="append",
                                   help="Regularization strength C")

# Argument for fit_intercept
classification_parser.add_argument(name="fit_intercept", type=bool,
                                   action="append",
                                   help="Whether a constant (bias or intercept) should be added to the decision function")

# Argument for intercept_scaling
classification_parser.add_argument(name="intercept_scaling", type=str,
                                   action="append",
                                   help="If solver liblinear is used and fit_intercept is set to True," 
                                   "a synthetic feature that is appended to the instance vector")

# Argument for random_state
classification_parser.add_argument(name="random_state", type=str,
                                   action="append",
                                   help="Seed for the random number generator. Used for solvers saga, sag, or liblinear")

# Argument for solver
classification_parser.add_argument(name="solver", type=str,
                                   action="append",
                                   help="The solver for logistic regression")

# Argument for max_iter
classification_parser.add_argument(name="max_iter", type=str,
                                   action="append",
                                   help="Maximum number of iterations")

# Argument for multi_class
classification_parser.add_argument(name="multi_class", type=str,
                                   action="append",
                                   help="Whether the problem should be handled as binary or multi-class")

# Argument for warm_start
classification_parser.add_argument(name="warm_start", type=bool,
                                   action="append",
                                   help="Whether or not to reuse populations from previous runs.")

# Argument for l1_ratio
classification_parser.add_argument(name="l1_ratio", type=str,
                                   action="append",
                                   help="The Elastic-Net mixing parameter")


# SCIKIT-LEARN LINEAR REGRESSION ARGUMENTS

# Instantiating a request parser object
regression_parser = reqparse.RequestParser()

# Argument for fit_intercept
regression_parser.add_argument(name="fit_intercept", type=bool,
                               action="append",
                               help="Whether to calculate the intercept for the model.")

# Argument for normalize
regression_parser.add_argument(name="normalize", type=bool,
                               action="append",
                               help="When fit_intercept is True, the regressors X will be normalized before regression"
                               "by subtracting the mean and dividing by the l2-norm")

# Argument for copy_X
regression_parser.add_argument(name="copy_X", type=bool,
                               action="append",
                               help="If True, X will be copied; else, it may be overwritten.")

# Argument for positive
regression_parser.add_argument(name="positive", type=bool,
                               action="append",
                               help="When set to True, forces the coefficients to be positive")


# ARGUMENTS FOR MODEL DEPLOYMENT

# Instantiating a request parser object
deployment_parser = reqparse.RequestParser()

# Argument for the run ID
deployment_parser.add_argument(name="run_id", type=str,
                               help="ID of the model that should be used for inference",
                               required=True)

# Argument for the experiment name (for inference)
deployment_parser.add_argument(name="experiment_name_inference", type=str,
                               help="The name of the experiment where the inference model is located",
                               required=True)


# ARGUMENTS FOR INFERENCE

# Instantiating a request parser object
inference_parser = reqparse.RequestParser()

# Argument for inference data
inference_parser.add_argument(name="data_inference", type=str,                                          
                              help="Data to be used for inference",
                              required=True)

# Argument for the name of the file that predictions will be saved to
inference_parser.add_argument(name="prediction_file_name", type=str,                         
                              help="The file to save predictions to",
                              required=True)