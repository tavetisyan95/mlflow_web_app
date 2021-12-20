pip install -r api/requirements.txt
cd app/TPOT_web_app
npx http-server ./ --cors -c-1 -s &
npm install papaparse
npx yarn install
npx yarn start
npx kill-port 3000