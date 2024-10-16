// import ballerina/websocket;
// import ballerina/http;
// import ballerina/io;

// // Creating a WebSocket listener on port 9090 without security
// listener websocket:Listener wsListener = new(9090);

// // WebSocket service to handle incoming WebSocket connections and messages
// service /ws on wsListener {
//     resource function get .(http:Request req) returns websocket:Service|websocket:UpgradeError {
//         // Optional: Implement custom validation of HTTP upgrade request, like validating the origin header
//         string|error originHeader = req.getHeader("Origin");
//         if originHeader is string {
//             boolean isValid = validateOrigin(originHeader);
//             if (!isValid) {
//                 return error("Invalid Origin. Upgrade request rejected");
//             }
//         }
//         return new WsService();
//     }
// }

// // Service class for WebSocket communication
// service class WsService {
//     *websocket:Service;

//     // Handling when a text message is received
//     remote isolated function onTextMessage(websocket:Caller caller, string data) returns websocket:Error? {
//         io:println("Received message: " + data);
//         // Echoing back the received message
//         check caller->writeTextMessage(data);
//     }

//     // Handling when a ping frame is received
//     remote function onPing(websocket:Caller caller, byte[] data) returns error? {
//         io:println("Ping received, replying with Pong");
//         check caller->pong(data);
//     }

//     // Handling when a pong frame is received
//     remote function onPong(websocket:Caller caller, byte[] data) {
//         io:println("Pong received with data: " + data.toBase64());
//     }

//     // Handling when the connection closes
//     remote function onClose(websocket:Caller caller, int statusCode, string reason) {
//         io:println(string `Client closed connection with ${statusCode} because of ${reason}`);
//     }

//     // Handling errors
//     remote function onError(websocket:Caller caller, websocket:Error err) {
//         io:println("Error occurred: " + err.message());
//     }
// }

// // Custom origin validation logic
// function validateOrigin(string origin) returns boolean {
//     // Implement your custom logic here (for now, allowing all origins)
//     return true;
// }

// // WebSocket client connecting to the WebSocket server running locally on port 9090
// public function main() returns error? {
//     websocket:Client wsClient = check new("ws://localhost:9090/ws", {
//         pingPongHandler: new ClientPingPongCallbackService() // Registering callback to handle ping/pong frames
//     });

//     // Sending a text message to the server
//     check wsClient->writeTextMessage("Hello, WebSocket server!");

//     // Reading the echoed text message from the server
//     string textResp = check wsClient->readTextMessage();
//     io:println("Response from server: " + textResp);

//     // Closing the connection
//     check wsClient->close(1000, "Normal Closure");
// }

// // Service class to handle ping/pong messages from the server
// isolated service class ClientPingPongCallbackService {
//     *websocket:PingPongService;

//     remote isolated function onPing(websocket:Caller caller, byte[] localData) returns byte[] {
//         io:println("Ping message received");
//         return localData; // Sending back the same payload with the Pong message
//     }

//     remote isolated function onPong(websocket:Caller caller, byte[] localData) {
//         io:println("Pong message received");
//     }
// }
