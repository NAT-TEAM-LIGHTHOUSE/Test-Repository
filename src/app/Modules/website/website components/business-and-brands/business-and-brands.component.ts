import { Component, OnInit } from '@angular/core';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-business-and-brands',
  templateUrl: './business-and-brands.component.html',
  styleUrls: ['./business-and-brands.component.scss'],
    standalone: true,
})
export class BusinessAndBrandsComponent  implements OnInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('Business-and-Brands');
  }

}
