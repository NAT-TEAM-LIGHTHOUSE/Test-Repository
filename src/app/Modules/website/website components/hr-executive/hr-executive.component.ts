import { Component, OnInit } from '@angular/core';
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-hr-executive',
  templateUrl: './hr-executive.component.html',
  styleUrls: ['./hr-executive.component.scss'],
  standalone:true,
   imports: [ApplicationFormComponent]
})
export class HrExecutiveComponent  implements OnInit {
designation_flag=false;
   designation:any='Hr Executive';
  constructor(private websiteSeo : WebsiteSeoSyncService) {
     this.websiteSeo.applySeoByPageName("hr-executive");
   }

  ngOnInit() {
    console.log( this.websiteSeo.applySeoByPageName("hr-executive"))
  }

}
