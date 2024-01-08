const socket = io()


let user_name;
let textArea = document.querySelector("#textarea")
let messageArea = document.querySelector(".message__area")


do {
    user_name = prompt("Please enter your name: ")
} while (!user_name);


textArea.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        sendMessage(e.target.value)
    }
})


function sendMessage(msg) {
    let message = {
        user_name,
        message: msg.trim()
    }

    //Apend
    appendMessage(message, 'outgoing')
    textArea.value = ''
    scrollToBottom()

    //Send to server
    socket.emit('message', message)
}


function appendMessage(msg, type) {
    let mainDiv = document.createElement("div")
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user_name}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


//Recieve message

socket.on('message', (msg) => {
    appendMessage(msg, "incoming")
    scrollToBottom()
})



function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}