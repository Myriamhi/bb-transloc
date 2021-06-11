import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response, Headers, Http, RequestOptions} from '@angular/http';
import {ErrorService} from '../errorHandler/error.service';
import {Tour} from './tour.model';
import { AuthService } from '../auth/auth.service';
import { Config } from '../shared/config.model';
// import {ToastsManager} from 'ng2-toastr';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';



@Injectable()
export class TourService {


  private url = Config.backendURL;
//  private token: string = localStorage.getItem('id_token');
//  private userId: string = localStorage.getItem('userId');
  // private toursForCurrentUser: Tour[] = [];
  // private singleTour = Object;

  constructor(
    private http: Http,
    private errorService: ErrorService,
    // private toastr: ToastsManager,
    private authService: AuthService) {}


  getToursGraph(search: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    const options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'tour/graph/' , options)
      .timeout(15000)
      .map((response: Response) => {
        const tours = response.json();
        return tours;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }


  downloadPDF(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.get(this.url + 'tour/pdf/' + id, {headers: headers})
      .map((response: Response) => {
        return response.json().item;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  getTours(page: number, search: any) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token)
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'tour/page/' + page , options)
      .timeout(15000)
      .map((response: Response) => {
        const tours = response.json();
        return tours;
      })
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  //
  // getTourForCurrentUser() {
  //   // if(this.toursForCurrentUser.length) {
  //   //   return Observable.of(this.toursForCurrentUser)
  //   // } else {
  //   //   let id = this.authService.currentUser.userId
  //   //   let headers = new Headers({'Content-Type': 'application/json'});
  //   //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   //   return this.http.get(this.url + 'tour/byuserid/' + id, {headers: headers})
  //   //     .map((response: Response) => {
  //   //       this.toursForCurrentUser = response.json().item
  //   //       return this.toursForCurrentUser
  //   //     })
  //   //     .catch((error: Response) => {
  //   //       this.errorService.handleError(error.json());
  //   //       return Observable.throw(error.json());
  //   //     });
  //   // }
  //   let id = this.authService.currentUser.userId
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'tour/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }

  // getTourByUserId(id: string) {
  //   let headers = new Headers({'Content-Type': 'application/json'});
  //   headers.append('Authorization', '' + this.authService.currentUser.token);
  //   return this.http.get(this.url + 'tour/byuserid/' + id, {headers: headers})
  //     .map((response: Response) => {
  //       return response.json().item
  //     })
  //     .catch((error: Response) => {
  //       this.errorService.handleError(error.json());
  //       return Observable.throw(error.json());
  //     });
  // }


  getTour(id: string, search: any) : Observable<Tour> {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.url + 'tour/' + id, options)
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
  deleteTour(id: string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.delete(this.url + 'tour/' + id, {headers: headers})
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

  saveTour(tour: Tour) {
  //  console.log("this.authService.currentUser.token",this.authService.currentUser.token);
    delete tour._id;
    const body = JSON.stringify(tour);
    const headers = new Headers({'Content-Type': 'application/json'});
  //  let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.post(this.url + 'tour/',body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  updateTour(tour: Tour) {
    const body = JSON.stringify(tour);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', '' + this.authService.currentUser.token);
    return this.http.put(this.url + 'tour/' + tour._id, body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

}
