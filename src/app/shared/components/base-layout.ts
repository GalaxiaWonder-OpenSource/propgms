import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutEventService } from '../services/layout-event-service';
import { SnackbarService } from '../services/snackbar-service';
import {TranslateService} from '@ngx-translate/core';

@Directive()
export abstract class BaseLayout implements OnInit {
  constructor(
    protected layoutEvents: LayoutEventService,
    protected router: Router,
    protected snackbar: SnackbarService,
    protected translate: TranslateService
  ) {}

  protected currentBaseUrl: string = "";

  ngOnInit(): void {
    this.currentBaseUrl = this.getBaseUrl();

    this.layoutEvents.events$.subscribe(event => {
      switch (event.type) {
        case 'SNACKBAR':
          const translatedMessage = this.translate.instant(event.message);
          this.snackbar[event.level](translatedMessage);
          break;

        case 'SWITCH_TAB':
          const targetUrl = `${this.currentBaseUrl}/${event.to}`;
          this.router.navigateByUrl(targetUrl);
          break;

        case 'SWITCH_LAYOUT':
          this.router.navigateByUrl(event.layoutId);
          break;
      }
    });
  }

  private getBaseUrl(): string {
    const url = this.router.url;
    return url.substring(0, url.lastIndexOf('/'));
  }
}
