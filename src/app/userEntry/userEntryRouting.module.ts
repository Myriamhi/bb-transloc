import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { UserEntrysComponent} from './list/userEntrys.component';
import { UserEntryComponent} from './single/userEntry.component';


import { PaiementGuardService} from '../companie/single/paiement/paiementGuard.service';
import { AuthGuardService} from '../auth/authguard.service';

// import { UserEntryComponent} from './single/userEntry.component';

// import { AdminGuardService} from '../admin/services/adminGuard';


export const routes: Routes = [

  // {path: 'new', component: UserEntryComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'new/:isGooplusPaiement', component: UserEntryComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'new/:idQuote', component: UserEntryComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'new/:idClient/:idProject', component: UserEntryComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'edit/:idUserEntry', component: UserEntryComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  {path: '', component: UserEntrysComponent, canActivate: [AuthGuardService]},
  {path: 'new', component: UserEntryComponent, canActivate: [AuthGuardService]},
  {path: ':id', component: UserEntryComponent, canActivate: [AuthGuardService]},
  // {path: 'public/:idUserEntry', component: UserEntryComponent},


];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserEntryRouting {}
