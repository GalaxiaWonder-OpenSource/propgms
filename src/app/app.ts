import {Component} from '@angular/core';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatAnchor} from '@angular/material/button';
import {LanguageSwitcherComponent} from './public/components/language-switcher/language-switcher';
import {Footer} from './public/components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbar,
    MatToolbarRow,
    RouterLink,
    RouterOutlet,
    MatAnchor,
    LanguageSwitcherComponent,
    TranslatePipe,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'propgms';
  options = [
  ]

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
