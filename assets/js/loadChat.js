function loadChat(element, chat_id){
    if(chat_id == null){
        window.location.href = "/";
    }else{
        // similar behavior as an HTTP redirect
        // window.location.replace("/c/"+chat_id);
        // similar behavior as clicking on a link
        window.location.href = "/c/"+chat_id;
    }
}