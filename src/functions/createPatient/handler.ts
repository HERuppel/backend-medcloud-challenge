import { APIGatewayProxyEvent } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { IPatientInfo, IResponse } from 'src/utils/interfaces';
import { formTypeCheck } from 'src/utils/formTypeCheck';
import Responses from 'src/utils/apiResponses';
import { maritalStatuses } from 'src/utils/enums';

const createPatient = async (event: APIGatewayProxyEvent): Promise<IResponse> => {
  try {

    const dynamoDb = new DynamoDB.DocumentClient();

    console.log('BODY', event.body);

    const patientInfo = JSON.parse(JSON.stringify(event.body)) as IPatientInfo;
    const validation = formTypeCheck({ ...patientInfo });

    console.log('PATIENTINFOS', patientInfo);

    if (validation.length !== 0) {
      return Responses._400({ message: validation.join(', ') });
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        patientId: uuid(),
        createdAt: Date.now(),
        ...patientInfo,
        maritalStatus: maritalStatuses[patientInfo.maritalStatus]
      }
    };

    const patient = await dynamoDb.put(params).promise();

    console.log('CREATED PATIENT', patient);

    return Responses._200(patient);
  } catch (e) {
    console.log('ERROR: ', e);
    return Responses._400({ message: e });
  }

};

export const main = middyfy(createPatient);
