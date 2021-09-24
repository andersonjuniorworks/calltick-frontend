import { User } from './user.model';
import { Client } from './client.model';
import { Sector } from './sector.model';
export interface Ticket {
  id: number;
  client: Client,
  typeService: number;
  user: User;
  active: number;
  closeBy: string;
  closingDate: string;
  subject: string;
  description: string;
  openBy: string;
  openingDate: string;
  sector: Sector;
  status: number;
  technicalReport: string;
}
