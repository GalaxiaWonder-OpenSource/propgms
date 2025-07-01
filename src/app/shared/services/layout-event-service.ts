import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type LayoutEvent =
  | { type: 'SNACKBAR'; level: 'success' | 'error' | 'info'; message: string }
  | { type: 'SWITCH_TAB'; to: string }
  | { type: 'SWITCH_LAYOUT'; layoutId: string };

@Injectable({ providedIn: 'root' })
export class LayoutEventService {
  private _events$ = new Subject<LayoutEvent>();
  readonly events$ = this._events$.asObservable();

  emit(event: LayoutEvent) {
    this._events$.next(event);
  }
}

