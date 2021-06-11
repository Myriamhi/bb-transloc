import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserEntryService } from '../userEntry.service';
import { PaiementService } from '../../companie/single/paiement/paiement.service';
import { UserEntry } from '../userEntry.model';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { QuoteService } from '../../quote/quote.service';
import { DeleteDialogComponent } from '../../nav/deleteDialog/deleteDialog.component';
import { Quote } from '../../quote/quote.model';
import { Search } from '../../shared/shared.model';
import { MatDialog } from '@angular/material';
import { AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-userEntry',
  templateUrl: './userEntry.component.html',
  styleUrls: ['../userEntry.component.css'],
})
export class UserEntryComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() fetchedQuotes: Quote[] = [];
  @Input() search: Search = new Search();
  @Input() isDialog = false;

  fetchedUserEntry: UserEntry = new UserEntry();

  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;
  formGroup5: FormGroup;
  step = -1;


  constructor(
    private userEntryService: UserEntryService,
    private paiementService: PaiementService,
    private quoteService: QuoteService,
    private toastr: ToastsManager,
    public dialog: MatDialog,
    private router: Router,
    private _fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,

  ) { }


  setStep(index: number) {
    this.step = index;
  }



  closeDialog() {
    this.save()
    this.close.emit()
  }
  ngOnInit() {


    setTimeout(() => { this.step = 0 });
    this.formGroup1 = this._fb.group({
      amount: [''],
      dateUserEntry: [''],
      title: [''],
      nameUserEntry: [''],
      isPaid: [false],
      type: [''],
      datePaiement: [null, []],
    })
    this.formGroup2 = this._fb.group({});
    this.formGroup3 = this._fb.group({});
    this.formGroup4 = this._fb.group({});
    this.formGroup5 = this._fb.group({});




    if (this.search.userEntryId) {
      this.getUserEntry(this.search.userEntryId)
    }
  }


  save() {
    const this2 = this
    return new Promise(function(resolve, reject) {
      if (this2.fetchedUserEntry._id) {
        this2.userEntryService.updateUserEntry(this2.fetchedUserEntry)
          .subscribe(
          res => {
            this2.authService.successNotif(res.message)
            // this2.saved.emit()
            this2.fetchedUserEntry = res.item
            // this2.getUserEntry(res.obj._id)
            resolve(true)
          },
          error => {
            reject(true)
            this2.toastr.error('error!', error)
          }
          )
      } else {
        this2.userEntryService.saveUserEntry(this2.fetchedUserEntry)
          .subscribe(
          res => {
            this2.authService.successNotif(res.message)
            this2.fetchedUserEntry = res.item
            // this2.saved.emit()
            // this2.getUserEntry(res.item._id)
            // if(this.showHeader)
            //   this.router.navigate(['userEntry/edit/' + res.obj._id])
          },
          error => { console.log(error) }
          )
      }

    })
  }





  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.userEntryService.deleteUserEntry(id)
        .subscribe(
        res => {
          this2.authService.successNotif(res.message);
          resolve(res)
        },
        error => {
          console.log(error);
          reject(error)
        }
        )
    })
  }


  openDialogDelete() {
    const this2 = this
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent)
    dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.onDelete(this.fetchedUserEntry._id).then(function() {
          this2.close.emit()
        })
      }
    })
  }




  getUserEntry(id: string) {
    this.userEntryService.getUserEntry(id, {})
      .subscribe(
      res => {
        this.fetchedUserEntry = res
      },
      error => {
        console.log(error);
      }
      )
  }

  nextStep() {
    this.step++
    this.save()
  }



}
