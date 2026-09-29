import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonIcon } from '@ionic/angular/standalone';
import { Globalobjects } from '../../../../../services/globalobjects';
import { WhatsappSettingsComponent } from '../whatsapp-settings/whatsapp-settings.component';


@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, WhatsappSettingsComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CompanyInfoComponent implements OnInit {
  @Input() template_type: any;
  @Input() data: any;
  @Input() data2: any;
  @Input() card_heading_bg: any;
  @Input() styletype: any;
  @Input() about_company_data: any;
  @Input() about_company_sub_heading: any;
 @Input() profileImageg: any;

 @Input() qr_code: any;
 
    @Input() profileData: any;
  @Input() datas: any;
  @Input() whatsapp_enquiry: any;
  @Input() pcard_url_template: any;
  @Input() profileImage: any;
  @Input() template_url: any;
  @Input() user_template: any;
 @Input() google_review: any;

  


  



about_company_image:any;
  card2textcolour: any;
  card2bgcolour: any;
  card1textcolour: any;
  bodybgcolour: any;
  card1bgcolour: any;
  bodytextcolour: any;
  constructor(private globalObject: Globalobjects) {
    // if (this.globalObject.isTemplate) {
    //   return applyLoggingDecorator(this, "company-info")
    // }
    // console.log(this.data)

  }

  ngOnInit() {
    console.log(this.user_template);
    console.log(this.qr_code)
    console.log(this.styletype)
console.log(this.qr_code) 
     if(this.data2){
      this.about_company_image= this.data2?.data[0].company_details_image;
       this.bodytextcolour= this.data2?.data[0].body_text_color;
    this.card2textcolour = this.data2?.data[0].card_text_color2;
    this.card2bgcolour = this.data2?.data[0].card_back_color2;
    // this.card1textcolour = this.data2?.data[0].card_text_color1;
    this.bodybgcolour = this.data2?.data[0].back_body_color;
    // this.card1bgcolour = this.data2?.data[0].card_background_color1;

       if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = this.user_template?.data[0]?.card_text_color1 ? this.user_template?.data[0]?.card_text_color1 : this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =  this.user_template?.data[0]?.card_background_color1 ? this.user_template?.data[0]?.card_background_color1 : this.data2?.data[0]?.card_background_color1;
    } else {
      this.card1textcolour =  this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =   this.data2?.data[0]?.card_background_color1;
    }

     }
  }


  

  hasAnyField(): boolean {
    const arr = this.data?.data;
    if (!Array.isArray(arr) || arr.length === 0) return false;
    const keys = ['company_name', 'company_category', 'company_description'];
    return arr.some(item => {
      if (!item || typeof item !== 'object') return false;
      return keys.some(k => {
        const v = item[k];
        if (Array.isArray(v)) return v.length > 0;
        if (v === null || v === undefined) return false;
        if (typeof v === 'string') return v.trim() !== '';
        return !!v;
      });
    });
  }

}
