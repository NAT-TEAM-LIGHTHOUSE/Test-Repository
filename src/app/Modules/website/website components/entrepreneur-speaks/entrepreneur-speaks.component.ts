import { Component, OnInit } from '@angular/core';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-entrepreneur-speaks',
  templateUrl: './entrepreneur-speaks.component.html',
  styleUrls: ['./entrepreneur-speaks.component.scss'],
    standalone: true,
})
export class EntrepreneurSpeaksComponent  implements OnInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('entrepreneur-speaks');
  }

}
