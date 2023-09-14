#1.鯖を立てる
from flask import Flask, request ,jsonify
from flask_cors import CORS

import time #待機時間

#2.フロントからユーザーの入力を受け取る
from reciveInput import get_user_input

#3.APIを叩いて、jsonファイルを出力する
from getapi import get_recipe

#4.jsonファイルを送る
from sendJson import send_recipe



app = Flask(__name__)
CORS(app)

@app.route('/sendData', methods=['POST'])
def handle_request():
    
    food, genre = get_user_input(request)
    get_recipe(food, genre)
    time.sleep(10)
    file = send_recipe()
    return file

if __name__ == '__main__':
    app.run()