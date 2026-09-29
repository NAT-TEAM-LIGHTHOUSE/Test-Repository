import { Component, OnInit } from '@angular/core';

import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-edit-profile-tutorials',
  templateUrl: './edit-profile-tutorials.component.html',
  styleUrls: ['./edit-profile-tutorials.component.scss'],
})
export class EditProfileTutorialsComponent  implements OnInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('edit-profile-tutorials');
  }

}
