import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Globalobjects } from '../../../../services/globalobjects';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  imports: [ RouterLink]
})
export class PriceComponent  implements OnInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService,public globalObject: Globalobjects) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('price');
  }
 openWhatsApp(): void {
  window.open(
    'https://wa.me/919158883141',
    '_blank',
    'noopener,noreferrer'
  );
}
}
