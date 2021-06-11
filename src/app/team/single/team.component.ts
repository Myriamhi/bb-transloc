import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamService } from '../team.service';
import { PaiementService } from '../../companie/single/paiement/paiement.service';
import { Team } from '../team.model';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { QuoteService } from '../../quote/quote.service';
import { DeleteDialogComponent } from '../../nav/deleteDialog/deleteDialog.component';
import { Quote } from '../../quote/quote.model';
import { Search } from '../../shared/shared.model';
import { MatDialog } from '@angular/material';
import { AuthService} from '../../auth/auth.service';



@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['../team.component.css'],
})
export class TeamComponent implements OnInit {
  @Output() saved: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Input() fetchedQuotes: Quote[] = [];
  @Input() search: Search = new Search();
  @Input() isDialog = false;

  fetchedTeam: Team = new Team();

  myForm: FormGroup;
  step = -1;


  constructor(
    private teamService: TeamService,
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
    this.myForm = this._fb.group({
      amount: [''],
      title: [''],
      nameTeam: [''],
      isPaid: [false],
      type: [''],
      datePaiement: [null, []],
    })



    if (this.search.teamId) {
      this.getTeam(this.search.teamId)
    }
  }


  save() {
    const this2 = this
    return new Promise(function(resolve, reject) {
      if (this2.fetchedTeam._id) {
        this2.teamService.updateTeam(this2.fetchedTeam)
          .subscribe(
          res => {
            this2.authService.successNotif(res.message)
            // this2.saved.emit()
            this2.getTeam(res.obj._id)
            resolve(true)
          },
          error => {
            reject(true)
            this2.toastr.error('error!', error)
          }
          )
      } else {
        this2.teamService.saveTeam(this2.fetchedTeam)
          .subscribe(
          res => {
            this2.authService.successNotif(res.message)
            // this2.saved.emit()
            this2.getTeam(res.obj._id)
            // if(this.showHeader)
            //   this.router.navigate(['team/edit/' + res.obj._id])
          },
          error => { console.log(error) }
          )
      }

    })
  }





  onDelete(id: string) {
    let this2 = this
    return new Promise(function(resolve, reject) {
      this2.teamService.deleteTeam(id)
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
        this.onDelete(this.fetchedTeam._id).then(function() {
          this2.close.emit()
        })
      }
    })
  }




  getTeam(id: string) {
    this.teamService.getTeam(id, {})
      .subscribe(
      res => {
        this.fetchedTeam = res
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
