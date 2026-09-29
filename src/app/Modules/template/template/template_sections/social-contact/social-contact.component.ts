import { Component, Input, OnInit, OnChanges, SimpleChanges, CUSTOM_ELEMENTS_SCHEMA, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Globalobjects } from '../../../../../services/globalobjects';

@Component({
  selector: 'app-social-contact',
  templateUrl: './social-contact.component.html',
  styleUrls: ['./social-contact.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SocialContactComponent implements OnInit {
  bodytextcolour: any;

  encodeURIComponent(value: string): string {
    return encodeURIComponent(value);
  }
screenWidth:any

  @Input() template_type: any;
 @Input() user_template: any;
  @Input() data: any;
  @Input() social: any;
  @Input() data2: any;
  @Input() social_contact_links: any;
  @Input() social_contact_a : any;
  @Input() social_contact_span: any;
  @Input() social_contact: any;
  @Input() social_contact_i: any;
    @Input() social_data: any;

  


  hover = false;
  isHover: boolean = false;

  card2textcolour: any;
  card2bgcolour: any;
  card1textcolour: any;
  card1bgcolour: any;
    bodybgcolour: any;

  constructor(public globalObject: Globalobjects, @Inject(PLATFORM_ID) private platformId: Object) {
    // if (this.globalObject.isTemplate) {
    //   return applyLoggingDecorator(this, "social-contact")
    // }
  }

  ngOnInit() {
     console.log(this.user_template)
    //   console.log(this.social_contact_a)
    
      console.log(this.data)
     console.log(this.social_data)
     if(this.data2){
 if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = this.user_template?.data[0]?.card_text_color1 ? this.user_template?.data[0]?.card_text_color1 : this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =  this.user_template?.data[0]?.card_background_color1 ? this.user_template?.data[0]?.card_background_color1 : this.data2?.data[0]?.card_background_color1;
    } else {
      this.card1textcolour =  this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =   this.data2?.data[0]?.card_background_color1;
    }




    this.card2textcolour = this.data2?.data[0].card_text_color2;
    this.card2bgcolour = this.data2?.data[0].card_back_color2;
    // this.card1textcolour = this.data2?.data[0].card_text_color1;
    // this.card1bgcolour = this.data2?.data[0].card_background_color1;
     this.bodybgcolour = this.data2?.data[0].back_body_color;
      this.bodytextcolour= this.data2?.data[0].body_text_color;
     }
     this.updateScreenWidth();

  }

    //  screenWidth = 0;
  
    // @HostListener('window:resize')
    // onResize() {
    //   if (isPlatformBrowser(this.platformId)) {
    //     this.screenWidth = window.innerWidth;
    //   }
    // }


    @HostListener('window:resize')
onResize() {
  this.updateScreenWidth();
}

private updateScreenWidth() {
  if (isPlatformBrowser(this.platformId)) {
    this.screenWidth = window.innerWidth;
    console.log('screenWidth:', this.screenWidth);
  }
}
    
// --------------------- hover effect for new template -7 ( hover on social contact one by one )------- 
  hoveredIndex: number | null = null;
hoveredType: string | null = null;

setHover(index: number, type: string) {
  this.hoveredIndex = index;
  this.hoveredType = type;
}

clearHover() {
  this.hoveredIndex = null;
  this.hoveredType = null;
}

getHoverStyle(index: number, type: string) {
  const isActive =
    this.hoveredIndex === index && this.hoveredType === type;

  return isActive
    ? {
      
          color: this.screenWidth > 767 ? this.card1textcolour : this.card1bgcolour,
        background: this.screenWidth > 767 ? this.card1bgcolour : this.card1textcolour,
        border:  `1px solid ${this.card1bgcolour}` 
      }
    : {                                    
         background: this.screenWidth > 767 ? this.card1textcolour : this.card1bgcolour,
        color: this.screenWidth > 767 ? this.card1bgcolour : this.card1textcolour,
        border:`1px solid ${this.card1bgcolour}`
      };
}

// --------------------- hover effect for new template -8 , template 9 ( hover on social contact one by one )------- 
getHoverStyleTemplateWeb2(index: number, type: string) {
  const isActive =
    this.hoveredIndex === index && this.hoveredType === type;

  return isActive
    ? {
      
        background: this.card1textcolour,
        color: this.card1bgcolour,
         border:`1px solid ${this.card1bgcolour}`

      }
    : {                                    
          color: this.card1textcolour,
        background: this.card1bgcolour,
         border:`1px solid ${this.card1bgcolour}`

      };
}

// ----------------------------------------------


  getGoogleMapLink(address: string): string {
  if (!address) return '';

  // If already a URL (maps.app.goo.gl or google.com/maps)
  if (address.startsWith('http')) {
    return address;
  }

  // Otherwise treat it as text address
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}



isValid(value: any): boolean {
  return (
    value != null &&
    value != undefined &&
    value != '' &&
    value !='null' &&
    value !='undefined' &&
    value?.toString().trim() != ''
  );
}


open() {
  const url = this.data?.data?.[0]?.google_map_url;

  // 🚫 stop here for null, "null", undefined, empty, spaces
  if (!this.isValidUrl(url)) {
    return;
  }

  window.open(this.getGoogleMapLink(url), '_blank');
}



// isValidUrl(value: any): boolean {
//   if (value === null || value === undefined) return false;

//   const v = value.toString().trim().toLowerCase();

//   return v !== '' && v !== 'null' && v !== 'undefined';

  
// }

isValidUrl(value: any): boolean {
  if (!value) return false;

  const v = value.toString().trim().toLowerCase();

  return /^(http|https):\/\/.+/.test(v);
}

}
