import { Component, OnInit } from '@angular/core';
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-business-development-executive',
  templateUrl: './business-development-executive.component.html',
  styleUrls: ['./business-development-executive.component.scss'],
  standalone:true,
   imports: [ApplicationFormComponent]
})
export class BusinessDevelopmentExecutiveComponent  implements OnInit {
 designation_flag=false;
 designation:any='Business Development Executive';
  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('business-development-executive');
  }

}
