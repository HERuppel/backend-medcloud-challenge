export default {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    rg: { type: 'string' },
    birthdate: { type: 'Date' },
    age: { type: 'number' },
    sex: { type: 'boolean' },
    maritalStatus: { type: 'number' },
    address: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    phone: { type: 'string' },
    occupation: { type: 'string' },
    subject: { type: 'string' }
  },
  required: ['firstName', 'lastName', 'rg', 'birthdate', 'age', 'sex', 'maritalStatus', 'address', 'city', 'state', 'phone', 'occupation', 'subject']
} as const;
