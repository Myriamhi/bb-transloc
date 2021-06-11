import { Component, ViewChild , Inject} from '@angular/core';
import { MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { TourComponent }  from '../tour.component';
import { Quote } from '../../../quote/quote.model'
import { Search } from '../../../shared/shared.model';


@Component({
  selector: 'app-edit-options-dialog',
  templateUrl: './tourDialog.component.html',
})



export class TourDialogComponent {
  // fetchedQuote: Quote
  search: Search = new Search();

  constructor(
    public dialogRef: MatDialogRef<TourComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.search = data.search
  }

  closeDialog(result) {
    this.dialogRef.close()
  }
  saved() {
    this.dialogRef.close()
    // this.userFormsComponent.onUploadFinisedParentToChild();
  }
}
