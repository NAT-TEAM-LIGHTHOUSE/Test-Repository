import { Component, OnInit,Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { applyLoggingDecorator } from 'src/app/loggingDescorator';
import { Globalobjects } from '../../../../../services/globalobjects';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SkillsComponent  implements OnInit {
  @Input() template_type:any;
  @Input() data:any;
   @Input() data2:any;
      @Input() styletype:any;
     @Input() card_heading_bg:any;
      @Input() user_template: any;
card2textcolour:any;
    card2bgcolour:any;
    card1textcolour:any;
    bodybgcolour:any;
    card1bgcolour:any;
  bodytextcolour: any;

  // -------- for  see more btn  new web template (2,3) -------
showAllSkills = false;

  constructor(private globalObject:Globalobjects) { 
    // if(this.globalObject.isTemplate){
    //   return applyLoggingDecorator(this,"skill-component")
    // }
  }

  ngOnInit() {
    console.log(this.data)
    // console.log(this.data2)
     if(this.data2){
     this.card2textcolour=this.data2?.data[0].card_text_color2;
     this.card2bgcolour=this.data2?.data[0].card_back_color2;
      // this.card1textcolour=this.data2?.data[0].card_text_color1
      // this.card1bgcolour=this.data2?.data[0].card_background_color1;
      this.bodybgcolour=this.data2?.data[0].back_body_color;
       this.bodytextcolour= this.data2?.data[0].body_text_color;

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
