import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { TourService} from '../../tour/tour.service';
import { Tour} from '../../tour/tour.model';
import { MatDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Search, PaginationData} from '../../shared/shared.model';
import { GlobalEventsManager } from '../../globalEventsManager';
import { TourDialogComponent } from '../single/dialog/tourDialog.component';


@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['../tour.component.css'],
})
export class ToursComponent implements OnInit, OnChanges {
  @Input() search: Search = new Search();
  @Input() showBack: number = -1;
  loading = false;
  fetchedTours: Tour[] = [];
  paginationData = new PaginationData();


  constructor(
    private tourService: TourService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private globalEventsManager: GlobalEventsManager,
  ) {}



  ngOnChanges() {
    this.getTours(this.paginationData.currentPage, this.search);
  }

  ngOnInit() {
    this.getToursInit();
  }

  getToursInit() {
    const this2 = this;
    setTimeout(function(){
      this2.search.orderBy = 'name';
      this2.getTours(1, this2.search)
    }, 200);
  }

  searchInput() {
    this.getTours(this.paginationData.currentPage, this.search);
  }

  orderBy(orderBy: string) {
    this.search.orderBy = orderBy;
    this.getTours(this.paginationData.currentPage, this.search);
  }


  getPage(page: number) {
    this.getTours(page, this.search);
  }


  getTours(page: number, search: any) {
    this.loading = true;
    this.tourService.getTours(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedTours =  res.data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log(error);
        }
      );
  }
  saved(result) {
    this.getTours(1, this.search);
  }

  openDialogPaiement(tourId: string) {
    const dialogRef = this.dialog.open(TourDialogComponent, {
      data : {
        search: {
          tourId: tourId
        }
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getTours(this.paginationData.currentPage, this.search);
    })
  }

}
