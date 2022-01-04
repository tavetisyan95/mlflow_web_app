# Importing dependencies
from flask_restful import reqparse

# Data arguments
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



# Scikit-learn gridsearch arguments
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



# Scikit-learn LogisticRegression arguments
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

# Argument for early stopping tolerance
classification_parser.add_argument(name="tol", type=str,
                           action="append",
                           help="Tolerance for the stopping criteria")

# Argument for regularization parameter C
classification_parser.add_argument(name="C", type=str,
                           action="append",
                           help="Regularization strength C")

classification_parser.add_argument(name="fit_intercept", type=bool,
                           action="append",
                           help="Whether a constant (bias or intercept) should be added to the decision function")

classification_parser.add_argument(name="intercept_scaling", type=str,
                           action="append",
                           help="Pending explanation")

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

classification_parser.add_argument(name="warm_start", type=bool,
                           action="append",
                           help="Whether or not to reuse populations from previous runs.")

classification_parser.add_argument(name="l1_ratio", type=str,
                           action="append",
                           help="The Elastic-Net mixing parameter")



# Scikit-learn LinearRegression arguments
# Instantiating a request parser object
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



# Arguments for inference
# Instantiating a request parser object
inference_parser = reqparse.RequestParser()
inference_parser.add_argument(name="data", type=str,                         
                         help="Data to be used for inference",
                         required=True)
inference_parser.add_argument(name="prediction_name", type=str,                         
                         help="The file to save predictions to",
                         required=True)




id_parser = reqparse.RequestParser()
id_parser.add_argument(name="run_id", type=str,
                       help="ID of the model that should be used for inference",
                       required=True)

id_parser.add_argument(name="experiment_name_inference", type=str,
                       help="The name of the experiment where the inference model is located",
                       required=True)