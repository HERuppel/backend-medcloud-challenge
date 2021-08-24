export default {
  type: 'object',
  properties: {
    offset: { type: 'number' },
    lastItemReceived: { type: 'string' },
    searchValue: { type: 'string'}
  },
  required: ['offset', 'lastItemReceived']
} as const;
