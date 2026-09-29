import { Component, OnInit } from '@angular/core';
import { ApplicationFormComponent } from '../application-form/application-form.component';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
@Component({
  selector: 'app-video-editor',
  templateUrl: './video-editor.component.html',
  styleUrls: ['./video-editor.component.scss'],
  standalone:true,
  imports: [ApplicationFormComponent]
})
export class VideoEditorComponent  implements OnInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService) { }
designation_flag=false;
   designation:any='Video Editor';
  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('video-editor');
  }

}
