import { APIGatewayProxyEvent } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';

import { IResponse } from 'src/utils/interfaces';
import apiResponse from 'src/utils/apiResponses';

const deletePatient = async (event: APIGatewayProxyEvent): Promise<IResponse> => {
  try {

    const { creationId } = event.pathParameters;

    const dynamoDb = new DynamoDB.DocumentClient();

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        patientId: process.env.PK_VALUE,
        creationId
      }
    };

    await dynamoDb.delete(params).promise();

    return apiResponse({ message: 'Paciente deletado com sucesso!' }, 204);
  } catch (e) {
    console.log(e);
    return apiResponse({ message: 'Houve um problema ao deletar o paciente.' }, 500);
  }

};

export const main = middyfy(deletePatient);
