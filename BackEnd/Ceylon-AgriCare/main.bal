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
        string newsApiKey = "076e0ceaa2914eacb2d1cff055da7f32"; 
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