import { APIGatewayProxyEvent } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { DynamoDB } from 'aws-sdk';

import { IPatientInfo, IResponse } from 'src/utils/interfaces';
import { genders, maritalStatuses } from '../../utils/enums';
import apiResponse from 'src/utils/apiResponses';

const updatePatient = async (event: APIGatewayProxyEvent): Promise<IResponse> => {
  try {

    const patientInfo = JSON.parse(JSON.stringify(event.body)) as IPatientInfo;

    const treatedPatient: IPatientInfo = {  //CHECKING FOR CHANGES PROPS THAT USE ENUM
      ...patientInfo,
      gender: typeof patientInfo.gender === 'number' ? genders[patientInfo.gender] : patientInfo.gender,
      maritalStatus: typeof patientInfo.maritalStatus === 'number' ? maritalStatuses[patientInfo.maritalStatus] : patientInfo.maritalStatus
    };

    const { patientId, creationId, ...newPatientObj }: IPatientInfo = treatedPatient; //REMOVING PROPS THAT CAN'T BE UPDATED

    const dynamoDb = new DynamoDB.DocumentClient();
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        patientId: patientId,
        creationId: creationId
      },
      UpdateExpression: 'set ' + Object.keys(newPatientObj).map(k => `#${k} = :${k}`).join(', '),
      ExpressionAttributeNames: Object.entries(newPatientObj).reduce((acc, cur) => ({...acc, [`#${cur[0]}`]: cur[0]}), {}),
      ExpressionAttributeValues: Object.entries(newPatientObj).reduce((acc, cur) => ({...acc, [`:${cur[0]}`]: cur[1]}), {}),
      ReturnValues: 'UPDATED_NEW'
    };

    const patient = await dynamoDb.update(params).promise();

    return apiResponse({ message: 'Paciente atualizado com sucesso!', patient }, 200);
  } catch (e) {
    console.log('ERROR: ', e);
    return apiResponse({ message: 'Houve um problema ao atualizar o paciente.' }, 500);
  }

};

export const main = middyfy(updatePatient);
