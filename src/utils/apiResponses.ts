import { IResponse } from './interfaces';

const apiResponse = (data = {}, statusCode: number): IResponse => {
  return {
    statusCode,
    body: JSON.stringify(data),
    isBase64Encoded: false,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers' : 'Content-Type',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
    },
  };
};

export default apiResponse;
