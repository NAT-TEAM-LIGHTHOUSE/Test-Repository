import { Component, OnInit } from '@angular/core';
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-sales-intern',
  templateUrl: './sales-intern.component.html',
  styleUrls: ['./sales-intern.component.scss'],
  standalone:true,
  imports: [ApplicationFormComponent]
  
   
})
export class SalesInternComponent  implements OnInit {

  constructor(private websiteSeo : WebsiteSeoSyncService) {

    this.websiteSeo.applySeoByPageName("sales-intern");
   }
designation_flag=false;
   designation:any='Sales Intern';
  ngOnInit() {}

}
