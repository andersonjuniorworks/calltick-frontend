import { Contract } from './contract.model';
export interface Client {
  id: number;
  type: number;
  document: string;
  stateRegistration: string;
  fullname: string;
  nickname: string;
  zipcode: string
  address: string;
  homeNumber: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  phoneNumberOne: string;
  phoneNumberTwo: string;
  email: string;
  registrationDate: string;
  contract?: Contract;
}
