var textarea = document.getElementById("prompt-textarea");
var input_submit_bottom = document.getElementsByClassName("input-submit-bottom")[0];
// var audio_submit_bottom = document.getElementsByClassName("audio-submit-bottom")[0];

var chats = document.getElementsByClassName('chats')[0];

var input_submit_bottom_hover_bool = false;
var audio_submit_bottom_pressed_bool = false;
var clearConversion_pressed_bool = false;

let speechRecognition;

window.setInterval(function() {
    if(textarea.value != ""){
        if(input_submit_bottom_hover_bool){
            input_submit_bottom.style.backgroundColor = "#ececf1";
        }else{
            input_submit_bottom.style.backgroundColor = "#fff";
        }
    }
}, 100);

function input_submit_bottom_hover(){
    input_submit_bottom_hover_bool = true;
};
function input_submit_bottom_unhover(){
    input_submit_bottom_hover_bool = false;
};

function audio_submit_bottom_onpressed(element){
    if(audio_submit_bottom_pressed_bool){
        element.innerHTML = '<span class="tooltiptext-top">Send voice</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"></path><path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"></path></svg>';
        audio_submit_bottom_pressed_bool = false;
		speechRecognition.stop();
    }else{
        element.innerHTML = '<span class="tooltiptext-top">Stop Microphone</span><svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_qM83 {animation: spinner_8HQG 1.05s infinite;}.spinner_oXPr {animation-delay: 0.1s;}.spinner_ZTLf {animation-delay: 0.2s;}@keyframes spinner_8HQG {0%,57.14% {animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);transform: translate(0);}28.57% {animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);transform: translateY(-6px);}100% {transform: translate(0);}}</style><circle class="spinner_qM83" cx="4" cy="12" r="2.5"></circle><circle class="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="2.5"></circle><circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="2.5"></circle></svg>';
        audio_submit_bottom_pressed_bool = true;

        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            // Create a SpeechRecognition object
            speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            
            // Set properties for SpeechRecognition
            // speechRecognition.lang = 'en-US';
            speechRecognition.continuous = true;
            // speechRecognition.interimResults = false;
            
			// Start recognition
			speechRecognition.start();
            
            // Set the timeout for turning off the recognition after inactivity (in milliseconds)
			// const inactivityTimeout = 3000; // 3 seconds
            // let lastTranscript='';
            // Initialize a timer variable
            // let inactivityTimer;  //as this my onresult callback take some time more time than 3 seconds
            // resetInactivityTimer()
            

			// Event triggered when speech is recognized
            speechRecognition.onresult = function (event) {
                // Handle recognized speech
                console.log(event);
                const transcript = event.results[Object.keys(event.results).length - 1][0].transcript;
                // prompt = `${prompt}${transcript}`;

                // lastTranscript = transcript;
                if (transcript !== '') {
                    if(textarea.value != ""){
                        textarea.value += ' ' + transcript;
                    }
                    else{textarea.value = transcript;}
                    set_prompt_input_height();
				}
                
                // Reset the inactivity timer
                // resetInactivityTimer();
            };
			// Event triggered when recognition is ended
			speechRecognition.onend = function () {
				// Restart recognition after it ends
				console.log('recognition ended');
				// audio_submit_bottom_pressed_bool = false;
			};
			// Event triggered when an error occurs
			speechRecognition.onerror = function (event) {
				console.log(event);
				console.log(`Speech recognition error: ${event.error}`);
                // alert(`Speech recognition error: ${event.error}`);
                audio_submit_bottom_pressed_bool = true; // for the blow function
				audio_submit_bottom_onpressed();
			};

            // Function to reset the inactivity timer
            // function resetInactivityTimer() {
            //     // Clear the existing timer, if any
            //     clearTimeout(inactivityTimer);
            
            //     // Set a new timer for 3 seconds of inactivity
            //     inactivityTimer = setTimeout(() => {
            //       // Stop speech recognition after 3 seconds of inactivity
            //         speechRecognition.stop();
            //         if(lastTranscript !== ''){
            //             speechRecognition.start();
            //             console.log('not finished ..., '+lastTranscript);
            //         }else{
            //             // audio_submit_bottom_pressed_bool = true; // for the blow function
            //             // audio_submit_bottom_onpressed(element);
            //             console.log('Speech recognition stopped due to inactivity.');
            //         }
            //     }, inactivityTimeout);
            //   }


        } else {
            console.log('SpeechRecognition API is not supported in this browser.');
        }
    }
    

};


function clearConversion_onpressed(element){
    if(clearConversion_pressed_bool){
        // element.style = '';
        // element.innerHTML = '<div style="width: 20px; height: 20px; max-width:20px;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></div><div>Clear conversations</div>';
        // clearConversion_pressed_bool = false;
    }else{
        element.style = 'cursor: unset;';
        element.innerHTML = '<div style="width: 100%; height: 20px; max-width:20px;">  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></div><div style="display: flex; align-items: center; width: 100%; gap: 8px;">  <div style="width: 100%;">Are you sure?</div>  <div style="width: 20px; height: 20px; max-width:20px; cursor: pointer;"  onclick="clearConversionFinal(this)">    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg>  </div>  <div style="width: 20px; height: 20px; max-width:20px; cursor: pointer;" onclick="clearConversionCancel(this)">    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" ><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"></path></svg>  </div></div>';
        clearConversion_pressed_bool = true;
    }
}

function clearConversionCancel(element){
    element.parentElement.parentElement.style = '';
    element.parentElement.parentElement.innerHTML = '<div style="width: 20px; height: 20px; max-width:20px;"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></div><div>Clear conversations</div>';
    clearConversion_pressed_bool = false;
}
function clearConversionFinal(element){
    // code
    fetch('/api/deleteALL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Flask:', data);
    })
    .catch(error => {
        console.error('Error sending data to Flask:', error);
    });
    document.getElementsByClassName("chat-history-container")[0].innerHTML = '';
    clearConversionCancel(element); // ui change 
    window.location.pathname = '/';
}


function set_prompt_input_height() {
    textarea.style.height = "";
    textarea.parentElement.style.height = "";
    textarea.parentElement.parentElement.style.height = "";
    // textarea.style.height = Math.min(textarea.scrollHeight, 140) + "px";
    textarea.style.height = Math.min(textarea.scrollHeight, 180) + "px";
    textarea.parentElement.parentElement.style.height = Math.min(textarea.scrollHeight, 180)+18 + "px";  
};

// stuck div to bottom
function stuckToBottomOnTextGeneration(){
    chats.scrollTop = chats.scrollHeight;
}
// this function add small styles to the code , just new line
function preprocessor(characters){
    characters = characters.replaceAll('\n', '\n<br>'); // replaceAll and replace is different
    // console.log(characters);
    return characters;
};

function LocalGPT(prompt){
    const outputDiv = document.getElementById('system-last');
    
    // var intervalId = window.setInterval(function(){
    //     fullPreprocessor(outputDiv);
    // }, 1000);

    var promptResponse = "";

    // Use the Fetch API to make a request
    fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'prompt': prompt})
    })
        .then(response => {
            // Check if the response has a readable stream
            const reader = response.body.getReader();

            // Read the stream and handle each chunk of data
            return new ReadableStream({
                start(controller) {
                    function pump() {
                        // Read the next chunk
                        reader.read().then(({ done, value }) => {
                            // Check if the stream is done
                            if (done) {
                                outputDiv.removeAttribute('id');
                                document.getElementById('message-bottom-icons-last').removeAttribute('id');

                                console.log('Stream finished');
                                controller.close();
                                // clearInterval(intervalId);
                                
                                
                                
                                var currentLocation = window.location.pathname;
                                if(currentLocation == '/') {
                                    var dataToSend = {'prompt': prompt, 'response': promptResponse};
                                    fetch('/api/newChat', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(dataToSend)
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log('Response from Flask:', data);
                                        window.location.pathname = '/c/' + data['ID'];
                                    })
                                    .catch(error => {
                                        console.error('Error sending data to Flask:', error);
                                    });
                                    
                                }else{
                                    var chat_id = currentLocation.split('/c/')[1];
                                    var dataToSend = {'chat_id': chat_id, 'prompt': prompt, 'response': promptResponse};
                                    fetch('/api/appendChat', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(dataToSend)
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log('Response from Flask:', data);
                                    })
                                    .catch(error => {
                                        console.error('Error sending data to Flask:', error);
                                    });
                                }
                                
                                return;
                            }

                            // Convert ASCII values to characters
                            var characters = '';
                            for (var i = 0; i < value.length; i++) {
                                characters+=String.fromCharCode(value[i]);
                            }
                            promptResponse += characters;

                            // Join characters and append to the outputDiv
                            var areWeAtBottom = ((chats.scrollTop - (chats.scrollHeight-chats.offsetHeight))<1) && ((chats.scrollTop - (chats.scrollHeight-chats.offsetHeight))>-1);
                            outputDiv.innerHTML += preprocessor(characters); 
                            
                            if(areWeAtBottom){stuckToBottomOnTextGeneration();}

                            // Continue reading the next chunk
                            pump();
                        }).catch(error => {
                            console.error('Error reading stream:', error);
                            controller.error(error);
                        });
                    }

                    // Start pumping the data
                    pump();
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

function sendPrompt(event){
    if(event.keyCode == 13 && !event.shiftKey){
        if(window.location.pathname == '/') {
            chats.innerHTML=''; 
        }
        // send code
        // alert(textarea.value);
        data = '<div class="chat-container"><div class="temp-left"></div> <div class="chat-container-mid"><div class="chat-container-icon"><img alt="profile" loading="lazy" width="24" height="24" decoding="async" data-nimg="1" class="rounded" src="https://lh3.googleusercontent.com/a/AEdFTp4GaDU9JMHRMIQirTZccYjSDDetMC2TVsVnp_Vp0w=s96-c" style="color: transparent;"></div><div class="chat-container-chat"><div class="massage user"><h6>You</h6>';
        data+=(textarea.value).replaceAll('\n', '\n<br>'); //add preprocessor via js or using api
    
        data+= '</div>';
        data+='<div class="message-bottom-icons"><div class="message-bottom-icon" style="display: flex;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4783 6.06414 21.4783 8.93588 19.7071 10.7071L18.7073 11.7069L11.1603 19.2539C10.7182 19.696 10.1489 19.989 9.53219 20.0918L4.1644 20.9864C3.84584 21.0395 3.52125 20.9355 3.29289 20.7071C3.06453 20.4788 2.96051 20.1542 3.0136 19.8356L3.90824 14.4678C4.01103 13.8511 4.30396 13.2818 4.7461 12.8397L13.2929 4.29291ZM13 7.41422L6.16031 14.2539C6.01293 14.4013 5.91529 14.591 5.88102 14.7966L5.21655 18.7835L9.20339 18.119C9.40898 18.0847 9.59872 17.9871 9.7461 17.8397L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z" fill="currentColor"></path></svg></div></div>'
        data+='</div></div><div class="temp-right"></div></div>';
        
        data+='<div class="chat-container"><div class="temp-left"></div><div class="chat-container-mid"><div class="chat-container-icon"><div style="width: 16px; height: 16px; margin: 4px;">';
        data+='<svg width="16" height="16" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-sm" role="img"><text x="-9999" y="-9999">LocalGPT</text><path d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" fill="currentColor"></path></svg>';
        data+='</div></div><div class="chat-container-chat"><div class="massage system" id="system-last"><h6>LocalGPT</h6>';
        // data+='hii'; add via localGPT
        
        data+= '</div><div class="message-bottom-icons" id="message-bottom-icons-last">';
        data+='<div class="message-bottom-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C10.8954 4 10 4.89543 10 6H14C14 4.89543 13.1046 4 12 4ZM8.53513 4C9.22675 2.8044 10.5194 2 12 2C13.4806 2 14.7733 2.8044 15.4649 4H17C18.6569 4 20 5.34315 20 7V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V7C4 5.34315 5.34315 4 7 4H8.53513ZM8 6H7C6.44772 6 6 6.44772 6 7V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7C18 6.44772 17.5523 6 17 6H16C16 7.10457 15.1046 8 14 8H10C8.89543 8 8 7.10457 8 6Z" fill="currentColor"></path></svg></div>';
        data+='<div class="message-bottom-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.1318 2.50389C12.3321 2.15338 12.7235 1.95768 13.124 2.00775L13.5778 2.06447C16.0449 2.37286 17.636 4.83353 16.9048 7.20993L16.354 8.99999H17.0722C19.7097 8.99999 21.6253 11.5079 20.9313 14.0525L19.5677 19.0525C19.0931 20.7927 17.5124 22 15.7086 22H6C4.34315 22 3 20.6568 3 19V12C3 10.3431 4.34315 8.99999 6 8.99999H8C8.25952 8.99999 8.49914 8.86094 8.6279 8.63561L12.1318 2.50389ZM10 20H15.7086C16.6105 20 17.4008 19.3964 17.6381 18.5262L19.0018 13.5262C19.3488 12.2539 18.391 11 17.0722 11H15C14.6827 11 14.3841 10.8494 14.1956 10.5941C14.0071 10.3388 13.9509 10.0092 14.0442 9.70591L14.9932 6.62175C15.3384 5.49984 14.6484 4.34036 13.5319 4.08468L10.3644 9.62789C10.0522 10.1742 9.56691 10.5859 9 10.8098V19C9 19.5523 9.44772 20 10 20ZM7 11V19C7 19.3506 7.06015 19.6872 7.17071 20H6C5.44772 20 5 19.5523 5 19V12C5 11.4477 5.44772 11 6 11H7Z" fill="currentColor"></path></svg></div>';
        data+='<div class="message-bottom-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.8727 21.4961C11.6725 21.8466 11.2811 22.0423 10.8805 21.9922L10.4267 21.9355C7.95958 21.6271 6.36855 19.1665 7.09975 16.7901L7.65054 15H6.93226C4.29476 15 2.37923 12.4921 3.0732 9.94753L4.43684 4.94753C4.91145 3.20728 6.49209 2 8.29589 2H18.0045C19.6614 2 21.0045 3.34315 21.0045 5V12C21.0045 13.6569 19.6614 15 18.0045 15H16.0045C15.745 15 15.5054 15.1391 15.3766 15.3644L11.8727 21.4961ZM14.0045 4H8.29589C7.39399 4 6.60367 4.60364 6.36637 5.47376L5.00273 10.4738C4.65574 11.746 5.61351 13 6.93226 13H9.00451C9.32185 13 9.62036 13.1506 9.8089 13.4059C9.99743 13.6612 10.0536 13.9908 9.96028 14.2941L9.01131 17.3782C8.6661 18.5002 9.35608 19.6596 10.4726 19.9153L13.6401 14.3721C13.9523 13.8258 14.4376 13.4141 15.0045 13.1902V5C15.0045 4.44772 14.5568 4 14.0045 4ZM17.0045 13V5C17.0045 4.64937 16.9444 4.31278 16.8338 4H18.0045C18.5568 4 19.0045 4.44772 19.0045 5V12C19.0045 12.5523 18.5568 13 18.0045 13H17.0045Z" fill="currentColor"></path></svg></div>';
        data+='<div class="message-bottom-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z" fill="currentColor"></path></svg></div></div>';
        
        data+='</div></div><div class="temp-right"></div></div>';
        
        chats.innerHTML+=data; 

        
        LocalGPT(textarea.value);

        //reset the textarea
        setTimeout(function(){
            textarea.value = '';
            set_prompt_input_height();
            chats.scrollTop = chats.scrollHeight;
        }, 100);
    }
};
textarea.onkeydown = sendPrompt; // addEventListener("keypress", function(event){sendPrompt(event);})

textarea.oninput = set_prompt_input_height;
set_prompt_input_height();
stuckToBottomOnTextGeneration();