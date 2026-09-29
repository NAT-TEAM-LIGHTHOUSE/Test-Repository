import { Component, OnInit } from '@angular/core';
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';

@Component({
  selector: 'app-sales-executive',
  templateUrl: './sales-executive.component.html',
  styleUrls: ['./sales-executive.component.scss'],
  standalone:true,
   imports: [ApplicationFormComponent]
   
})
export class SalesExecutiveComponent  implements OnInit {

  constructor(private  websiteSeo : WebsiteSeoSyncService) { 
    this.websiteSeo.applySeoByPageName("sales-executive");
  }
   designation_flag=false;
   designation:any='Sales Executive';
  ngOnInit() {}

}
