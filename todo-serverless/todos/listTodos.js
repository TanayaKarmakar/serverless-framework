const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {
    console.log("Event");
    console.log(event);
    
    var params = {
      TableName : process.env.TODO_TABLE,
      FilterExpression : 'username = :username',
      ExpressionAttributeValues : {':username' : 'Tanaya'}
    };
    
    const results = await dynamo.scan(params).promise();
    
    const statusCode = 200;
    const body = JSON.stringify(results.Items);
    const headers = {"Access-Control-Allow-Origin": "*"};
    
    const response = { statusCode, body, headers };
    return response;
};
