import type { AWS } from '@serverless/typescript';

import listPatients from '@functions/listPatients';
import createPatient from '@functions/createPatient';

const serverlessConfiguration: AWS = {
  service: 'backend-medcloud-challenge',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'sa-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DYNAMODB_TABLE: 'patients',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [{
      'Effect': 'Allow',
      'Action': ['dynamodb:Query', 'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem'],
      'Resource': 'arn:aws:dynamodb:sa-east-1:*:table/patients'
    }]
  },
  // import the function via paths
  functions: { listPatients, createPatient },
  resources: {
    Resources: {
      DynamoChallengeTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'patients',
          AttributeDefinitions: [{
            'AttributeName' : 'patientId',
            'AttributeType' : 'S'
          }],
          KeySchema: [{
            'AttributeName' : 'patientId',
            'KeyType' : 'HASH'
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
