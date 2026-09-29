import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Login } from '../../../../services/login';
import { RecaptchaComponent, RecaptchaModule } from 'ng-recaptcha';
import { Globalobjects } from '../../../../services/globalobjects';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.scss'],
  standalone : true,
  imports : [RecaptchaModule,CommonModule,FormsModule]
})
export class ApplicationFormComponent  implements OnInit {

  constructor(private login:Login,private globalObject : Globalobjects) { }
@Input() designation:any;
@Input() designation_flag:any=true;
emailDomainError = '';
  @ViewChild(RecaptchaComponent)
  captcha!: RecaptchaComponent;
@ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
@ViewChild('careerForm') careerForm!: NgForm;
  ngOnInit() {
    // if(this.designation_flag && this.designation_flag==true){
      // alert("designation flag "+this.designation_flag)
    // }
  }

   siteKey = "6LdG92AtAAAAAMXA5KZstUc8f9UXEoTHvjZBQbtF";

  captchaToken: string | null = null;
form: any = {
  fullname: '',
  email: '',
  contact: '',
  job_profile: '',
  here_about: '',
  join_u: '',
  message: ''
};

selectedFile: File | null = null;
uploadMsg = '';
isUploading = false;
success_message:boolean = false;


onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
    this.uploadMsg = '';

  }
}

// uploadResume() {
//   if (!this.selectedFile) {
//     this.uploadMsg = 'Please select a file first.';
//     this.success_message=false;
//     return;
//   }

//   this.isUploading = true;
//   this.uploadMsg = '';
//   this.success_message=false;
//  let job_profile;
//   if(this.designation_flag==false){
//       job_profile= this.designation;
//   }else{
//     job_profile= this.form.job_profile;
//   }

//   const wsdp: any = {
//     name: this.form.fullname,
//     email: this.form.email,
//     mobile: this.form.contact,
//     message: this.form.message,
//     job_profile: job_profile,
//     here_about: this.form.here_about,
//     join_u: this.form.join_u
//   };
// console.log(wsdp);
//   const requestData = { wsdp };

//   this.login.uploadResume(this.selectedFile, requestData)
//     .subscribe({
//       next: (res:any) => {
//         if(res.responseStatus && res.responseStatus=='success'){
//           console.log('Success:', res);
//            this.uploadMsg = 'Submitted Successfully';
//            this.success_message=true;
//           this.isUploading = false;
//           this.resetForm();
//         }else{
//           console.log("not submitted");
//           this.success_message=false;
//         }
//       },
//       error: err => {
//         console.error('Error:', err);
//         this.uploadMsg = 'submit failed';
//         this.isUploading = false;
//         this.success_message=false;
//       }
//     });
// }


 resolved(token: string | null) {
    // console.log(token);
    this.captchaToken = token;
  }


submitted = false;
uploadResume() {

   this.submitted = true;
  this.uploadMsg = '';
  this.emailDomainError = '';

  if (!this.form.fullname?.trim()) {
    return;
  }

  const email = this.form.email?.trim().toLowerCase();

  if (!email || !this.isValidEmail(email)) {
    return;
  }

  if (this.isBlockedEmailDomain(email)) {
    this.emailDomainError = 'Please use a valid email address.';
    return;
  }

  const mobilePattern = /^[6-9][0-9]{9}$/;

  if (!this.form.contact || !mobilePattern.test(this.form.contact.trim())) {
    return;
  }

  if (this.designation_flag && !this.form.job_profile?.trim()) {
    return;
  }

  if (!this.form.here_about) {
    return;
  }

  if (!this.form.join_u) {
    return;
  }

  if (!this.form.message?.trim()) {
    return;
  }

  if (!this.selectedFile) {
    this.uploadMsg = 'Please select a file first.';
    return;
  }

  if (!this.captchaToken) {
    this.uploadMsg = 'Please complete the reCAPTCHA.';
    return;
  }
  // ==========================
  // YOUR EXISTING CODE BELOW
  // ==========================

  this.isUploading = true;
  this.uploadMsg = '';
  this.success_message = false;

  let job_profile;

  if (this.designation_flag == false) {
    job_profile = this.designation;
  } else {
    job_profile = this.form.job_profile;
  }

  const wsdp: any = {
    name: this.form.fullname,
    email: this.form.email,
    mobile: this.form.contact,
    message: this.form.message,
    job_profile: job_profile,
    here_about: this.form.here_about,
    join_u: this.form.join_u
  };

  console.log(wsdp);

  const requestData = { wsdp };

  this.login.uploadResume(this.selectedFile, requestData)
    .subscribe({
      next: (res: any) => {
        if (res.responseStatus && res.responseStatus == 'success') {

          console.log('Success:', res);

          this.uploadMsg = 'Submitted Successfully';
          this.success_message = true;
          this.isUploading = false;

          // reset validation state
          this.submitted = false;
          this.resetForm();

         

        } else {

          console.log("not submitted");

          this.success_message = false;
          this.isUploading = false;
        }
      },
      error: err => {

        console.error('Error:', err);

        this.uploadMsg = 'submit failed';
        this.isUploading = false;
        this.success_message = false;
      }
    });
}
resetForm() {
  this.submitted = false;
    this.resetCaptcha();
  this.form = {
    fullname: '',
    email: '',
    contact: '',
    job_profile: '',
    here_about: '',
    join_u: '',
    message: ''
  };
  
  // form.resetForm();
  this.selectedFile = null;
this.fileInput.nativeElement.value = '';


// clarFile(){
//   this.fileInput.nativeElement.value = '';
  this.careerForm.resetForm();
this.captchaToken = null;
// }
 
}
 resetCaptcha() {
    if (this.captcha) {
      this.captcha.reset();
    }

    this.captchaToken = null;
  }

isValidEmail(email: string): boolean {
  const value = email.trim().toLowerCase();

  const emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  return emailPattern.test(value);
}

isBlockedEmailDomain(email: string): boolean {
  const domain = email
    .split('@')[1]
    ?.toLowerCase()
    .trim();

  if (!domain) {
    return true;
  }

  return this.globalObject.blockedDomains.some(
    (blockedDomain: string) =>
      blockedDomain.toLowerCase().trim() === domain
  );
}
}


