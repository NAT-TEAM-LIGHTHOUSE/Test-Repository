import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonIcon } from '@ionic/angular/standalone';
import { Globalobjects } from '../../../../../services/globalobjects';


@Component({
  selector: 'app-other-links',
  templateUrl: './other-links.component.html',
  styleUrls: ['./other-links.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OtherLinksComponent implements OnInit {
  @Input() template_type: any;
  @Input() data2: any;
  @Input() data: any;
  @Input() other_links_icon: any;
  @Input() card_heading_bg: any;
 @Input() other_links_a: any;
  @Input() other_links_span: any;
 @Input() user_template: any;
      @Input() other_links_span_hover: any;

        @Input() other_links_icon_hover: any;

   @Input() styletype:any;
@Input() otherlinks_btns_div:any;



  card2bgcolour: any;
  card2textcolour: any;
  card1textcolour: any;
  card1bgcolour: any;
  bodybgcolour: any;
  bodytextcolour: any;
hoveredIndex: number | null = null;
  constructor(public globalObject: Globalobjects) {
    // if (this.globalObject.isTemplate) {
    //   return applyLoggingDecorator(this, "other-links")
    // }
  }

  ngOnInit() {
    // console.log(this.other_links_span)
     if(this.data2){
    this.card2textcolour = this.data2?.data[0].card_text_color2;
    this.card2bgcolour = this.data2?.data[0].card_back_color2;
    // this.card1textcolour = this.data2?.data[0].card_text_color1;
    // this.card1bgcolour = this.data2?.data[0].card_background_color1;
    this.bodybgcolour = this.data2?.data[0].back_body_color;
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
