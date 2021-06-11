import { Companie } from '../companie/companie.model';
import { Tour } from '../tour/tour.model';
import { User } from '../user/user.model';


export class UserEntry {
  _id = '';
  ownerCompanies: Companie[] = []
  users: User[] = []
  tours: Tour[] = []
  nameUserEntry = '';
  dateUserEntry = new Date();
  info1 = '';
  info2 = '';
  info3 = '';
  info4 = '';
  info5 = '';
  info6 = '';
  info7 = '';
  info8 = '';
  info9 = '18:00';
  info10 = '18:00';
  info11 = '18:00';
  info12 = '18:00';
}
