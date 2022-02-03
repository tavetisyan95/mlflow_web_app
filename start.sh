pip install -r api/requirements.txt
cd app/MLflow_web_app
npx http-server ./ --cors -c-1 -s &
npm install papaparse
npx yarn install
npx yarn start
if [ -d $"mlruns" ]; then rm -r mlruns; fi
npx kill-port 3000 