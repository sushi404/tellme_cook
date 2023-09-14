from flask import Flask, jsonify, send_file

app = Flask(__name__)

@app.route('/getJsonData', methods=['GET'])
def send_recipe():
    # JSONファイルのパスを指定
    json_file_path = 'recipe.json'
    
    # ファイルを送信
    return send_file(json_file_path, as_attachment=True)
