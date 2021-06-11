import { Component, OnInit, OnChanges, Input} from '@angular/core';
import { AuthService} from '../../auth/auth.service';
import { TeamService} from '../../team/team.service';
import { Team} from '../../team/team.model';
import { MatDialog} from '@angular/material';
import { Router} from '@angular/router';
import { Search, PaginationData} from '../../shared/shared.model';
import { GlobalEventsManager } from '../../globalEventsManager';
import { TeamDialogComponent } from '../single/dialog/teamDialog.component';


@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['../team.component.css'],
})
export class TeamsComponent implements OnInit, OnChanges {
  @Input() search: Search = new Search();
  @Input() showBack: number = -1;
  loading = false;
  fetchedTeams: Team[] = [];
  paginationData = new PaginationData();


  constructor(
    private teamService: TeamService,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private globalEventsManager: GlobalEventsManager,
  ) {}



  ngOnChanges() {
    this.getTeams(this.paginationData.currentPage, this.search);
  }

  ngOnInit() {
    this.getTeamsInit();
  }

  getTeamsInit() {
    const this2 = this
    setTimeout(function(){
      this2.search.orderBy = 'name';
      this2.getTeams(1, this2.search)
    }, 200);
  }

  searchInput() {
    this.getTeams(this.paginationData.currentPage, this.search);
  }

  orderBy(orderBy: string) {
    this.search.orderBy = orderBy;
    this.getTeams(this.paginationData.currentPage, this.search);
  }


  getPage(page: number) {
    this.getTeams(page, this.search);
  }


  getTeams(page: number, search: any) {
    this.loading = true;
    this.teamService.getTeams(page, search)
      .subscribe(
        res => {
          this.paginationData = res.paginationData;
          this.fetchedTeams =  res.data;
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log(error);
        }
      );
  }
  saved(result) {
    this.getTeams(1, this.search);
  }

  openDialogPaiement(teamId: string) {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      data : {
        search: {
          teamId: teamId
        }
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getTeams(this.paginationData.currentPage, this.search);
    })
  }

}
