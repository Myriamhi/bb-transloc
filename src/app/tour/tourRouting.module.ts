import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { ToursComponent} from './list/tours.component';
import { TourComponent} from './single/tour.component';


import { PaiementGuardService} from '../companie/single/paiement/paiementGuard.service';
import { AuthGuardService} from '../auth/authguard.service';

// import { TourComponent} from './single/tour.component';

// import { AdminGuardService} from '../admin/services/adminGuard';


export const routes: Routes = [

  // {path: 'new', component: TourComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'new/:isGooplusPaiement', component: TourComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'new/:idQuote', component: TourComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'new/:idClient/:idProject', component: TourComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  // {path: 'edit/:idTour', component: TourComponent, canActivate: [AuthGuardService, PaiementGuardService]},
  {path: '', component: ToursComponent, canActivate: [AuthGuardService]},
  {path: ':id', component: TourComponent, canActivate: [AuthGuardService]},
  // {path: 'public/:idTour', component: TourComponent},
  {path: ':isExpense', component: ToursComponent, canActivate: [AuthGuardService]},

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourRouting {}
