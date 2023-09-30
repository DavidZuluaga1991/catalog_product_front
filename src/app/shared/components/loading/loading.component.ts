import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  private destroySubscribe$ = new Subject();
  public isActivate = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.getLoading
      .pipe(takeUntil(this.destroySubscribe$))
      .subscribe((loading) => {
        this.isActivate = loading;
      });
  }

  ngOnDestroy(): void {
    this.destroySubscribe$.next(true);
    this.destroySubscribe$.complete();
  }
}
