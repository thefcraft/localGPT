import json
import os
import time
from datetime import datetime

class chats:
    def __init__(self)->None:
        self.path = 'chats'
        self.chats_path = [os.path.join(self.path, i) for i in os.listdir(self.path) if i!='chatHistory.json']
        self.newChatID = None
        
    @property
    def chatHistory(self)->dict:
        with open(os.path.join('chats', 'chatHistory.json'), 'rb') as f: data = json.load(f)
        return data
    
    def getNewID(self):
        return len(os.listdir(self.path))-1

    def newChat(self, Prompt:str, Response:str)->None:
        dateFormat = time.strftime(r"%Y-%m-%d %H:%M:%S")
        # name = "New chat"
        name = ' '.join(Prompt.split(' ')[:3])
        chatsData = [
            [Prompt, Response]
        ]
        data = {
            "name": name,
            "dateFormat": dateFormat,
            "chats": chatsData#{1:chatsData}
        }
        
        ID = self.getNewID()
        with open(os.path.join(self.path, f"{ID}.json"), 'w') as f: 
            json.dump(data, f, indent=4)
            
        chatHistory = self.chatHistory
        chatHistory.update({
            f'{ID}.json': {
                "name": name,
                "dateFormat": dateFormat
            }
        })
        with open(os.path.join(self.path, "chatHistory.json"), 'w') as f: 
            json.dump(chatHistory, f, indent=4)
        self.newChatID = ID
        return ID

    def addChat(self, ID, Prompt:str, Response:str)->None:  # ResponseID = [1, 2, 1]
        dateFormat = time.strftime(r"%Y-%m-%d %H:%M:%S")
        
        with open(os.path.join(self.path, f"{ID}.json"), 'rb') as f: 
            data = json.load(f)
        
        data['dateFormat'] = dateFormat
        data['chats'].append([Prompt, Response])
        
        with open(os.path.join(self.path, f"{ID}.json"), 'w') as f: 
            json.dump(data, f, indent=4)
        
        chatHistory = self.chatHistory
        chatHistory[f"{ID}.json"]["dateFormat"] = dateFormat
        with open(os.path.join(self.path, "chatHistory.json"), 'w') as f: 
            json.dump(chatHistory, f, indent=4)
    
    def updateChats_path(self)->None:
        self.chats_path = [os.path.join(self.path, i) for i in os.listdir(self.path) if i!='chatHistory.json']
        
    def deleteChat(self, ID):
        os.remove(os.path.join(self.path, f"{ID}.json"))
        chatHistory = self.chatHistory        
        chatHistory.pop(f"{ID}.json")
        with open(os.path.join(self.path, "chatHistory.json"), 'w') as f: 
            json.dump(chatHistory, f, indent=4)
        self.updateChats_path()
            
    def deleteAll(self):
        for i in self.chats_path: os.remove(i)
        with open(os.path.join(self.path, "chatHistory.json"), 'w') as f: 
            json.dump({}, f, indent=4)
        self.updateChats_path()
    
    def getChatData(self, ID):
        with open(os.path.join(self.path, f"{ID}.json"), 'rb') as f: 
            data = json.load(f)
        # name = data["name"]
        # dateFormat = data["dateFormat"]
        return data['chats']
    def getChatHistory(self, ID=None):
        chatHistory = [(k, v["name"], v["dateFormat"]) for k, v in self.chatHistory.items()]
        chatHistory.sort(key=lambda x:datetime.strptime(x[2], r"%Y-%m-%d %H:%M:%S"), reverse=True)
        
        def timeGroup(x:str):
            target_datetime_obj = datetime.strptime(x, r"%Y-%m-%d %H:%M:%S")
            time_difference = datetime.now() - target_datetime_obj
            seconds_difference = time_difference.total_seconds()
            
            month = ["January", "February", "March", "April", "May", "June", "July", 'August', 'September', 'October', 'November', "December"][int(x.split("-")[1])-1]
            
            if(time.strftime(r"%Y")==x.split("-")[0]):
                if(time.strftime(r"%m")==x.split("-")[1]):
                    if(seconds_difference < 86400): group = "Today"
                    elif(seconds_difference < 86400*2): group = "Yesterday"
                    elif(seconds_difference < 86400*7): group = "Previous 7 Days"
                    elif(seconds_difference < 86400*30): group = "Previous 30 Days"
                    
                else: group = month
            else: group = f"{month}, {x.split('-')[0]}"     
            return group
        
        result = {}
        for i in chatHistory:
            i_ID = i[0].removesuffix('.json')
            try:
                result[timeGroup(i[2])].append((i[1], i_ID, i_ID == ID))
            except:
                result.update({
                    timeGroup(i[2]) : [(i[1], i_ID, i_ID == ID)]
                })
        
        return result
    
if __name__ == '__main__':
    dataBase = chats()
    # print(dataBase.chats_path)
    # print(dataBase.chatHistory)
    
    dataBase.newChat('Make a textarea and add it scrollbar 30px to right', 'To create a textarea with a scrollbar positioned 30px to the right, you can use HTML and CSS. Here\'s an example:')
    # dataBase.addChat(1, 'Prompt', 'Response')
    # dataBase.deleteChat(1)
    # print(dataBase.getChatData(1))
    print(dataBase.getChatHistory(0))
    # dataBase.deleteAll()