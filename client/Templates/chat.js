const username = `${username}`;
const socket = io("http://localhost:8080" , {transports: ["websocket"]});

socket.emit("userlist:request" , "please");

socket.on("user:list" , (users) => {
    console.log(users);
    document.getElementById("userList").innerHTML = ` `;
    for (var i = 0; i < users.length ; i++){
        document.getElementById("userList").innerHTML += `<li>` + users[i] + `</li>`;
    }
});

//Getting messages
socket.emit("history:request" , "please");

socket.on("history:response",(history) => {
    console.log(history);

    for(var i = 0; i < history.length; i++) {
        document.getElementById("chatWindow").innerHTML +=
        `<p>` +history[i].author+ ':' + history[i].message+ `</p>`;
    }
    
})

socket.on("new:message" , (newMessage) => {
    document.getElementById("chatWindow").innerHTML +=
        '<p>' +history[i].author+ ':' + history[i].message+ '</p>';
}) 

socket.emit("thought:request" , "please");

socket.on("thought:response",(thought) => {
    console.log(thought);

    for(var i = 0; i < thought.length; i++) {
        document.getElementById("chatWindow").innerHTML +=
        `<p>`+ thought[i].writtenThought+ `</p>`;
    }
})

const messageForm = document.getElementById('send-container');
messageForm.addEventListener('submit', e => {
    e.preventDefault();
    
    var newMessage = document.getElementById("messageInput").value;
    var messagesSent = {author : username, message : enteredMessage};

    socket.emit("messagesSent:sent", newMessage);
            $('#chatWindow').append($('<ul id="list">').text($('#messageInput').val()));
      $('#messageInput').val('');
      return false;
});


socket.on('messagesSent', function(entry){
      $('#chatWindow').append($('<ul>').text(entry));
});
