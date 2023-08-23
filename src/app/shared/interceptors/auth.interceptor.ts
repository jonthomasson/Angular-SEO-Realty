import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment'; 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //console.log('intercepting');
    //console.log(environment.ATTOM_API_KEY);
    const apiKeyRequest = request.clone({
      setHeaders: {
        APIKey: environment.ATTOM_API_KEY
      }
    });
    
    return next.handle(apiKeyRequest);
  }
}
