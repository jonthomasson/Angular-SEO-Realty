import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { catchError, from, map, Observable, shareReplay, switchMap, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { PexelResponse, Property, ResponsePacket } from '../interfaces/home';

@Injectable({
  providedIn: 'root'
})
export class HomesService {
  private apiBase = 'https://api.gateway.attomdata.com/propertyapi/v1.0.0'
  constructor(private http: HttpClient) {

  }

  //expose observables as private
  homesUrl = `${this.apiBase}/property/snapshot?latitude=37.961632&longitude=-121.275604&radius=1&pagesize=30`;
  private homes$ = this.http.get<ResponsePacket>(this.homesUrl).pipe(
    map((data) => data),
    shareReplay(1),
    catchError(this.handleError)
  );

  homesPicsUrl = `https://api.pexels.com/v1/search?query=house&per_page=30&page=2`;
  //using fetch to avoid cors error.
  private homePics$: Observable<PexelResponse> = from(fetch(this.homesPicsUrl, {
    headers: {
      Authorization: environment.PEXELS_API_KEY
    }
  })).pipe(
    switchMap((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return from(response.json()) as Observable<PexelResponse>;
    }),
    catchError(this.handleError)
  );

  //expose our signals
  homePics = toSignal(this.homePics$, { });

  homes = toSignal(this.homes$, { initialValue: {} as ResponsePacket });
  homesWithPrices = computed<Property[]>(() => {
    const photos = [...(this.homePics()?.photos ?? [])];

    return this.homes()?.property?.map(property => {
      const randomPrice = 200000 + Math.floor(Math.random() * 800000);
      property.summary.price = `${this.formatPrice(randomPrice)}`;

      if (photos && photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * photos.length);
        const randomPhoto = photos[randomIndex];

        if (randomPhoto && randomPhoto.src && randomPhoto.src.tiny) {
          property.summary.tinyImageUrl = randomPhoto.src.tiny;
          property.summary.mediumImageUrl = randomPhoto.src.medium;

          photos.splice(randomIndex, 1);
        }
      }

      return property;
    });
  });


  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
  }

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


