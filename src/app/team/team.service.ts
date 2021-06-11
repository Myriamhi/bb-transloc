import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Team} from './team.model';
import { AuthService } from '../auth/auth.service';
import { Config } from '../shared/config.model';
// import {ToastsManager} from 'ng2-toastr';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';



@Injectable()
export class TeamService {


  private url = Config.backendURL;
//  private token: string = localStorage.getItem('id_token');
//  private userId: string = localStorage.getItem('userId');
  // private teamsForCurrentUser: Team[] = [];
  // private singleTeam = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    // private toastr: ToastsManager,
    private authService: AuthService) {}


  getTeamsGraph(search: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    const options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'team/graph/' , options)
      .timeout(15000)
      .map((response: Response) => {
        const teams = response.json();
        return teams;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  downloadPDF(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'team/pdf/' + id, {headers: headers})
      .map((response: Response) => {
        return response.json().item;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getTeams(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'team/page/' + page , options)
      .timeout(15000)
      .map((response: Response) => {
        const teams = response.json();
        return teams;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  //
  // getTeamForCurrentUser() {
  //   // if(this.teamsForCurrentUser.length) {
  //   //   return Observable.of(this.teamsForCurrentUser)
  //   // } else {
  //   //   let id = this.authService.currentUser.userId
  //   //   let headers = new Headers({'Content-Type': 'application/json'});
  //   //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   //   return this.http.get(this.url + 'team/byuserid/' + id, {headers: headers})
  //   //     .map((response: Response) => {
  //   //       this.teamsForCurrentUser = response.json().item
  //   //       return this.teamsForCurrentUser
  //   //     })
  //   //     .catch((error: Response) => {
  //   //       this.errorService.handleError(error.json());
  //   //       return Observable.throw(error.json());
  //   //     });
  //   // }
  //   let id = this.authService.currentUser.userId
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'team/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }

  // getTeamByUserId(id: string) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'team/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }


  getTeam(id: string, search: any) : Observable<Team> {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'team/' + id, options)
      .map((response: Response) => {
        return response.json().item;
      //  this.singleForm = response.json();
        //return this.singleForm;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  deleteTeam(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'team/' + id, {headers: headers})
      .map((response: Response) => {
      //  console.log("delete",response)
        return response.json();
      //  this.singleForm = response.json();
        //return this.singleForm;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  saveTeam(team: Team) {
  //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
    delete team._id;
    const body = JSON.stringify(team);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'team/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateTeam(team: Team) {
    const body = JSON.stringify(team);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'team/' + team._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

}
