# Place for Database Logics

from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask,request,jsonify

app=Flask(__name__)


@app.route('/', methods=['POST'])
def register_user():
    # c=request.headers.get('clientid')
    s=request.headers.get('secreted')
    # username = request.form['username']
    # password = request.form['password']
    # HASH = "pbkdf2"
    
    try:
        # User(c, generate_password_hash(s)).save_to_db()
        enc_pwd=generate_password_hash(s, method='pbkdf2:sha256', salt_length=8)
        pwd=check_password_hash('pbkdf2:sha256',s)
    except Exception as e:
        return jsonify(
            {
            'error': 'An error occurred saving the user to the database',
            'str':str(e)
            }
            ), 500
    
    return jsonify({
        # 'message': 'User registered successfully',
        'enc_pwd':enc_pwd,
        'pwd':pwd
        }), 200

if __name__=="__main__":
    app.run(debug=True)