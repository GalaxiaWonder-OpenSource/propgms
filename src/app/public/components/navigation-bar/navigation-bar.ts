import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NavItem, NavItemCondition} from '../../model/navigation-item';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {LayoutEventService} from '../../../shared/services/layout-event-service';
import {MatMenuModule} from '@angular/material/menu';
import {AppContextService} from '../../../shared/services/app-context-service';
import {LanguageSwitcherComponent} from '../language-switcher/language-switcher';
import {Router} from '@angular/router';
import {UserAccountType} from '../../../iam/model/user-account-type';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.html',
  styleUrls: ['./navigation-bar.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    LanguageSwitcherComponent
  ]
})
export class NavigationBarComponent {
  @Input() navItems: NavItem[] = [];
  @Output() logoutRequested = new EventEmitter<void>();


  constructor(
    private layoutEvents: LayoutEventService,
    private appContext: AppContextService,
    private router: Router
  ) {}

  onClick(item: NavItem): void {
    this.layoutEvents.emit({
      type: 'SWITCH_TAB',
      to: item.route
    });
  }

  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef;

  ngAfterViewInit(): void {
    const el = this.scrollContainer.nativeElement;
    el.addEventListener('wheel', (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    }, { passive: false });
  }

  onLogoutClick(): void {
    this.appContext.personId = undefined;
    this.appContext.token = undefined;
    this.appContext.accountType = undefined;

    this.layoutEvents.emit({
      type: 'SWITCH_LAYOUT',
      layoutId: '/auth'
    });
  }

  isConditionMet(condition?: NavItemCondition): boolean {
    if (!condition) return true;

    switch (condition) {
      case NavItemCondition.MUST_BE_OWNER:
        const currentOrg = this.appContext.organization
        const personId = this.appContext.personId
        return !!currentOrg && currentOrg.createdBy === this.appContext.personId;

      default:
        return true;
    }
  }

  shouldShowBackButton(): boolean {
    const path = this.extractBasePath();

    return !(path === 'worker' || path === 'client');
  }

  navigateBack(): void {
    const path = this.extractBasePath();

    switch (path) {
      case 'organizations':
        this.layoutEvents.emit({
          type: 'SWITCH_LAYOUT',
          layoutId: '/worker'
        });
        break;
      case 'projects':
        this.layoutEvents.emit({
          type: 'SWITCH_LAYOUT',
          layoutId: '/organizations' + this.appContext.organization?.id
        });
        break;
      case 'project-tracking':
        this.layoutEvents.emit({
          type: 'SWITCH_LAYOUT',
          layoutId: '/client'
        });
        break;
      default:
        return;
    }
  }

  private extractBasePath(): string {
    const url = this.router.url;
    const match = url.match(/^\/([^\/\?]+)/);
    return match ? match[1] : '';
  }
}
