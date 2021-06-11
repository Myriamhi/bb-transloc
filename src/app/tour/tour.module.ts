import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { TourDialogComponent } from './single/dialog/tourDialog.component';
import { MatCheckboxModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material';
import { ToursComponent} from './list/tours.component';
import { TourComponent} from './single/tour.component';
import {MatCardModule} from '@angular/material';
import { TourService} from './tour.service';
import { TourRouting} from './tourRouting.module';
import { ProductModule } from '../product/product.module';
import {SharedModule } from '../shared/shared.module';
import {MatExpansionModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {PaiementCardModule} from '../nav/paiementCard/paiementCard.module';
import {MatNativeDateModule} from '@angular/material';
// import { CommonModule } from '@angular/common';
// import { ProjectModule} from '../project/project.module';
// import { PaiementService} from './paiement.service';
// import { MaterialModule } from '@angular/material';
// import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
// import { SignaturePadModule } from 'angular2-signaturepad';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { DateAdapter, NativeDateAdapter } from '@angular/material';

@NgModule({
  imports:      [
    // ProjectModule,
    // NgbModule,
    TourRouting,
    // CommonModule,
    // FormsModule,
    // MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    ProductModule,
    SharedModule,
    MatCheckboxModule,
    MatCardModule,
    MatExpansionModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    PaiementCardModule,
    MatNativeDateModule,
    // SignaturePadModule,
    // AutocompleteComponent,
  ],
  declarations: [
    ToursComponent,
    TourComponent,
    TourDialogComponent,

    // AutocompleteComponent
  ],
  exports:      [
    ToursComponent,
    TourComponent,
    // AutocompleteComponent,
  ],
  providers:    [
    TourService,
    // PaiementService
  ],
  entryComponents: [
    TourDialogComponent,
  ]
})

export class TourModule { }
