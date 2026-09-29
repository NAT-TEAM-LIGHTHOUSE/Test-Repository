import { Component, OnInit } from '@angular/core';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-share-multiple-pcard-profile-tutorials',
  templateUrl: './share-multiple-pcard-profile-tutorials.component.html',
  styleUrls: ['./share-multiple-pcard-profile-tutorials.component.scss'],
})
export class ShareMultiplePcardProfileTutorialsComponent  implements OnInit {



  constructor(private websiteseoSyncService: WebsiteSeoSyncService) { }

  ngOnInit() {
    
    this.websiteseoSyncService.applySeoByPageName('multiple-ways-to-share-your-pcards-profiles');
  }

}
