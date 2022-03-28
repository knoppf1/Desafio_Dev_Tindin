import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  intercept(
    request: HttpRequest<unknown>,
     next: HttpHandler
     ): Observable<HttpEvent<unknown>> {
      let token = localStorage.getItem('x-api-key')!;


      request = request.clone({
          setHeaders: {
            auth: token,
      },
      })
    return next.handle(request);
  }
}
