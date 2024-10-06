import ballerina/http;
import ballerina/log;
import ballerinax/mongodb;
import ballerina/uuid;

configurable string host = "mongodb://localhost:27017";
// configurable string host = "localhost";
configurable int port = 27017;

configurable string username = "linukaarambawela";
configurable string password = "P4sYcUebZ9rlcv";
configurable string database = "agricare";


final mongodb:Client mongoDb = check new ({
    connection: {
        serverAddress: {
            host,
            port
        },
        auth: <mongodb:ScramSha256AuthCredential>{
            username,
            password,
            database
        }
    }
});

type User record {
    string id;
    string username;
    string password;
    string email;
};

type UserInput record {
    string username;
    string password;
    string email;
};

type LoginInput record {
    string username;
    string password;
};

service /user on new http:Listener(8081) {
    private final mongodb:Database db;

    // Initialize the database
    function init() returns error? {
        self.db = check mongoDb->getDatabase("user_management");
    }

    // User registration endpoint
    resource function post register(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        UserInput input = check payload.cloneWithType(UserInput);
        mongodb:Collection usersCollection = check self.db->getCollection("users");
        string id = uuid:createType1AsString();
        User newUser = {
            id: id,
            username: input.username,
            password: input.password,
            email: input.email
        };
        check usersCollection->insertOne(newUser);
        http:Response res = new;
        res.setPayload("User registered successfully.");
        check caller->respond(res);
    }

     // User login endpoint
    resource function post login(http:Caller caller, http:Request req) returns error? {
        json payload = check req.getJsonPayload();
        LoginInput input = check payload.cloneWithType(LoginInput);
        mongodb:Collection usersCollection = check self.db->getCollection("users");
        json query = { "username": input.username, "password": input.password };

        var result = usersCollection->find(query);
        // cannot infer the 'typedesc' argument for parameter 'targetType': expected an argument for the parameter or a contextually-expected type to infer the argument
        if (result is mongodb:Error) {
            log:printError("Error finding user", result);
            check caller->respond({ "status": "error", "message": "Login failed" });
        } else {
            json[] users = <json[]>result;//incompatible types: 'never' cannot be cast to 'json[]'(BCE2500)
            if (users.length() > 0) {
                check caller->respond({ "status": "success", "message": "Login successful" });
            } else {
                check caller->respond({ "status": "error", "message": "Invalid credentials" });
            }
        }
    }
}


// Weather endpoints
service /weather on new http:Listener(8082) {
    
    // Endpoint for fetching current weather data
    resource function get current/[string location](http:Caller caller, http:Request req) returns error? {
        string apiKey = ""; // Add your weather API key
        string baseUrl = "http://api.weatherapi.com/v1/";
        
        // Define the path for the API request
        string path = string `current.json?key=${apiKey}&q=${location}`;
        
        // Initialize the HTTP client
        http:Client weatherClient = check new(baseUrl);
        
        // Make the GET request
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

    // Endpoint for fetching weather forecast data
    resource function get forecast/[string location](http:Caller caller, http:Request req) returns error? {
        string apiKey = ""; // Add your weather API key
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
}

// News endpoint
service /news on new http:Listener(8083) {
    
    // Endpoint for fetching news data
    resource function get latest(http:Caller caller, http:Request req) returns error? {
        string newsApiKey = ""; // Add your news API key
        string baseUrl = "https://newsapi.org/v2/";
        
        // Define the query parameters
        string path = string `everything?q=weather&apiKey=${newsApiKey}`;
        
        // Create a news API client
        http:Client newsClient = check new(baseUrl);
        
        // Make the GET request to the news API
        http:Response|error newsResponse = newsClient->get(path);
        
        if (newsResponse is http:Response) {
            json newsData = check newsResponse.getJsonPayload();
            http:Response res = new;
            res.setPayload(newsData);
            res.setHeader("Access-Control-Allow-Origin", "*");
            check caller->respond(res);
        } else {
            log:printError("Error in News API call", 'error = newsResponse);
            http:Response res = new;
            res.setPayload("Error fetching news data.");
            res.setHeader("Access-Control-Allow-Origin", "*");
            check caller->respond(res);
        }
    }
}

