# Example: reuse your existing OpenAI setup
import os
import openai

import time
import re

openai.api_base = "http://localhost:1234/v1" # point to the local server
openai.api_key = "" # no need for an API key

def LocalGPT(prompt:str, chat_id, DataBase):
    messages = [{"role": "system", "content": "Below is an instruction that describes a task. Write a response that appropriately completes the request."}]
    
    if chat_id is not None:
        for i in DataBase.getChatData(chat_id):
            messages.append({"role": "user", "content": i[0]})
            messages.append({"role": "assistant", "content": i[1]})
    messages.append({"role": "user", "content": prompt})
    
    completion = openai.ChatCompletion.create(
        model="local-model", # this field is currently unused
        messages=messages, stream = True
    )

    chunkResponse = ''
    addInChunkResponse = False
    isCodeBlock = False
    response = ''
    print('`')
    for chunk in completion:
        chunk = chunk.choices[0]['delta'].get("content", "")
        print(chunk, end='')
        response+=chunk

        i = chunk
        if('`' in chunk):
            addInChunkResponse = True
        
        if (addInChunkResponse):
            chunkResponse += i
            if(('\n' in i) or (isCodeBlock and ' ' in i)):
                addInChunkResponse = False
                
        if (not addInChunkResponse):
            stopCodeBlock = ''
            if (chunkResponse!=''):
                i = chunkResponse
                chunkResponse = ''
                
            if isCodeBlock:
                if (i.find('```')!=-1):
                    isCodeBlock = False
                    i = i.replace('```', '')
                    stopCodeBlock = '```'
            else:
                if (i.find('```')!=-1):
                    lang = i.split('\n',1)[0].replace('```', '')
                    i = f'<div class="code"><div class="code-head"><h4>{lang}</h4><div class="code-head-button" onclick="copyCode(this)"><div class="svg-18x18"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg></div>Copy code</div></div><pre class="code-content" code-lang="{lang}"><code class="{lang}" id="code-block-last">'+i.split("\n",1)[1]+'</code></pre></div>'
                    isCodeBlock = True
            yield stopCodeBlock+i
    print('`')
    # chunkResponse = ''
    # isCodeBlock = False
    # response = ''
    # for chunk in completion:
    #     chunk = chunk.choices[0]['delta'].get("content", "")
    #     response+=chunk
    #     if(chunkResponse.find('\n') == -1):
    #         chunkResponse+=chunk
    #     else:
    #         i = chunkResponse
    #         chunkResponse = ''
    #         stopCodeBlock = ''
    #         if isCodeBlock:
    #             if (i.find('```')!=-1):
    #                 isCodeBlock = False
    #                 i = i.replace('```', '')
    #                 stopCodeBlock = '```'
    #         else:
    #             if (i.find('```')!=-1):
    #                 lang = i.split('\n',1)[0].replace('```', '')
    #                 i = f'<div class="code"><div class="code-head"><h4>{lang}</h4><div class="code-head-button" onclick="copyCode(this)"><div class="svg-18x18"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg></div>Copy code</div></div><pre class="code-content" code-lang="{lang}"><code class="{lang}" id="code-block-last">'+i.split("\n",1)[1]+'</code></pre></div>'
    #                 isCodeBlock = True
    #         yield stopCodeBlock+i
            
        
        
        
    # isCodeBlock = False
    # response = ''
    # with open('temp.txt\\x.txt', 'r') as f:
    #     for i in f.readlines():
    #         time.sleep(.1)
    #         response+=i
            
    #         stopCodeBlock = ''
    #         if isCodeBlock:
    #             if (i.find('```')!=-1):
    #                 isCodeBlock = False
    #                 i = i.replace('```', '')
    #                 stopCodeBlock = '```'
    #         else:
    #             if (i.find('```')!=-1):
    #                 lang = i.split('\n',1)[0].replace('```', '')
    #                 i = f'<div class="code"><div class="code-head"><h4>{lang}</h4><div class="code-head-button" onclick="copyCode(this)"><div class="svg-18x18"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg></div>Copy code</div></div><pre class="code-content" code-lang="{lang}"><code class="{lang}" id="code-block-last">'+i.split("\n",1)[1]+'</code></pre></div>'
    #                 isCodeBlock = True
    #         yield stopCodeBlock+i

    if chat_id == None:
        ID = DataBase.newChat(prompt, response)
    else:
        DataBase.addChat(chat_id, prompt, response)
        
if __name__ == "__main__":
    completion = openai.ChatCompletion.create(
        model="local-model", # this field is currently unused
        messages=[
            {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
            {"role": "user", "content": 'is everything fine?'},
            # {"role": "assistant","content": "Hello, my name is Rhyme-a-thon."},
            # {"role": "user", "content": "What is G 20?"},
            # {"role": "assistant","content": "It's a group of finance ministers and central bank governors from the world's largest economies that meets annually to discuss global economic issues."},
            # {"role": "user", "content": "Where it located?"}
        ], stream = True
    )
    for i in completion:
        print(i.choices[0]['delta'].get("content", ""))