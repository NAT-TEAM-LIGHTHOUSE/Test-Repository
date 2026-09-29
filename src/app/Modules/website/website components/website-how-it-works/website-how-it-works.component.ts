import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-website-how-it-works',
  templateUrl: './website-how-it-works.component.html',
  styleUrls: ['./website-how-it-works.component.scss'],
})
export class WebsiteHowItWorksComponent  implements OnInit {
  constructor(private router: Router, private websiteSeoSyncService: WebsiteSeoSyncService) {}  


  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('how-it-works');
  }
goToEditProfileTutorial() {
  this.router.navigate(['/digital/edit-profile-tutorials']);
}

goToShareMultiplePCardProfileTutorial() {
  this.router.navigate(['/digital/multiple-ways-to-share-your-pcards-profiles']);
}

}
