import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AWSError, DynamoDB } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import KSUID from 'ksuid';

const listPatients = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const dynamoDb = new DynamoDB.DocumentClient();

    const { offset, lastItemReceived } = event.queryStringParameters;

    const params = {
      TableName: process.env.DYNAMODB_TABLE
    };

    let list: PromiseResult<DynamoDB.DocumentClient.ScanOutput, AWSError>;

    const { string } = KSUID.randomSync();
    const creationId = string;

    if (Number(lastItemReceived) === 0) {
      list = await dynamoDb.query({
        ...params,
        Limit: Number(offset),
        ScanIndexForward: false,
        KeyConditionExpression: 'patientId = :patientId and creationId < :creationId',
        ExpressionAttributeValues: { ':patientId': process.env.PK_VALUE, ':creationId': creationId }
      }).promise();
    } else {
      const lastEvaluatedKey = {
        patientId: process.env.PK_VALUE,
        creationId: lastItemReceived
      };

      list = await dynamoDb.query({
        ...params,
        Limit: Number(offset),
        ExclusiveStartKey: lastEvaluatedKey,
        ScanIndexForward: false,
        KeyConditionExpression: 'patientId = :patientId and creationId < :creationId',
        ExpressionAttributeValues: { ':patientId': process.env.PK_VALUE, ':creationId': creationId }
      }).promise();
    }

    if (!list) {
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

    return {
      statusCode: 200,
      body: JSON.stringify(list),
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
