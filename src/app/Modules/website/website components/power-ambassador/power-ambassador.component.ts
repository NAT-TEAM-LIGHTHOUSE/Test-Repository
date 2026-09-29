import { Component, OnInit } from '@angular/core';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-power-ambassador',
  templateUrl: './power-ambassador.component.html',
  styleUrls: ['./power-ambassador.component.scss'],
})
export class PowerAmbassadorComponent  implements OnInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) {
    
   }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('power-ambassador');
  }

}
