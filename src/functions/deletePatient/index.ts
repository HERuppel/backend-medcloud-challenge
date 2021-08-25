import { handlerPath } from '@libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'deletePatient/{creationId}',
        cors: true,
        request: {
          parameters: {
            paths: {
              creationId: true
            }
          }
        }
      },
    }
  ]
};
