import { Component, OnInit } from '@angular/core';
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-graphics-designer',
  templateUrl: './graphics-designer.component.html',
  styleUrls: ['./graphics-designer.component.scss'],
  standalone:true,
   imports: [ApplicationFormComponent]
})
export class GraphicsDesignerComponent  implements OnInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) { }
designation_flag=false;
   designation:any='Graphic Designer';
  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('graphics-designer');
  }

}
