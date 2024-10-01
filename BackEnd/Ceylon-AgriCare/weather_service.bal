import ballerina/http;
import ballerina/log;

service / on new http:Listener(8081) {
    
    // Endpoint for fetching weather data
    resource function get weather/[string location](http:Caller caller, http:Request req) returns error? {
        string apiKey = "";
        string baseUrl = "http://api.weatherapi.com/v1/";

        // Initialize the HTTP client with the base URL
        http:Client weatherClient = check new(baseUrl);

        // Define the path for the API request, including the query parameters
        string path = string `current.json?key=${apiKey}&q=${location}`;

        // Make the GET request and explicitly specify the return type as `http:Response`
        http:Response|error weatherResponse = weatherClient->get(path);

        if (weatherResponse is http:Response) {
            json weatherData = check weatherResponse.getJsonPayload();
            http:Response res = new;
            res.setPayload(weatherData);
            res.setHeader("Access-Control-Allow-Origin", "*");
            check caller->respond(res);
        } else {
            log:printError("Error in Weather API call", 'error = weatherResponse);
            http:Response res = new;
            res.setPayload("Error fetching weather data.");
            res.setHeader("Access-Control-Allow-Origin", "*");
            check caller->respond(res);
        }
    }

    // Endpoint for fetching weather forcast data
    resource function get weatherForecast/[string location](http:Caller caller, http:Request req) returns error? {
    string apiKey = "";
    string baseUrl = "http://api.weatherapi.com/v1/";
    
    // Define the path for the forecast API request
    string path = string `forecast.json?key=${apiKey}&q=${location}&days=7`;
    
    http:Client weatherClient = check new(baseUrl);
    http:Response|error weatherResponse = weatherClient->get(path);
    
    if (weatherResponse is http:Response) {
        json weatherData = check weatherResponse.getJsonPayload();
        http:Response res = new;
        res.setPayload(weatherData);
        res.setHeader("Access-Control-Allow-Origin", "*");
        check caller->respond(res);
    } else {
        log:printError("Error in Weather API call", 'error = weatherResponse);
        http:Response res = new;
        res.setPayload("Error fetching weather data.");
        res.setHeader("Access-Control-Allow-Origin", "*");
        check caller->respond(res);
    }
}

    
   // Endpoint for fetching news data
    resource function get news(http:Caller caller, http:Request req) returns error? {
        string newsApiKey = ""; 
        string baseUrl = "https://newsapi.org/v2/";

        // Define the query parameters
        string path = string `everything?q=weather&apiKey=${newsApiKey}`;

        // Create a news API client using the base URL
        http:Client newsClient = check new (baseUrl);

        // Make the GET request to the news API
        http:Response|error newsResponse = newsClient->get(path);

        if (newsResponse is http:Response) {
            // Fetch JSON data from the API response
            json newsData = check newsResponse.getJsonPayload();

            // Respond with the fetched news data
            http:Response res = new;
            res.setPayload(newsData);
            res.setHeader("Access-Control-Allow-Origin", "*");
            check caller->respond(res);
        } else {
            // Log error in API call and respond with a failure message
            log:printError("Error in News API call", 'error = newsResponse);
            http:Response res = new;
            res.setPayload("Error fetching news data.");
            res.setHeader("Access-Control-Allow-Origin", "*");
            check caller->respond(res);
        }
    }

}

// //     // Database client
// //     mysql:Client dbClient = check new (host = "localhost", user = "root", password = "", database = "ceylon-agricare", port = 3306 );

// //    // Registration endpoint
// //     resource function post register(http:Caller caller, http:Request req) returns error? {
// //         // Safely getting the payload
// //         json|error payloadResult = req.getJsonPayload();
        
// //         if (payloadResult is error) {
// //             // Handle invalid payload
// //             check caller->respond({status: "Invalid payload"});
// //             return;
// //         }

// //         json payload = <json>payloadResult; // Safely cast to JSON

// //         // Ensure all required fields are present
// //         if !(payload.fname is string && payload.lname is string && payload.email is string && payload.password is string) {
// //             check caller->respond({status: "Missing fields"});
// //             return;
// //         }

// //         // Extract fields safely from JSON
// //         string fname = check payload.fname;
// //         string lname = check payload.lname;
// //         string email = check payload.email;
// //         string password =check payload.password;

// //         // Hash the password before saving to DB
// //         string hashedPassword = hashPassword(password);


// //     // Insert into the database using a parameterized query
// //     sql:ParameterizedQuery sqlQuery = `INSERT INTO users (fname, lname, email, password) 
// //                                     VALUES (${fname}, ${lname}, ${email}, ${hashedPassword})`;

// //     sql:ExecutionResult result = check dbClient->execute(sqlQuery);//invalid remote method call: expected a client object, but found 'other'(BCE2421), undefined symbol 'dbClient'


// //         json response = {status: "User registered successfully!"};
// //         check caller->respond(response);
// //     }

// //     // Login endpoint
// //     resource function post login(http:Caller caller, http:Request req) returns error? {
// //         // Safely getting the payload
// //         json|error payloadResult = req.getJsonPayload();
        
// //         if (payloadResult is error) {
// //             // Handle invalid payload
// //             check caller->respond({status: "Invalid payload"});
// //             return;
// //         }

// //         json payload = <json>payloadResult;

// //         // Ensure all required fields are present
// //         if !(payload?.username is string && payload?.password is string) {
// //             check caller->respond({status: "Missing fields"});
// //             return;
// //         }

// //         // Extract fields safely from JSON
// //         string username = check payload.username;
// //         string password = check payload.password;


// //         // Get the stored hash from the database
// //         stream<record { string password; }, sql:Error?> userStream = check dbClient->query(//undefined symbol 'dbClient'
// //             `SELECT password FROM users WHERE fname = ${username}`//invalid remote method call: expected a client object, but found 'other'(BCE2421)

// //         );

// //         // Use `next` to get the result from the stream
// //         record { string password; }? user = check userStream.next();
// // //         incompatible types: expected '(record {| string password; anydata...; |}|error)?', found '(record {| record {| string password; anydata...; |} value; |}|ballerina/sql:1.14.1:Error)?'(BCE2066)
// // // stream<record {|string password; anydata...;|}, ballerina/sql:1.14.1:Error?> userStream

// //         if (user is ()) {
// //             // No user found
// //             check caller->respond({status: "Invalid username or password"});
// //             return;
// //         }

// //         // Hash the provided password and compare with stored hash
// //         string hashedPassword = hashPassword(password);
// //         if (hashedPassword == user.password) {
// //             json response = {status: "Login successful"};
// //             check caller->respond(response);
// //         } else {
// //             check caller->respond({status: "Invalid username or password"});
// //         }
// //     }
// // }

// // // Function to hash the password
// // function hashPassword(string password) returns string {
// //     byte[] hashBytes = check crypto:hashSha256(password.toBytes());
// //     return hashBytes.toBase16();
// }