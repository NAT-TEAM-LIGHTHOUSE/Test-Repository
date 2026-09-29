import { Component, OnInit, OnChanges, SimpleChanges, Input, HostListener, EventEmitter ,CUSTOM_ELEMENTS_SCHEMA , Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm, FormsModule } from '@angular/forms';
import { Globalobjects } from '../../../../../services/globalobjects';
import { Login } from '../../../../../services/login';
import { SocialContactComponent } from '../social-contact/social-contact.component';
import { SocialLinksComponent } from '../social-links/social-links.component';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, SocialContactComponent,SocialLinksComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactUsComponent implements OnInit, OnChanges {
  @Input() template_type: any;
  @Input() data2: any;
  @Input() data: any;
   @Output() dataEvent = new EventEmitter<string>();
  @Input() card_heading_bg: any;
  @Input() styletype: any;
  @Input() contact_us: any;
  @Input() contact_visit_btn: any;
  @Input() about_company_data: any;
  @Input() conatct_us_data: any;
  @Input() value: any;
  @Input() datas: any;
  @Input() social_data: any;
     @Input() user_template: any;
    @Input() profile_data: any;
 @Input() contact_details: any;
   @Input() pcard_url_template: any;
     @Input() contact_btn_hover: any;

  

  @Input() payment_data_div: any;

  //  @ViewChild('Modal2', { read: IonModal }) modal2!: IonModal;

activeField: any = null;
// showDatePicker = false;
  showErrors = false;
  card2bgcolour: any;
  operateSocialLink: any = "";
  card1textcolour: any
  bodybgcolour: any;
  card2textcolour: any;
  socialLinksList: any = [];
  isHover: boolean = false;
  
     hover = false;
// maxDate = new Date().toISOString().split('T')[0];



  // Contact: any = {
  //   name: '',
  //   mobile: '',
  //   emailid: '',
  //   message: ''
  // }

  Contact: any = {
    name: '',
    mobile: '',
    emailid: '',
    message: '',
    text1: '',
    text2: '',
    date: '',
    checkbox: '',
    dropdown: '',
    checkboxStates: {},
    col_label_1: "",
    col_label_2: "",
    col_label_3: "",
    col_label_4: "",
    col_type_1: "",
    col_type_2: "",
    col_type_3: "",
    col_type_4: "",
    col_value_1: "",
    col_value_2: "",
    col_value_3: "",
    col_value_4: "",
  };

  card1bgcolour: any;
  bodytextcolour: any;

  constructor(public globalObject: Globalobjects, public loginService: Login) {
    // if (this.globalObject.isTemplate) {
    //   return applyLoggingDecorator(this, "contact-us-component")
    // }
  }

  ngOnInit() {
     //   console.log(this.conatct_us_data)
   
    this.applyTheme();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data2'] || changes['data'] || changes['conatct_us_data']) {
      this.applyTheme();
    }
  }

  private applyTheme(): void {
    if (this.data2?.data?.[0]) {
      this.card2textcolour = this.data2?.data[0].card_text_color2;
      this.card2bgcolour = this.data2?.data[0].card_back_color2;
      // this.card1textcolour = this.data2?.data[0].card_text_color1;
      this.bodybgcolour = this.data2?.data[0].back_body_color;
       this.bodytextcolour= this.data2?.data[0].body_text_color;
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
      
          color: this.card1textcolour,
        background: this.card1bgcolour,
        border: `1px solid ${this.card1bgcolour}`
      }
    : {                                    
         background: this.card1textcolour,
        color: this.card1bgcolour,
        border: `1px solid ${this.card1bgcolour}`
      };
}



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





isValidUrl(value: any): boolean {
  if (!value) return false;

  const v = value.toString().trim().toLowerCase();

  return /^(http|https):\/\/.+/.test(v);
}
// ----------------------------------------------


  //   setDate(event: any) {
  //   const rawValue = event.detail.value;
  //   if (rawValue) {
  //     const date = new Date(rawValue);
  //     const dd = String(date.getDate()).padStart(2, '0');
  //     const mm = String(date.getMonth() + 1).padStart(2, '0');
  //     const yyyy = date.getFullYear();
  //     this.data.insert_value = `${dd}-${mm}-${yyyy}`;
  //   }
  //   // hide the date picker after selecting
  //   this.showDatePicker = false;
  // }

  
//   setDate(event: any) {
//   const rawValue = event.detail.value;


//   if (rawValue && this.activeField) {
//     // store ISO format (recommended)
//      const date = new Date(rawValue);
//     this.activeField.insert_value = rawValue;
//      const dd = String(date.getDate()).padStart(2, '0');
//     const mm = String(date.getMonth() + 1).padStart(2, '0');
//     const yyyy = date.getFullYear();

//     this.Contact.date = `${dd}-${mm}-${yyyy}`; // if you want to bind it to the form as well
//     this.Contact.col_value_3 = `${dd}-${mm}-${yyyy}`; // if you want to store it in col_value_3 as well
//   }

//   this.showDatePicker = false;
// }

//  cancelDatePicker() {
//     // simply close the picker when user clicks "Cancel"
//     this.showDatePicker = false;
//   }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    this.closeAllDropdowns();
  }

  isValidMobile(mobile: string): boolean {
    return /^[0-9]{10}$/.test(mobile);
  }



  
  // toggleDatePicker() {
  //   this.showDatePicker = !this.showDatePicker;
  // }
// toggleDatePicker(field: any) {
//   this.activeField = field;
//   this.showDatePicker = true;
// }


  Submit(form: NgForm) {

    if (!this.Contact.name || !this.Contact.mobile || !this.Contact.message) {
      this.showErrors = true;
      return;
    }


    if (!this.isValidMobile(this.Contact.mobile)) {
      this.showErrors = true;
      return;
    }

    this.showErrors = false;

    this.operateSocialLink = "";
    let wsdp: any = this.Contact;
    let wslpData = this.globalObject.getLocallData("tempDetails");

    let reqData: any = {
      wsdp: wsdp,
      wslp: wslpData ? JSON.parse(wslpData) : {}
    };


    ////////////////common///////////////////
    // String user_name = String.valueOf(wsdp.get("name"));
    // 	String user_mobile = String.valueOf(wsdp.get("mobile"));
    // 	String template_id = String.valueOf(wsdp.get("templateId"));
    // 	String emailid = String.valueOf(wsdp.get("emailid"));
    // 	String message = String.valueOf(wsdp.get("message"));
    // 	String user_code = String.valueOf(wslp.get("user_code"));
    ////////////////////whatsapp/////////
    // String user_name = String.valueOf(wsdp.get("name"));
    // 			String user_mobile = String.valueOf(wsdp.get("mobile"));
    // 			String user_code = String.valueOf(wslp.get("user_code"));
    ///////////////////////////////

    // for common-------- api--------commonEnquiry1
    // for wp----------api===-----------wpEnquiry

    let i = 1;
    if (this.conatct_us_data?.data.length > 0) {
      for (let c of this.conatct_us_data.data) {
        this.Contact['col_value_' + i] = c.insert_value;
        this.Contact['col_type_' + i] = c.field_value;
        this.Contact['col_label_' + i] = c.field_key;
        i++;
      }
      this.Contact['enq_from'] = 'Template';

      // console.log(this.conatct_us_data);
      // console.log(this.Contact);
    }
    // console.log("submit ",reqData);


    // console.log("submit ",reqData);
    this.loginService.postData(reqData, "commonEnquiry1").subscribe(
      (res) => {
        this.operateSocialLink = "";
        if (res?.responseStatus?.includes('success')) {
          this.socialLinksList = res.responseData;
          this.presentToast('Submitted successfully', 'bottom');
          // Reset Angular form
          form.resetForm();
for (let c of this.conatct_us_data.data) {
  c.insert_value=null;
        this.Contact['col_value_' + i] = c.insert_value;
        // this.Contact['col_type_' + i] = c.field_value;
        // this.Contact['col_label_' + i] = c.field_key;
        i++;
      }
          // Reset dynamic dropdown & checkbox UI state
          this.selectedDropdownValues = {};
          this.selectedValues = [];
          this.dropdownOpen = false;
          this.selectOpenKey = null;
          this.checkboxValues = {}
          this.data.insert_value = '';


          this.showErrors = false;
        }
      },
      (err) => {
        // handle error
      }
    );
  }



  async presentToast(msg: any, position: 'top' | 'middle' | 'bottom') {
    // const toast = await this.toastController.create({
    //   message: msg,
    //   duration: 1500,
    //   position: 'bottom',
    //   cssClass: 'toast_success',
    //   icon: 'checkmark',
    //   animated: true,
    //   mode: 'ios',



    // });

    // await toast.present();
  }




  // checkToast(operation?: string) {
  //   this.toastr.success("Saved successfully");
  // }


  // -------------------- multi select custom dropdown  checkbox logic ----------------------
  // ------------------ single select custom dropdown -------------

  checkboxOpen: { [key: string]: boolean } = {};
  checkboxValues: { [key: string]: string[] } = {};
  dropdownOpen = false;
  selectedValues: string[] = [];
  selectedText = '';

  selectOpen = false;
  selectedValue = '';

  selectOpenKey: number | null = null;
  selectedDropdownValues: { [key: string]: any } = {};



  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.selectOpen = false;
  }

  onChange(event: Event, value: string, data: any) {
    const checked = (event.target as HTMLInputElement).checked;

    if (!this.checkboxValues[data.field_key]) {
      this.checkboxValues[data.field_key] = [];
    }

    if (checked) {
      this.checkboxValues[data.field_key].push(value);
    } else {
      this.checkboxValues[data.field_key] =
        this.checkboxValues[data.field_key].filter(v => v !== value);
    }

    const finalValue = this.checkboxValues[data.field_key].join('#');
    data.insert_value = finalValue;
  }

  getDropdownOptions(fieldData: string): string[] {
    if (!fieldData) return [];
    return fieldData.split('#').filter(v => v && v.trim());
  }






  toggleSelect(rowId: number) {

    this.selectOpenKey = this.selectOpenKey === rowId ? null : rowId;

    // 🔥 CLOSE ALL MULTI-SELECT DROPDOWNS
    Object.keys(this.checkboxOpen).forEach(key => {
      this.checkboxOpen[key] = false;
    });



  }

  selectOption(rowId: any, value?: string, data?: any) {
    this.selectedDropdownValues[rowId] = value;
    data.insert_value = value;
    this.selectOpenKey = null;
  }



  closeAllDropdowns() {
    // close single select
    this.selectOpenKey = null;

    // close ALL multi-select dropdowns
    Object.keys(this.checkboxOpen).forEach(key => {
      this.checkboxOpen[key] = false;
    });
  }



  onCheckboxChange(field: any, option: string, event: Event) {
    const input = event.target as HTMLInputElement;
    if (!field.selected) {
      field.selected = [];
    }
    if (input.checked) {
      if (!field.selected.includes(option)) {
        field.selected.push(option);
      }
    } else {
      field.selected = field.selected.filter((v: string) => v !== option);
    }
  }



  toggleCheckbox(fieldKey: string) {
    this.checkboxOpen[fieldKey] = !this.checkboxOpen[fieldKey];
    this.selectOpenKey = null;



  }



   onFileSelected(event: any) {


   const contact = {
     firstName: this.data?.data?.[0]?.first_name || '',
     lastName: this.data?.data?.[0]?.last_name || '',
     phone: this.datas?.data?.[0]?.mobile_no || '',
     email: this.datas?.data?.[0]?.email_id || '',
     website: this.pcard_url_template?.data?.[0]?.template_url || '',
     add: this.contact_details?.data?.[0]?.user_address || '',
     wp_number: this.contact_details?.data?.[0]?.wp_number || ''




   };








   const vcfData = `BEGIN:VCARD
VERSION:3.0
N:${contact.lastName};${contact.firstName};;;
FN:${contact.firstName} ${contact.lastName}
TEL;TYPE=WORK,VOICE:${contact.wp_number}
TEL;TYPE=CELL:${contact.phone}


EMAIL;TYPE=INTERNET:${contact.email}
URL:${contact.website}
ADR;TYPE=HOME:;;${contact.add};;;;
TEL;TYPE=CELL:${contact.wp_number}
END:VCARD`;


   const blob = new Blob([vcfData], {
     type: 'text/x-vcard;charset=utf-8'
   });


   const url = window.URL.createObjectURL(blob);


   const a = document.createElement('a');
   a.href = url;
   a.download = `${contact.firstName || 'contact'}.vcf`;
   document.body.appendChild(a);
   a.click();


   document.body.removeChild(a);
   // 🚫 DO NOT revoke immediately
 }

 // ------------------ for sharemodal open --------------
 share(data?: any) {
   this.dataEvent.emit(data);
   this.openShareModal();
 }


 openShareModal() {
  //  this.modal2.present();
 }



}
