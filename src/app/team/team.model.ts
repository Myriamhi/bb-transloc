import { Companie } from '../companie/companie.model';
import { Tour } from '../tour/tour.model';


export class Team {
  _id = '';
  ownerCompanies: Companie[] = [];
  nameTeam = '';
  tours: Tour[] = [];
}
