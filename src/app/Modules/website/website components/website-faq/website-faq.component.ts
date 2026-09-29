import { Component, OnInit } from '@angular/core';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-website-faq',
  templateUrl: './website-faq.component.html',
  styleUrls: ['./website-faq.component.scss'],
})
export class WebsiteFaqComponent  implements OnInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('faq');
  }
 openWhatsApp(): void {
  window.open(
    'https://wa.me/919158883141',
    '_blank',
    'noopener,noreferrer'
  );
}
}
