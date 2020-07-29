## Python Back-End Flask API

## How to run this app on your local:
1) Clone this repository & Go to `flask-api` directory and type on your console `python3 run.py`
2) pip install -r requirements.txt
3) Run the below command in terminal
curl -X POST -H 'Content-Type: application/json' \
-d '{"ply":"bot","dim":"3,222","pp":"122,1","tp":"222,1","dist":"555"}' \
        https://flaska891ce0f.azurewebsites.net/


# Live
https://flaska891ce0f.azurewebsites.net

## Project Environment Notes:
This project is based on latest Python Version 3.7.4
If you have any issues trying to run this app ,Please check python and Flask version
This app will work in both Linux & Windows Environment.

## Debug Mode
## Edit the run.py file  and append the below lines to switch to debug mode

app.debug=True

