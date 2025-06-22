import { Component } from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-footer',
  imports: [
    TranslatePipe,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  logoSource: string = "assets/images/icons/product_logo.svg";

  contact = {
    phone: '+51 930 180 813',
    email: 'ventas@galaxiawonder.com',
    address: 'Las Flores 22, Sta. Elizabeth II Etapa,<br> San Juan de Lurigancho'
  };
}
