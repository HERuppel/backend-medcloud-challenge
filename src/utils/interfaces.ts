export interface IPatientInfo {
  patientId?: string
  creationId?: string
  firstName: string
  lastName: string
  birthdate: string
  rg: string
  gender: number | string
  maritalStatus: number | string
  address: string
  city: string
  state: string
  phone: string
  occupation: string
  subject: string
  note?: string
}


export interface IResponse {
  statusCode: number
  body: string
  isBase64Encoded: boolean
  headers: {
    [key: string]: string
  }
}
