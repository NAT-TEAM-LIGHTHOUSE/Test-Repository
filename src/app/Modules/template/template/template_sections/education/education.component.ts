import { Component, OnInit, Input, PLATFORM_ID, Inject, CUSTOM_ELEMENTS_SCHEMA,OnChanges } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Globalobjects } from '../../../../../services/globalobjects';
import { FormsModule } from '@angular/forms';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceComponent } from '../experience/experience.component';
import { HostListener } from '@angular/core';
import { GallaryComponent } from '../gallary/gallary.component';
import { VideoComponent } from '../video/video.component';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,SkillsComponent,ExperienceComponent,GallaryComponent,VideoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EducationComponent  implements OnInit,OnChanges {
    @Input() template_type:any;
  @Input() data:any;
   @Input() data2:any;
   @Input() card_heading_bg:any;
      @Input() styletype:any;
      @Input() skills:any;
  @Input() experience:any;
@Input() passid:any;
   @Input() photo_gallery:any;
      @Input() video:any;
       @Input() user_template: any;

@HostListener('window:resize')
onResize() {
  this.detectViewport();
}
   
   card2textcolour:any;
   card2bgcolour:any;
   card1textcolour:any;
   card1bgcolour:any
   bodybgcolour:any;
  bodytextcolour: any;

  constructor(private globalObject: Globalobjects, @Inject(PLATFORM_ID) private platformId: Object) {
    //  if (this.globalObject.isTemplate){
    //            return applyLoggingDecorator(this,"education")
    //          }
   }
isMobile: boolean = false;  //for tab structure and mobile view (skills, edu, exp) 


// -------- for  see more btn  new web template (2,3) -------
showAllEducation = false;


 ngOnInit() {
  console.log(this.passid)
  if (this.data2) {
    this.card2textcolour = this.data2?.data[0].card_text_color2;
    this.card2bgcolour = this.data2?.data[0].card_back_color2;
    // this.card1textcolour = this.data2?.data[0].card_text_color1;
    // this.card1bgcolour = this.data2?.data[0].card_background_color1;
    this.bodybgcolour = this.data2?.data[0].back_body_color;
    this.bodytextcolour = this.data2?.data[0].body_text_color;

       if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = this.user_template?.data[0]?.card_text_color1 ? this.user_template?.data[0]?.card_text_color1 : this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =  this.user_template?.data[0]?.card_background_color1 ? this.user_template?.data[0]?.card_background_color1 : this.data2?.data[0]?.card_background_color1;
    } else {
      this.card1textcolour =  this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =   this.data2?.data[0]?.card_background_color1;
    }
  }

  if (this.data?.flag > 0) {
    this.activeTab = 'education';
  } else if (this.skills?.flag > 0) {
    this.activeTab = 'skills';
  } else if (this.experience?.flag > 0) {
    this.activeTab = 'experience';
  }

  if (isPlatformBrowser(this.platformId)) {
    this.detectViewport();
  }
}

ngOnChanges(changes: any) {
  if (changes['passid'] && changes['passid'].currentValue) {
    const id = changes['passid'].currentValue;
    console.log("chnage id "+id)
    if(this.isMobile){
      if (id === 'education') {
      this.activeTab = 'education1';
      } else if (id === 'skills') {
        this.activeTab = 'skills';
      } else if (id === 'experience') {
        this.activeTab = 'experience';
      }
    }else{
      if (id === 'education') {
      this.activeTab = 'education';
      } else if (id === 'skills') {
        this.activeTab = 'skills';
      } else if (id === 'experience') {
        this.activeTab = 'experience';
      }
    }
    
  }
}

  //------------- tab swtich logic ( edu, skills , exp) for template 7 ----------------

//   ngAfterViewInit() {
//   if (isPlatformBrowser(this.platformId)) {
//     window.addEventListener('resize', () => this.detectViewport());
//   }
// }

detectViewport() {
  if (isPlatformBrowser(this.platformId)) {
    this.isMobile = window.innerWidth <= 767;
    console.log('isMobile:', this.isMobile);
  }
}


  activeTab: string = 'education';

setTab(tab: string) {
  this.activeTab = tab;
}



// ----------------------------------

}
