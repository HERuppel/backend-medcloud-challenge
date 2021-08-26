import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AWSError, DynamoDB } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import KSUID from 'ksuid';
import apiResponse from 'src/utils/apiResponses';

const listPatients = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const dynamoDb = new DynamoDB.DocumentClient({ region: 'sa-east-1' });

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

    if (!list)
      return apiResponse({ message: 'Lista de pacientes vazia' }, 404);

    return apiResponse(list, 200);
  } catch (e) {
    console.log('errorrr', e);
    return apiResponse({ message: 'Ocorreu um erro interno.' }, 500);
  }


};

export const main = middyfy(listPatients);
