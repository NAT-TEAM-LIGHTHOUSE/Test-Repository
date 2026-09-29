import { Component, OnInit } from '@angular/core';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss'],
})
export class TermsOfUseComponent  implements OnInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('terms-of-use');
  }

}
