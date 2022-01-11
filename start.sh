pip install -r api/requirements.txt
python api/mlflow_api.py &
cd app/MLflow_web_app
mlflow ui -p $1 &
npx http-server ./ --cors -c-1 -s &
start http://localhost:$1/
npm install papaparse
npx yarn install
npx yarn start
if [ -d $"mlruns" ]; then rm -r mlruns; fi
rm predictions/*.csv
npx kill-port 3000
npx kill-port 4000
npx kill-port 5000
npx kill-port 8080