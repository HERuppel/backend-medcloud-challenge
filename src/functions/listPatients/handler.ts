import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const listPatients = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const dynamoDb = new DynamoDB.DocumentClient();
    console.log(event);
    const params = {
      TableName: process.env.DYNAMODB_TABLE
    };

    const patients = await dynamoDb.scan(params).promise();

    if (!patients) {
      return {
        statusCode: 400,
        body: 'No patients',
        isBase64Encoded: false,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Origin': '*',
        },
      };
    }

    console.log('PATIENTS', patients);

    return {
      statusCode: 200,
      body: JSON.stringify(patients),
      isBase64Encoded: false,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
    };


  } catch (e) {
    console.log('errorrr', e);
    return formatJSONResponse({
      message: e,
      event,
    });
  }


};

export const main = middyfy(listPatients);
