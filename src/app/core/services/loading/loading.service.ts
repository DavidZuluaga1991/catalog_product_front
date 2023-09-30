import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingEvent: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  activateLoading(activate: boolean = false) {
    this.loadingEvent.next(activate);
  }

  get getLoading(): BehaviorSubject<boolean> {
    return this.loadingEvent;
  }
}
