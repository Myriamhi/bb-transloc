import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { UserEntryService} from '../../userEntry/userEntry.service';
import { UserEntry} from '../../userEntry/userEntry.model';
import { MatDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Search, PaginationData} from '../../shared/shared.model';
import { GlobalEventsManager } from '../../globalEventsManager';
import { UserEntryDialogComponent } from '../single/dialog/userEntryDialog.component';

import { Angular2Csv } from 'angular2-csv/Angular2-csv';



@Component({
  selector: 'app-userEntrys',
  templateUrl: './userEntrys.component.html',
  styleUrls: ['../userEntry.component.css'],
})
export class UserEntrysComponent implements OnInit, OnChanges {
  @Input() search: Search = new Search();
  @Input() showBack: number = -1;
  loading = false;
  fetchedUserEntrys: UserEntry[] = [];
  paginationData = new PaginationData();


  constructor(
    private userEntryService: UserEntryService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private globalEventsManager: GlobalEventsManager,
  ) {}



  ngOnChanges() {
    this.getUserEntrys(this.paginationData.currentPage, this.search);
  }

  ngOnInit() {
    this.getUserEntrysInit();
  }

  getUserEntrysInit() {
    const this2 = this;
    setTimeout(function(){
      this2.search.orderBy = 'name';
      this2.getUserEntrys(1, this2.search)
    }, 200);
  }

  searchInput() {
    this.getUserEntrys(this.paginationData.currentPage, this.search);
  }

  orderBy(orderBy: string) {
    this.search.orderBy = orderBy;
    this.getUserEntrys(this.paginationData.currentPage, this.search);
  }


  getPage(page: number) {
    this.getUserEntrys(page, this.search);
  }


  getUserEntrys(page: number, search: any) {
    this.loading = true;
    this.userEntryService.getUserEntrys(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedUserEntrys =  res.data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log(error);
        }
      );
  }
  saved(result) {
    this.getUserEntrys(1, this.search);
  }

  openDialogPaiement(userEntryId: string) {
    const dialogRef = this.dialog.open(UserEntryDialogComponent, {
      data : {
        search: {
          userEntryId: userEntryId
        }
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getUserEntrys(this.paginationData.currentPage, this.search);
    })
  }


  downloadFile() {
    let newFetchedUserEntrys: any
    // newFetchedUserEntrys = [...this.fetchedUserEntrys]
    // newFetchedUserEntrys = this.fetchedUserEntrys.map(x => x)
    newFetchedUserEntrys = JSON.parse(JSON.stringify(this.fetchedUserEntrys))


    newFetchedUserEntrys.map((userEntry, i) => {
      userEntry.tours.map(tour => {
          newFetchedUserEntrys[i].nameTour = tour.nameTour
      });
      userEntry.users.map(user => {
          newFetchedUserEntrys[i].email = user.email
          newFetchedUserEntrys[i].name = user.profile.name
          newFetchedUserEntrys[i].lastName = user.profile.lastName
      });
    })
    newFetchedUserEntrys.map(newFetchedUserEntry => {
      newFetchedUserEntry.tours = []
      newFetchedUserEntry.users = []
    })
    // let newFetchedUserEntrys: any
    // newFetchedUserEntrys = this.fetchedUserEntrys
    // this.fetchedUserEntrys.map((userEntry, i) => {
    //   userEntry.tours.map(tour => {
    //       newFetchedUserEntrys[i].nameTour = tour.nameTour
    //   });
    //   userEntry.users.map(user => {
    //       newFetchedUserEntrys[i].email = user.email
    //       newFetchedUserEntrys[i].name = user.profile.name
    //       newFetchedUserEntrys[i].lastName = user.profile.lastName
    //   });
    // })
    // newFetchedUserEntrys.map(newFetchedUserEntry => {
    //   newFetchedUserEntry.tours = []
    //   newFetchedUserEntry.users = []
    // })
   new Angular2Csv(newFetchedUserEntrys, 'My Report');
  }

}
