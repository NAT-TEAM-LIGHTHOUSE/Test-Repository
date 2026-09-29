import { Component, OnInit } from '@angular/core';
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-drop-your-resume',
  templateUrl: './drop-your-resume.component.html',
  styleUrls: ['./drop-your-resume.component.scss'],
  standalone:true,
   imports: [ApplicationFormComponent]
})
export class DropYourResumeComponent  implements OnInit {

  

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('Empower-Your-Future-Build-Your-Resume-with-PCARDS');
  }

}
