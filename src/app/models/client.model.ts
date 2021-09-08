export interface Client {
  id: number;
  type: number;
  cpfOrCnpj: string;
  fullname: string;
  nickname: string;
  zipcode: string
  address: string;
  homeNumber: string;
  complement: string;
  city: string;
  state: string;
  phoneNumberOne: string;
  phoneNumberTwo: string;
  email: string;
  registrationDate: string;
}
