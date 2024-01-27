from flask import Flask, Response, render_template, send_from_directory, request, jsonify
from styleSystem import preprocessor
from api import LocalGPT
from dataBase import chats

# global variables
DEFAULT = None
DataBase = chats()

# flask variables
app = Flask(__name__)

# site routes
@app.route('/')
def home():    
    return render_template('newchat.html', title=DEFAULT, chatHistory=DataBase.getChatHistory())

@app.route('/api/generate', methods=['POST'])
def generate_text():
    prompt = request.get_json()['prompt']
    chat_id = request.get_json().get('chat_id')
    return Response(LocalGPT(prompt, chat_id, DataBase), content_type='text/event-stream')
@app.route('/api/delete', methods=['POST'])
def delete_chat():
    data = request.get_json()
    DataBase.deleteChat(data['chat_id'])
    response = {'status': 'success', 'message': 'Data received successfully'}
    return jsonify(response)
@app.route('/api/deleteALL', methods=['POST'])
def delete_chatALL():
    # data = request.get_json()
    DataBase.deleteAll()
    response = {'status': 'success', 'message': 'Data received successfully'}
    return jsonify(response)

@app.route('/api/newChat', methods=['POST'])
def addNewChat():
    data = request.get_json()
    ID = DataBase.newChatID
    response = {'status': 'success', 'message': 'Data received successfully', 'ID': ID}
    return jsonify(response)

# @app.route('/api/appendChat', methods=['POST'])
# def appendChat():
#     data = request.get_json()
#     DataBase.addChat(data['chat_id'], data['prompt'], data['response'])
#     response = {'status': 'success', 'message': 'Data received successfully'}
#     return jsonify(response)



@app.route('/c/<chat_id>')
def chat(chat_id):
    
    chatData = DataBase.getChatData(chat_id)
    chatHistory = DataBase.getChatHistory(chat_id)
    
    return render_template('chat.html', title=DEFAULT, chatHistory=chatHistory, chatData = [[preprocessor(i[0]), preprocessor(i[1])] for i in chatData])
    
# flask static routes
@app.route('/assets/css/<path:filename>')
@app.route('/c/assets/css/<path:filename>')
def staticCSS(filename): return send_from_directory(app.root_path+'/assets/css/', filename)

@app.route('/assets/js/<path:filename>')
@app.route('/c/assets/js/<path:filename>')
def staticJS(filename): return send_from_directory(app.root_path+'/assets/js/', filename)

@app.route('/assets/icon/<path:filename>')
@app.route('/c/assets/icon/<path:filename>')
def staticICON(filename): return send_from_directory(app.root_path+'/assets/icon/', filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)