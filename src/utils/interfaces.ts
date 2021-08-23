export interface IPatientInfo {
  firstName: string
  lastName: string
  birthdate: Date | string
  age: number
  rg: string
  sex: boolean
  maritalStatus: number
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
