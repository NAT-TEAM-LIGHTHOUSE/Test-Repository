import {
  Component,
  OnInit,
  Input,
  PLATFORM_ID,
  Inject,
  NgZone,
  HostListener,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';




import {
  isPlatformBrowser,
  isPlatformServer,
  CommonModule
} from '@angular/common';

import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import IntlTelInput from '@intl-tel-input/angular';

import { QrcodeComponent } from '../qrcode/qrcode.component';
import { Globalobjects } from '../../../../../services/globalobjects';
import { Login } from '../../../../../services/login';

@Component({
  selector: 'app-whatsapp-settings',
  templateUrl: './whatsapp-settings.component.html',
  styleUrls: ['./whatsapp-settings.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule, 
    QrcodeComponent,
    IntlTelInput
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WhatsappSettingsComponent implements OnInit {
   screenWidth :any;
   submitted = false;
showValidation = false;
  @Input() template_type: any;
  @Input() data: any;
  @Input() data2: any;
  @Input() profileImage: any;
  @Input() whatsapp_enquiry: any;
  @Input() pcard_url_template: any;
  @Input() data_1: any;
  @Input() template_url: any;
  @Input() datas: any;
  @Input() qr_code: any;
 @Input() user_template: any;
  @Input() company_info: any;
  @Input() google_review : any;
  loader: boolean = false;




  card1textcolour: any;
  operateSocialLink: any = "";
  card_text_color2: any;
  showErrors = false;
  card2bgcolour: any;
  card2textcolour: any;
  bodybgcolour: any;
  card1bgcolour: any;

  whastup: any = {
    mobile: '',
    name: ''
  }
  bodytextcolour: any;
  links: any;


  constructor(private zone: NgZone, public globalObject: Globalobjects, public loginService: Login,  @Inject(PLATFORM_ID) private platformId: Object) {
    // if (this.globalObject.isTemplate) {
    //   return applyLoggingDecorator(this, "template")
    // }
    // this.screenWidth = isPlatformBrowser(this.platformId) ? window.innerWidth : 0;
    this.updateScreenWidth();
  }

  ngOnInit() {
    // console.log(this.data2)
    // console.log(this.data)
    console.log(this.company_info)
    console.log(this.template_type)
    console.log(this.profileImage)
    console.log(this.google_review)

    // console.log(this.pcard_url_template)
    
    if (this.data2) {
      // this.card1textcolour = this.data2?.data[0].card_text_color1;
      this.card2textcolour = this.data2?.data[0].card_text_color2;
      this.bodybgcolour = this.data2?.data[0].back_body_color;
      // this.card1bgcolour = this.data2?.data[0].card_background_color1;
      this.card2bgcolour = this.data2.data[0].card_back_color2;
      this.bodytextcolour = this.data2?.data[0].body_text_color;


         if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = this.user_template?.data[0]?.card_text_color1 ? this.user_template?.data[0]?.card_text_color1 : this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =  this.user_template?.data[0]?.card_background_color1 ? this.user_template?.data[0]?.card_background_color1 : this.data2?.data[0]?.card_background_color1;
    } else {
      this.card1textcolour =  this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =   this.data2?.data[0]?.card_background_color1;
    }
    }


    this.addGoogleReview();

  }

 

  // New Submit form
//   Submit(data?: any) {
//   this.zone.run(() => {

//     if (isPlatformServer(this.platformId)) {
//       return;
//     }

//     // Name validation
//     if (!this.whastup.name?.trim()) {
//       this.showErrors = true;
//       this.phoneError = 'Name is required';
//       return;
//     }

//     // Phone validation
//     if (!this.phoneValid) {
//       this.showErrors = true;

//       if (!this.phoneError) {
//         this.phoneError = 'Please enter a valid WhatsApp number';
//       }

//       return;
//     }

//     this.showErrors = false;

//     const reqData = {
//       wsdp: this.whastup,
//       wslp: JSON.parse(
//         this.globalObject.getLocallData('tempDetails') || '{}'
//       )
//     };

//     this.loginService.postData(reqData, 'wpEnquiry').subscribe({
//       next: (res) => {

//         if (!res?.responseStatus?.includes('success')) {
//           return;
//         }

//         // E.164 → WhatsApp format
//         const fullPhone =
//           this.phoneNumberE164.replace(/\D/g, '');

//         const message =
//           this.whatsapp_enquiry?.data?.[0]?.description || '';

//         const appUrl =
//           `whatsapp://send?phone=${fullPhone}&text=${encodeURIComponent(message)}`;

//         const webUrl =
//           `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;

//         // if (this.platform.is('mobile')) {
//           window.location.href = appUrl;
//         // } else {
//           // window.open(webUrl, '_blank');
//         // }

//         this.whastup.mobile = '';
//         this.whastup.name = '';
//         this.phoneNumberE164 = '';
//         this.phoneValid = false;
//       },

//       error: (err) => {
//         console.error(err);
//       }
//     });

//   });
// }
// Submit(data?: any) {
//   this.zone.run(() => {

//     if (isPlatformServer(this.platformId)) {
//       return;
//     }

//     if ( !this.whastup.name) {
//       this.showErrors = true;
//       return;
//     }

//   const mobile = String(this.whastup.mobile || '').trim();

// if (!mobile) {
//   this.showErrors = true;
//   return;
// }

// if (!/^[6-9]\d{9}$/.test(mobile)) {
//   this.showErrors = true;
//   return;
// }
//     this.showErrors = false;

//     const reqData = {
//       wsdp: this.whastup,
//       wslp: JSON.parse(this.globalObject.getLocallData("tempDetails") || "{}")
//     };

//     this.loginService.postData(reqData, 'wpEnquiry').subscribe({
//       next: (res) => {

//         if (!res?.responseStatus?.includes('success')) {
//           return;
//         }

//         // Remove all non-numeric characters
//         const phone = this.whastup.mobile.replace(/\D/g, '');

//         // Add country code only if user entered 10 digits
//         const fullPhone = phone.length === 10 ? `91${phone}` : phone;

//         const message = this.whatsapp_enquiry?.data?.[0]?.description || '';

//         const appUrl =
//           `whatsapp://send?phone=${fullPhone}&text=${encodeURIComponent(message)}`;

//         const webUrl =
//           `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;

//         // Try opening WhatsApp app


//         if(this.platform.is('mobile')){

//           window.location.href = appUrl;
//         }
//         else{
//           // window.location.href = webUrl;
//           window.open(webUrl,"_blank");

//         }

//         // Fallback to web if app isn't installed
//         // setTimeout(() => {
//         // }, 1200);

//         // Clear form
//         this.whastup.mobile = '';
//         this.whastup.name = '';

//       },
//       error: (err) => {
//         console.error(err);
//       }
//     });

//   });
// }

  // checkToast(operation?: string) {
  //   this.toastr.success("Saved successfully");
  // }


  addGoogleReview() {
    
    if( this.globalObject.googleReviewLink ){
   this.links = this.globalObject.googleReviewLink;
    }else{
 const userCode = this.company_info?.data?.[0]?.user_code;
    if (!userCode) {
      return;
    }
    // this.globalObject.loader = true;
    const reqData = {
      wsdp: {
        user_code: userCode
      }
    };
    this.loginService.postData(reqData, 'getGoogleReviewData')
      .subscribe({
        next: (response: any) => {
          this.globalObject.loader = false;
          if (response?.link) {
            this.links=response.link;
            // window.open(response.link, '_blank');
          }
        },
        error: (err) => {
          this.globalObject.loader = false;
          console.error(err);
        }
      });
    }
   
  }




 // ----------get media screen px to apply style on mobile and desktop view ---------------

  //  screenWidth = 0;

  // @HostListener('window:resize', ['$event'])
  // onResize(_event: Event) {
  //   if (!isPlatformBrowser(this.platformId)) {
  //     return;
  //   }
  //   this.screenWidth = window.innerWidth;
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




// new code for whatsapp number validation
// phoneControl = new FormControl('', [
//   Validators.required
// ]);
phoneValid = false;
phoneError = '';

phoneControl = new FormControl('', {
  validators: [Validators.required]
});

loadUtils = () => import('intl-tel-input/utils');

onPhoneValidityChange(isValid: boolean): void {
  console.log('PHONE VALID:', isValid);

  this.phoneValid = isValid;

  if (isValid) {
    this.phoneError = '';
  } else {
    this.phoneError = 'Please enter a valid phone number for the selected country';
  }
}

onPhoneErrorChange(errorCode: any): void {
  console.log('PHONE ERROR CODE:', errorCode);

  switch (errorCode) {

    case 0:
      this.phoneError = '';
      break;

    case 1:
      this.phoneError = 'Invalid country code';
      break;

    case 2:
      this.phoneError = 'Phone number is too short';
      break;

    case 3:
      this.phoneError = 'Phone number is too long';
      break;

    case 4:
      this.phoneError = 'Invalid phone number';
      break;

    default:
      this.phoneError =
        'Please enter a valid phone number for the selected country';
  }
}

// getErrorMessage(number: any, errorCode: any): string {

//   if (!number) {
//     return 'Please enter a number';
//   }

//   switch (errorCode) {

//     case 1:
//       return 'Invalid dial code';

//     case 2:
//       return 'Too short';

//     case 3:
//       return 'Too long';

//     case 4:
//       return 'Invalid number';

//     default:
//       return 'Invalid number';
//   }
// }


Submit(data?: any) {
console.log(this.data)
// window.location.href  = "https://google.com"
 this.zone.run(() => {

    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.showErrors = true;
    this.showValidation = true;

    // Name validation
    if (!this.whastup.name?.trim()) {
      return;
    }

    // Phone validation
 if (this.phoneControl.invalid || !this.phoneValid) {

  this.showValidation = true;

  console.log('PHONE:', this.phoneControl.value);
  console.log('PHONE VALID:', this.phoneValid);
  console.log('PHONE ERRORS:', this.phoneControl.errors);
  console.log('PHONE ERROR:', this.phoneError);

  return;
}
    // Get international number
    const phoneNumber = String(this.phoneControl.value || '');

    console.log('PHONE FROM CONTROL:', phoneNumber);

    // Convert +918788039960 → 918788039960
    const fullPhone = phoneNumber.replace(/\D/g, '');

    console.log('FULL PHONE:', fullPhone);
    // const finalPhoneNo = fullPhone.replace(/^91/, '');
    this.whastup.mobile = fullPhone;

    const reqData = {
      wsdp: this.whastup,
      wslp: JSON.parse(
        this.globalObject.getLocallData('tempDetails') || '{}'
      )
    };
console.log("submit working properlu")

    this.loginService.postData(reqData, 'wpEnquiry').subscribe({

      next: (res) => {

        // console.log('API RESPONSE:', res);

        if (!res?.responseStatus?.includes('success')) {
          return;
        }

        // const message =
        //   this.whatsapp_enquiry?.data?.[0]?.description || '';

        // const appUrl =
        //   `whatsapp://send?phone=${fullPhone}&text=${encodeURIComponent(message)}`;

        // window.location.href = appUrl;



        const message = this.whatsapp_enquiry?.data?.[0]?.description || '';

const encodedMessage = encodeURIComponent(message);

const userAgent = navigator.userAgent || navigator.vendor || '';
 console.log(userAgent+ "useragent ")

const isAndroid = /Android/i.test(userAgent);
console.log(isAndroid+ "useragent ")
const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
// https://wa.me/' + datas.wp_number
if (isAndroid || isIOS) {
  // Android / iOS browser → WhatsApp app
  console.log()
  const appUrl =
    `whatsapp://send?phone=${fullPhone}&text=${encodedMessage}`;

  window.location.href = appUrl;

} else {
  // Desktop browser → WhatsApp Web
  const webUrl =
    `https://wa.me/${fullPhone}?text=${encodedMessage}`;

  window.open(webUrl, '_blank');
}

        this.phoneControl.reset();
        this.whastup.mobile = '';
        this.whastup.name = '';
        this.showErrors = false;
        this.showValidation = false;
      },

      error: (err) => {
        console.error('API ERROR:', err);
      }

    });
  });
}




}
