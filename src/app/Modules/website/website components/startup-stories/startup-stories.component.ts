import { Component, OnInit } from '@angular/core';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-startup-stories',
  templateUrl: './startup-stories.component.html',
  styleUrls: ['./startup-stories.component.scss'],
    standalone: true,
})
export class StartupStoriesComponent  implements OnInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('startup-stories');
  }

}
