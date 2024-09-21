import ballerina/http;

service /api on new http:Listener(8080) {

    resource function get weather(http:Caller caller, http:Request req) returns error? {
        string location = req.getQueryParamValue("location") ?: "Colombo";
        string apiKey = "4a758dd1aed04dc3950175920231609";
        string weatherApiUrl = string `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

        // Pass the base URL to the http:Client constructor
        http:Client weatherClient = check new ("https://api.weatherapi.com");
        http:Response weatherResponse = check weatherClient->get(weatherApiUrl);
        json weatherData = check weatherResponse.getJsonPayload();

        check caller->respond(weatherData);
    }
}