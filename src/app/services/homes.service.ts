import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { PexelResponse, Property, ResponsePacket } from '../interfaces/home';
import { HOMES } from '../data/homes';
import { HOME_PHOTOS } from '../data/homePics';

@Injectable({
  providedIn: 'root'
})
export class HomesService {
  constructor(private http: HttpClient) { }

  // Using local data instead of making HTTP requests
  private homes$: Observable<ResponsePacket> = of(HOMES);
  private homePics$: Observable<PexelResponse> = of(HOME_PHOTOS);

  // Expose our signals
  homePics = toSignal(this.homePics$, {});
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
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
