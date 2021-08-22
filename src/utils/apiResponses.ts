const Responses = {
  _200(data = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(data),
      isBase64Encoded: false
    };
  },
  _400(data = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 400,
      body: JSON.stringify(data),
      isBase64Encoded: false
    };
  },
  _500(data = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 500,
      body: JSON.stringify(data),
      isBase64Encoded: false
    };
  }
};

export default Responses;
