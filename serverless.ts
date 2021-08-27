import type { AWS } from '@serverless/typescript';

import createPatient from '@functions/createPatient';
import listPatients from '@functions/listPatients';
import updatePatient from '@functions/updatePatient';
import deletePatient from '@functions/deletePatient';

const serverlessConfiguration: AWS = {
  service: 'backend-medcloud-challenge',
  useDotenv: true,
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
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [{
      'Effect': 'Allow',
      'Action': ['dynamodb:Query', 'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem'],
      'Resource': 'arn:aws:dynamodb:sa-east-1:*:table/patients'
    }]
  },

  functions: {
    createPatient,
    listPatients,
    updatePatient,
    deletePatient
  },

  resources: {
    Resources: {
      DynamoChallengeTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'patients',
          AttributeDefinitions: [{
            'AttributeName' : 'patientId',
            'AttributeType' : 'S'
          }, {
            'AttributeName' : 'creationId',
            'AttributeType' : 'S'
          }],
          KeySchema: [{
            'AttributeName' : 'patientId',
            'KeyType' : 'HASH'
          }, {
            'AttributeName' : 'creationId',
            'KeyType' : 'RANGE'
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
