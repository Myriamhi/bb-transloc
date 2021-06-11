import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { TeamsComponent} from './list/teams.component';
import { TeamComponent} from './single/team.component';


import { PaiementGuardService} from '../companie/single/paiement/paiementGuard.service';
import { AuthGuardService} from '../auth/authguard.service';

// import { TeamComponent} from './single/team.component';

// import { AdminGuardService} from '../admin/services/adminGuard';


export const routes: Routes = [

  // {path: 'new', component: TeamComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'new/:isGooplusPaiement', component: TeamComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'new/:idQuote', component: TeamComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'new/:idClient/:idProject', component: TeamComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'edit/:idTeam', component: TeamComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  {path: '', component: TeamsComponent, canActivate: [AuthGuardService]},
  {path: ':id', component: TeamComponent, canActivate: [AuthGuardService]},
  // {path: 'public/:idTeam', component: TeamComponent},
  {path: ':isExpense', component: TeamsComponent, canActivate: [AuthGuardService]},

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRouting {}
