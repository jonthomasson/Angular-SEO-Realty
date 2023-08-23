import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { ResponsePacket } from '../interfaces/home';

@Injectable({
  providedIn: 'root'
})
export class HomesService {
  private apiBase = 'https://api.gateway.attomdata.com/propertyapi/v1.0.0'
  constructor(private http: HttpClient) {

  }

  //expose observables as private
  homesUrl = `${this.apiBase}/property/snapshot?latitude=39.21523130910493&longitude=-75.62095642089844&radius=1`;
  private homes$ = this.http.get<ResponsePacket>(this.homesUrl).pipe(
    map((data) => data),
    shareReplay(1),
    catchError(this.handleError)
  );

  //expose our signals
  homes = toSignal(this.homes$, { initialValue: {} as ResponsePacket });


  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message
        }`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}


