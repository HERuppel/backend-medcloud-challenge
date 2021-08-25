export default {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    rg: { type: 'string' },
    birthdate: { type: 'number' },
    gender: { type: 'number' },
    maritalStatus: { type: 'number' },
    address: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    phone: { type: 'string' },
    occupation: { type: 'string' },
    subject: { type: 'string' },
    notes: { type: 'string' }
  },
  required: ['firstName', 'lastName', 'rg', 'birthdate', 'gender', 'maritalStatus', 'address', 'city', 'state', 'phone', 'occupation', 'subject']
} as const;
