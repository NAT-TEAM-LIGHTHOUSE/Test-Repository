import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonIcon } from '@ionic/angular/standalone';
// import { applyLoggingDecorator } from 'src/app/loggingDescorator';
import { Globalobjects } from '../../../../../services/globalobjects';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentComponent implements OnInit {
  @Input() template_type: any;
  @Input() data2: any;
  @Input() data: any;
  @Input() styletype: any;
  @Input() card_heading_bg: any;
  @Input() payment_data_div: any;
 @Input() user_template: any;
  card2textcolour: any;
  card2bgcolour: any;
  card1textcolour: any;
  bodybgcolour: any;
  card1bgcolour: any;
  bodytextcolour: any;
  copiedValue: string | null = null;

  constructor(public globalObject: Globalobjects) {
    // if (this.globalObject.isTemplate){
    //           return applyLoggingDecorator(this,"payment")
    //         }
  }

  ngOnInit() {
      console.log(this.template_type)
      console.log(this.data)

    if (this.data2) {
      this.card2textcolour = this.data2?.data[0].card_text_color2;
      this.card2bgcolour = this.data2?.data[0].card_back_color2;
      // this.card1textcolour = this.data2?.data[0].card_text_color1;
      this.bodybgcolour = this.data2?.data[0].back_body_color;
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

copiedField: { index: number; key: string } | null = null;


copyText(value: string, index: number, key: string) {
  if (!value) return;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(value)
      .then(() => this.showCopied(index, key))
      .catch(() => this.fallbackCopy(value, index, key));
  } else {
    this.fallbackCopy(value, index, key);
  }
}

fallbackCopy(value: string, index: number, key: string) {
  const textarea = document.createElement('textarea');
  textarea.value = value;

  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);

  textarea.focus();
  textarea.select();

  document.execCommand('copy');

  document.body.removeChild(textarea);

  this.showCopied(index, key);
}

showCopied(index: number, key: string) {
  this.copiedField = { index, key };

  setTimeout(() => {
    this.copiedField = null;
  }, 1000);
}

hasPaymentData(data: any): boolean {
  if (!data?.data || !Array.isArray(data.data)) {
    return false;
  }

  return data.data.some((a: any) =>
    !!a?.paytm ||
    !!a?.upi ||
    !!a?.phonepay ||
    !!a?.google_pay ||
    (!!a?.account_number && !!a?.ifsc_code) ||
     !!a?.qr_image1 ||
       !!a?.qr_image2 
  );
}

}
