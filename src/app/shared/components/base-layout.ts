import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutEventService } from '../services/layout-event-service';
import { SnackbarService } from '../services/snackbar-service';

@Directive()
export abstract class BaseLayout implements OnInit {
  constructor(
    protected layoutEvents: LayoutEventService,
    protected router: Router,
    protected snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.layoutEvents.events$.subscribe(event => {
      switch (event.type) {
        case 'SNACKBAR':
          this.snackbar[event.level](event.message);
          break;

        case 'SWITCH_TAB':
          this.router.navigateByUrl(event.to);
          break;

        case 'SWITCH_LAYOUT':
          this.handleLayoutChange(event.layoutId);
          break;
      }
    });
  }

  protected handleLayoutChange(layoutId: string): void {
    // Default layout behavior, can (and most likely will) be overridden
    switch (layoutId) {
      case 'auth':
        this.router.navigateByUrl('/login');
        break;
      case 'main':
        this.router.navigateByUrl('/dashboard');
        break;
      default:
        console.warn(`Unknown layoutId: ${layoutId}`);
    }
  }
}
