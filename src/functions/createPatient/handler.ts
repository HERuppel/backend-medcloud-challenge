import { APIGatewayProxyEvent } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';
import KSUID from 'ksuid';

import { IPatientInfo, IResponse } from 'src/utils/interfaces';
import { formTypeCheck } from 'src/utils/formTypeCheck';
import apiResponse from 'src/utils/apiResponses';
import { maritalStatuses, genders } from 'src/utils/enums';

const createPatient = async (event: APIGatewayProxyEvent): Promise<IResponse> => {
  try {

    const dynamoDb = new DynamoDB.DocumentClient();

    const patientInfo = JSON.parse(JSON.stringify(event.body)) as IPatientInfo;
    const validation = formTypeCheck({ ...patientInfo });

    if (validation.length !== 0) {
      return apiResponse({ message: validation.join(', ') }, 400);
    }

    const { string } = KSUID.randomSync();
    const creationId = string;

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        patientId: process.env.PK_VALUE,
        creationId,
        ...patientInfo,
        maritalStatus: maritalStatuses[patientInfo.maritalStatus],
        gender: genders[patientInfo.gender]
      }
    };

    await dynamoDb.put(params).promise();

    const patient = { ...params.Item };

    return apiResponse(patient, 201);
  } catch (e) {
    console.log(e);
    return apiResponse({ message: 'Ocorreu um problema ao criar o paciente!' }, 500);
  }

};

export const main = middyfy(createPatient);
