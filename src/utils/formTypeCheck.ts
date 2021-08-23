import { IPatientInfo } from './interfaces';

export const formTypeCheck = ({ firstName, lastName, birthdate, age, maritalStatus, sex, rg, city, state, address, occupation, phone, subject }: IPatientInfo): string[] => {

  const validationErrors: string[] = [];

  typeof firstName !== 'string' && validationErrors.push('Check First Name format');
  typeof lastName!== 'string' && validationErrors.push('Check Last Name format');
  typeof birthdate !== 'string' && validationErrors.push('Check Birth Date format');
  typeof age !== 'number' && validationErrors.push('Check Age format');
  typeof maritalStatus !== 'number' && validationErrors.push('Check Marital Status format');
  typeof sex !== 'boolean' && validationErrors.push('Check Sex format');
  typeof rg !== 'string' && validationErrors.push('Check RG format');
  typeof city !== 'string' && validationErrors.push('Check City format');
  typeof state !== 'string' && validationErrors.push('Check State format');
  typeof address !== 'string' && validationErrors.push('Check Address format');
  typeof phone !== 'string' && validationErrors.push('Check Phone format');
  typeof occupation !== 'string' && validationErrors.push('Check Occupation format');
  typeof subject !== 'string' && validationErrors.push('Check Subject format');

  return validationErrors;
};
