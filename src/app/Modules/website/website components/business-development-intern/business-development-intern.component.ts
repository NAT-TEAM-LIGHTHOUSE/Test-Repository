import { Component, OnInit } from '@angular/core';
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-business-development-intern',
  templateUrl: './business-development-intern.component.html',
  styleUrls: ['./business-development-intern.component.scss'],
  standalone:true,
   imports: [ApplicationFormComponent]
})
export class BusinessDevelopmentInternComponent  implements OnInit {
designation_flag=false;
   designation:any='Business Development Intern';
  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('business-development-intern');
  }

}
