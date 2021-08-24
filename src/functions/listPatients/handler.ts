import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AWSError, DynamoDB } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

const listPatients = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const dynamoDb = new DynamoDB.DocumentClient();

    console.log('QUERY PARAMS', event.queryStringParameters);
    const { offset, lastItemReceived } = event.queryStringParameters;

    const params = {
      TableName: process.env.DYNAMODB_TABLE
    };
    let list: PromiseResult<DynamoDB.DocumentClient.ScanOutput, AWSError>;

    if (Number(lastItemReceived) === 0) {
      list = await dynamoDb.scan({ ...params, Limit: Number(offset)}).promise();
    } else {
      const lastEvaluatedKey = { patientId: lastItemReceived };
      console.log('LAST EVALUATED KEY', lastEvaluatedKey, typeof lastEvaluatedKey);

      list = await dynamoDb.scan({ ...params, Limit: Number(offset), ExclusiveStartKey: lastEvaluatedKey }).promise();
    }



    console.log('PAGINADO', list);

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

    console.log('PATIENTS', list);

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
