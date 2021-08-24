export interface IPatientInfo {
  firstName: string
  lastName: string
  birthdate: string
  rg: string
  gender: number
  maritalStatus: string
  address: string
  city: string
  state: string
  phone: string
  occupation: string
  subject: string
}

export interface IResponse {
  statusCode: number
  body: string
  isBase64Encoded: boolean
  headers: {
    [key: string]: string
  }
}
