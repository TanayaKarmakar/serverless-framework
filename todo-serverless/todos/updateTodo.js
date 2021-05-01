const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log("Event");
    console.log(event);
    
    const id = event.pathParameters.id;
    const reqBody = JSON.parse(event.body);
    
    var params = {
      TableName : process.env.TODO_NAME,
      Item: reqBody
    };
    
    const results = await dynamo.put(params).promise();
    
    const statusCode = 200;
    const body = JSON.stringify(results.Item);
    const headers = {"Access-Control-Allow-Origin": "*"};
    
    const response = { statusCode, body, headers};
    return response;
};