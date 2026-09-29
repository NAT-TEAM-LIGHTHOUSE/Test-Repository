import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA ,HostListener, PLATFORM_ID, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonIcon } from '@ionic/angular/standalone';
// import { applyLoggingDecorator } from 'src/app/loggingDescorator';
import { Globalobjects } from '../../../../../services/globalobjects';
// import { STANDALONE_IMPORTS } from 'src/app/shared/ionic.imports';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QrcodeComponent implements OnInit {

  @Input() template_type: any;
  @Input() data: any;
  @Input() card_heading_bg: any;
  @Input() data2: any;
  @Input() styletype: any;
  @Input() qr_code_card_data: any;
  @Input() qr_code: any;
 @Input() user_template: any;
scan_qr_headings :any;
  card2textcolour: any;
  card1textcolour: any
  card2bgcolour: any;
  bodybgcolour: any;
  isHover: boolean = false;
  card1bgcolour: any;
  bodytextcolour: any;
 screenWidth = 0;
  constructor(public globalObject: Globalobjects,    @Inject(PLATFORM_ID) private platformId: Object) {
    // if (this.globalObject.isTemplate) {
    //   return applyLoggingDecorator(this, "qrcode")
    // }
  }

  ngOnInit() {

   this.updateScreenWidth();
    console.log(this.template_type)
    console.log(this.qr_code) 
    if( this.data2){

  
    this.card2textcolour = this.data2?.data[0].card_text_color2;
    this.card2bgcolour = this.data2?.data[0].card_back_color2;
    this.bodybgcolour = this.data2?.data[0].back_body_color;
    // this.card1textcolour = this.data2?.data[0].card_text_color1;
    // this.card1bgcolour = this.data2?.data[0].card_background_color1;
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



   // ----------get media screen px to apply style on mobile and desktop view ---------------

  //  screenWidth = window.innerWidth;

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.screenWidth = window.innerWidth;
  // }
  //   @HostListener('window:resize')
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
}
