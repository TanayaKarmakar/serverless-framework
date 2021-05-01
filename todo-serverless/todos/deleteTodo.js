const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log("Event");
    console.log(event);
    
    const id = event.pathParameters.id;
    
    var params = {
      TableName : process.env.TODO_TABLE,
      Key: {
        id
      }
    };
    
    const results = await dynamo.delete(params).promise();
    
    const statusCode = 200;
    const body = '';
    const headers = {"Access-Control-Allow-Origin": "*"};
    
    const response = { statusCode, body, headers};
    return response;
};