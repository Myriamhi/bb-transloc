import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { RouterModule} from '@angular/router';
import { TeamDialogComponent } from './single/dialog/teamDialog.component';
import { MatCheckboxModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material';
import { TeamsComponent} from './list/teams.component';
import { TeamComponent} from './single/team.component';
import {MatCardModule} from '@angular/material';
import { TeamService} from './team.service';
import { TeamRouting} from './teamRouting.module';
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
    TeamRouting,
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
    TeamsComponent,
    TeamComponent,
    TeamDialogComponent,

    // AutocompleteComponent
  ],
  exports:      [
    TeamsComponent,
    TeamComponent,
    // AutocompleteComponent,
  ],
  providers:    [
    TeamService,
    // PaiementService
  ],
  entryComponents: [
    TeamDialogComponent,
  ]
})

export class TeamModule { }
