import { AfterViewInit, ApplicationRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Login } from '../../../../services/login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaComponent } from 'ng-recaptcha';
import { Globalobjects } from '../../../../services/globalobjects';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,RecaptchaModule]
})
export class ContactUsComponent implements OnInit {
  @ViewChild(RecaptchaComponent)
captcha!: RecaptchaComponent;
  // @ViewChild('captchaCanvas')
  // captchaCanvas!: ElementRef<HTMLCanvasElement>;
  //   captchaText = '';

  // userCaptcha = '';
  // captchaError = '';
  enquiry = {
    name: '',
    email: '',
    mobile: '',
    message: ''
  };

  isSubmitting = false;
  submitMsg = '';

  constructor(private loginService: Login, private websiteSeoSyncService: WebsiteSeoSyncService,private globalObject : Globalobjects) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('contact');

  }


   siteKey = "6LdG92AtAAAAAMXA5KZstUc8f9UXEoTHvjZBQbtF";

  captchaToken: string | null = null;

  contact = {
    name: '',
    email: ''
  };

  resolved(token: string | null) {
    console.log(token);
    this.captchaToken = token;
  }


  onSubmit() {
  this.submitMsg = '';
  // this.captchaError = '';
     if (!this.enquiry.name || !this.enquiry.email || !this.enquiry.mobile || !this.enquiry.message) {
      this.submitMsg = 'Please fill all fields.';
      return;
    }
  // Email format
  if (!this.isValidEmail(this.enquiry.email)) {
    this.submitMsg = 'Please enter a valid email address.';
    return;
  }

  // Normalize
  const email = this.enquiry.email.trim().toLowerCase();

  const parts = email.split('@');

  if (parts.length !== 2) {
    this.submitMsg = 'Please enter a valid email address.';
    return;
  }

  const domain = parts[1];

  // Your existing blocked domain list
  if (this.globalObject.blockedDomains.includes(domain)) {
    this.submitMsg =
      'Please enter a valid email address.';
    return;
  }
const mobile = this.enquiry.mobile?.trim();

const mobilePattern = /^[6-9][0-9]{9}$/;

if (!mobile || !mobilePattern.test(mobile)) {
  this.submitMsg = 'Please enter a valid 10-digit mobile number.';
  return;
}
  // reCAPTCHA
  if (!this.captchaToken) {
    this.submitMsg = 'Please complete the reCAPTCHA.';
    return;
  }

 
    this.isSubmitting = true;
    this.submitMsg = '';

    let wsdp: any = {
      name: this.enquiry.name,
      email: this.enquiry.email,
      mobile: this.enquiry.mobile,
      message: this.enquiry.message,
      serviceType: "web_enquiry"
    }
    let reqBody = {
      wsdp: wsdp
    };

    this.loginService.postData(reqBody, 'operateData').subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        if (res.responseStatus && res.responseStatus.includes('success')) {
          this.submitMsg = 'Thank you! We will contact you soon.';
          // this.resolved(event)
          this.enquiry = { name: '', email: '', mobile: '', message: '' };
           this.resetCaptcha();
        } else {
          this.submitMsg = res.responseMsg || 'Something went wrong.';
        }
      },
      error: err => {
        console.error('Error saving enquiry: ', err);
        this.isSubmitting = false;
        this.submitMsg = 'Server error. Please try again later.';
      }
    });
    
  }





  resetCaptcha() {
    if (this.captcha) {
      this.captcha.reset();
    }

    this.captchaToken = null;
  }

// ngAfterViewInit() {
//   queueMicrotask(() => {
//     this.generateCaptcha();
//   });
// }



// async generateCaptcha() {

//   if (!this.captchaCanvas) return;

//   // Wait until fonts are loaded
//   if ('fonts' in document) {
//     await document.fonts.ready;
//   }

//   const canvas = this.captchaCanvas.nativeElement;
//   const ctx = canvas.getContext('2d');

//   if (!ctx) return;

//   const width = canvas.width;
//   const height = canvas.height;

//   ctx.clearRect(0, 0, width, height);

//   ctx.fillStyle = "#f4f4f4";
//   ctx.fillRect(0, 0, width, height);

//   // Generate captcha
//   const chars =
//     "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

//   this.captchaText = "";

//   for (let i = 0; i < 6; i++) {
//     this.captchaText += chars.charAt(
//       Math.floor(Math.random() * chars.length)
//     );
//   }

//   for (let i = 0; i < this.captchaText.length; i++) {

//     const x = 20 + i * 25;
//     const y = 35 + Math.random() * 10;
//     const angle = (Math.random() - 0.5) * 0.5;

//     ctx.save();
//     ctx.translate(x, y);
//     ctx.rotate(angle);

//     ctx.font = "bold 28px Arial";
//     ctx.fillStyle = `rgb(${this.rand(50,150)},${this.rand(50,150)},${this.rand(50,150)})`;
//     ctx.fillText(this.captchaText[i], 0, 0);

//     ctx.restore();
//   }
// }


//   rand(min: number, max: number) {
//     return Math.floor(Math.random() * (max - min) + min);
//   }
// verifyCaptcha(): boolean {

//   if (!this.userCaptcha.trim()) {
//     this.captchaError = 'Please enter the captcha.';
//     return false;
//   }

//   if (this.userCaptcha.trim().toLowerCase() !== this.captchaText.toLowerCase()) {
//     this.captchaError = 'Invalid captcha. Please try again.';
//     this.userCaptcha = '';
//     this.generateCaptcha();
//     return false;
//   }

//   this.captchaError = '';
//   return true;
// }


isValidEmail(email: string): boolean {
  const value = email.trim().toLowerCase();

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  return emailRegex.test(value);
}
}
