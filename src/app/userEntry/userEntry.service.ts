import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {UserEntry} from './userEntry.model';
import { AuthService } from '../auth/auth.service';
import { Config } from '../shared/config.model';
// import {ToastsManager} from 'ng2-toastr';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';



@Injectable()
export class UserEntryService {


  private url = Config.backendURL;
//  private token: string = localStorage.getItem('id_token');
//  private userId: string = localStorage.getItem('userId');
  // private userEntrysForCurrentUser: UserEntry[] = [];
  // private singleUserEntry = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    // private toastr: ToastsManager,
    private authService: AuthService) {}


  getUserEntrysGraph(search: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    const options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'userEntry/graph/' , options)
      .timeout(15000)
      .map((response: Response) => {
        const userEntrys = response.json();
        return userEntrys;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  downloadPDF(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'userEntry/pdf/' + id, {headers: headers})
      .map((response: Response) => {
        return response.json().item;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getUserEntrys(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'userEntry/page/' + page , options)
      .timeout(15000)
      .map((response: Response) => {
        const userEntrys = response.json();
        return userEntrys;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  //
  // getUserEntryForCurrentUser() {
  //   // if(this.userEntrysForCurrentUser.length) {
  //   //   return Observable.of(this.userEntrysForCurrentUser)
  //   // } else {
  //   //   let id = this.authService.currentUser.userId
  //   //   let headers = new Headers({'Content-Type': 'application/json'});
  //   //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   //   return this.http.get(this.url + 'userEntry/byuserid/' + id, {headers: headers})
  //   //     .map((response: Response) => {
  //   //       this.userEntrysForCurrentUser = response.json().item
  //   //       return this.userEntrysForCurrentUser
  //   //     })
  //   //     .catch((error: Response) => {
  //   //       this.errorService.handleError(error.json());
  //   //       return Observable.throw(error.json());
  //   //     });
  //   // }
  //   let id = this.authService.currentUser.userId
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'userEntry/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }

  // getUserEntryByUserId(id: string) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'userEntry/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }


  getUserEntry(id: string, search: any) : Observable<UserEntry> {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'userEntry/' + id, options)
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
  deleteUserEntry(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'userEntry/' + id, {headers: headers})
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

  saveUserEntry(userEntry: UserEntry) {
  //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
    delete userEntry._id;
    const body = JSON.stringify(userEntry);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'userEntry/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateUserEntry(userEntry: UserEntry) {
    const body = JSON.stringify(userEntry);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'userEntry/' + userEntry._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

}
