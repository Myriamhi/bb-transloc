import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { UserEntryDialogComponent } from './single/dialog/userEntryDialog.component';
import { MatCheckboxModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material';
import { UserEntrysComponent} from './list/userEntrys.component';
import { UserEntryComponent} from './single/userEntry.component';
import {MatCardModule} from '@angular/material';
import { UserEntryService} from './userEntry.service';
import { UserEntryRouting} from './userEntryRouting.module';
import { ProductModule } from '../product/product.module';
import {SharedModule } from '../shared/shared.module';
import {MatExpansionModule} from '@angular/material';
import {MatRadioModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {PaiementCardModule} from '../nav/paiementCard/paiementCard.module';
import {MatNativeDateModule} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { AmazingTimePickerModule } from 'amazing-time-picker'; // this line you need
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
    UserEntryRouting,
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
    MatStepperModule,
    AmazingTimePickerModule,
    // SignaturePadModule,
    // AutocompleteComponent,
  ],
  declarations: [
    UserEntrysComponent,
    UserEntryComponent,
    UserEntryDialogComponent,

    // AutocompleteComponent
  ],
  exports:      [
    UserEntrysComponent,
    UserEntryComponent,
    // AutocompleteComponent,
  ],
  providers:    [
    UserEntryService,
    // PaiementService
  ],
  entryComponents: [
    UserEntryDialogComponent,
  ]
})

export class UserEntryModule { }
