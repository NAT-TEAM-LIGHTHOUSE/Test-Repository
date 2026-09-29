import { Component, OnInit,Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';import { Globalobjects } from '../../../../../services/globalobjects';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExperienceComponent  implements OnInit {
  @Input() template_type:any;
  @Input() data:any;
   @Input() data2:any;
   @Input() card_heading_bg:any;
      @Input() styletype:any;
 @Input() user_template: any;
   
   card2textcolour:any;
   card2bgcolour:any;
   card1textcolour:any;
   bodybgcolour:any;
   card1bgcolour:any;
  bodytextcolour: any;

// -------- for  see more btn  new web template (2,3) -------
showAllExperience = false;
   
  constructor() { 
      // if(this.globalObject.isTemplate){
      //      return applyLoggingDecorator(this,"exprience-component")
      // }
  }

  ngOnInit() {
  // console.log(this.data)
 if(this.data2){
this.card2textcolour=this.data2?.data[0].card_text_color2;
this.card2bgcolour=this.data2?.data[0].card_back_color2;
// this.card1textcolour=this.data2?.data[0].card_text_color1;
this.bodybgcolour=this.data2?.data[0].back_body_color;
 this.bodytextcolour= this.data2?.data[0].body_text_color;
    // this.card1bgcolour=this.data2?.data[0].card_background_color1;

       if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = this.user_template?.data[0]?.card_text_color1 ? this.user_template?.data[0]?.card_text_color1 : this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =  this.user_template?.data[0]?.card_background_color1 ? this.user_template?.data[0]?.card_background_color1 : this.data2?.data[0]?.card_background_color1;
    } else {
      this.card1textcolour =  this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =   this.data2?.data[0]?.card_background_color1;
    }

 }


    
  }

}
