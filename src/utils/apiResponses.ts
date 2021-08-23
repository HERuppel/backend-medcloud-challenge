import { IResponse } from './interfaces';

const Responses = {
  _200(data = {}): IResponse {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      isBase64Encoded: false,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
    };
  },
  _400(data = {}): IResponse {
    return {
      statusCode: 400,
      body: JSON.stringify(data),
      isBase64Encoded: false,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
    };
  },
  _500(data = {}): IResponse {
    return {
      statusCode: 500,
      body: JSON.stringify(data),
      isBase64Encoded: false,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};

export default Responses;
