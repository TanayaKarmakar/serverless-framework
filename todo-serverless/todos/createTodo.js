//POST /todos/ => API Gateway => Proxy Integration REST API
//Lambda Function

const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();



exports.handler = async (event) => {
    console.log("Event");
    console.log(event);

    const item = JSON.parse(event.body);
    
    if(!item.id || item.id === -1) {
      console.log('Creating Todo');
      item.id = Math.random() * Math.pow(10, 16) + '';
    }
    
    var params = {
      TableName : process.env.TODO_TABLE,
      Item: item
    };
    
    const results = await dynamo.put(params).promise();
    
    const statusCode = 200;
    const body = JSON.stringify(results.Item);
    const headers = {"Access-Control-Allow-Origin": "*"};
    
    const response = { statusCode, body, headers};
    return response;
};
