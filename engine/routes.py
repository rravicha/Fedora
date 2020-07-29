from engine import app
from flask import jsonify,request
from engine.forms import Compute


@app.route("/", methods=['POST'])
@app.route("/home", methods=['POST'])
def home():
    try:
        if request.is_json:
            comp=Compute(request.get_json())
            res,msg=comp.validate()
            if res:
                response=comp.calculate()
                return jsonify(response)
            else:
                return jsonify(msg)
        else:
            return 'Incorrect json format',400
    except Exception as e:
        # es=f'exception occured  --> {e}'
        return(str(e))
