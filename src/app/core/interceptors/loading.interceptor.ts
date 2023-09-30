import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requests: number = 0;
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.requests++;
    this.loadingService.activateLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.requests--;
        if (this.requests === 0) {
          this.loadingService.activateLoading(false);
        }
      })
    );
  }
}
