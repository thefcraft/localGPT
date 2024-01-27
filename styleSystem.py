import re

def green(data): return f'<a class="color-green">{data}</a>'
def blue(data): return f'<a class="color-blue">{data}</a>'
def pink(data): return f'<a class="color-pink">{data}</a>'
def red(data): return f'<a class="color-red">{data}</a>'
def yellow(data): return f'<a class="color-yellow">{data}</a>'
def gray(data): return f'<a class="color-gray">{data}</a>'
def white(data): return f'<a class="color-white">{data}</a>'

def codeBlock(data, lang=None):
    svg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg>'
    return f'<div class="code"><div class="code-head"><h4>{lang}</h4><div class="code-head-button" onclick="copyCode(this)"><div class="svg-18x18">{svg}</div>Copy code</div></div><pre class="code-content" code-lang="{lang}"><code class="{lang}">{data}</code></pre></div>'


def replace_newline_inside_pre(text, newline='\n', newline_ = '{%/ newline /%}'):
    # Define a regular expression pattern for matching <pre> tags and their content
    pattern = re.compile(r'<pre.*?</pre>', re.DOTALL)
    def replace_newline(match):
        return match.group(0).replace(newline, newline_)
    
    modified_text = pattern.sub(replace_newline, text)
    return modified_text


def preprocessor(data:str): 
    pattern = re.compile(r'```(\w+)\n([\s\S]*?)```', re.DOTALL)
    data = pattern.sub(lambda match: codeBlock(match.group(2), match.group(1)), data)
    
    data = replace_newline_inside_pre(data, '`', '{%/ backtick /%}')
    data = re.sub(r"`(.*?)`", r"<b>`\1`</b>", data)
    data = replace_newline_inside_pre(data, '{%/ backtick /%}', '`')
    
    
    data = replace_newline_inside_pre(data, '\n', '{%/ newline /%}')
    data = data.replace('\n', '<br>')
    
    data = replace_newline_inside_pre(data, '{%/ newline /%}', '\n')
    
    return data

def encodeKeyword(data:str, keyWords:list[str]):
    for word in keyWords:
        data = data.replace(word, '{%/ encodeKeyword /%}'+word+'{%/ encodeKeyword /%}')
    return data
def decodeKeyword(data:str, keyWords:list[str]):
    for word in keyWords:
        data = data.replace('{%/ encodeKeyword /%}'+word+'{%/ encodeKeyword /%}', word)
    return data