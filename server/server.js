var http = require("http");


//creating our server
var server = http.createServer();


//list of users that have logged in
var users = [];

var history = [
    {author: "Ginny" , message: "Hey guys"},
    {author: "Kate" , message: "Heyyyy"}
];

//initiated our socket
var io = require("./node_modules/socket.io")(server);

//listen for a connection from our Client Socket
io.on("connection", (socket) => {
    
    console.log("A Client connected: " + socket.id);

    //listen for client login request
    socket.on("login:request", (loginData) => {
        users.push(loginData.username);
        console.log(loginData.username + " requests login permission. ");   
    });

    socket.on("userlist:request" , (message) => {
         //respond with the user list
         io.emit("user:list" , users);
    });
    
    socket.on("history:request" , (message) => {

        socket.emit("history:response",history);    
    });

    //new messages

    socket.on("message:sent", (newMessage) => {
        history.push(newMessage);

        //send message to all clients
        io.emit("new:message", newMessage);
    });

});

//host the server on 8080
server.listen(8080, function(){
    console.log("Listening on port 8080...");
});