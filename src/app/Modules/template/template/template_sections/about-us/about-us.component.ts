import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Globalobjects } from '../../../../../services/globalobjects';
import { Login } from '../../../../../services/login';
// import { IonModal } from '@ionic/angular/standalone';
// import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  standalone: true,
   imports: [CommonModule,   FormsModule],
  //  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AboutUsComponent implements OnInit {
  aboutUsData: any;
  otherLinksData: any;
  specialitesData: any;
  @Input() template_type: any;
  @Input() data: any;
  @Input() data2: any;
  @Input() card_heading_bg: any;
  @Input() styletype: any;
  @Input() about_us_card_divs: any;
  @Input() about_us_p: any
  @Input() user_template: any


  companyDetails: any = {
    company_name: "",
    category: "",
    nature_of_business: "",
    website_url: "",
    description: ""
  }
  card2textcolour: any;
  card_text_color1: any;
  card2bgcolour: any;
  card1textcolour: any;
  bodybgcolour: any
  card1bgcolour: any
  about_us_image:any
bodytextcolour:any
  // companyDetails:any;
  paymentData: any = {
    sr_no: "",
    google_pay_mobile_no: "",
    phone_pay_mobile_no: "",
    paytm_mobile_no: "",
    upi_id: "",
    bank_name: "",
    account_holder_name: "",
    account_number: "",
    ifsc_code: "",
    product_image1: "",
    product_image2: "",
  };
  constructor(private loginService: Login, public globalObject: Globalobjects) {
    // if (this.globalObject.isTemplate) {
    //   return applyLoggingDecorator(this, "about-us")
    // }
  }

  ngOnInit() {

    // console.log(this.sublayout)
    // console.log(this.data);

   


    // this.getAboutUs();
    // this.getSpecialities();
    // this.getOtherLinks();
    // this.getPaymentDetails();
    // this.getCompanyDetail();
    if(this.data2){
      this.about_us_image= this.data2?.data[0].about_us_image;
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
  getAboutUs() {


  };
  // getSpecialities(){

  // };


  getSpecialities() {
    let wslpData: any = this.globalObject.getLocallData("appDetails");

    let wsdp = {
      serviceType: "specialities"
    }
    let reqData: any = {
      wsdp: wsdp,
      wslp: wslpData ? JSON.parse(wslpData) : {}
    };


    this.loginService.postData(reqData, "gettemplateData").subscribe(
      (res) => {
        if (res?.responseStatus?.includes('success')) {
          this.specialitesData = res.responseData;
          // console.log("  ", this.specialitesData);
        } else {
        }
      },
      (err) => {
      }
    );
  }
  getOtherLinks() {
    let wslpData: any = this.globalObject.getLocallData("appDetails");

    let wsdp = {
      serviceType: "other_links"
    }
    let reqData: any = {
      wsdp: wsdp,
      wslp: wslpData ? JSON.parse(wslpData) : {}
    };
    // file_title
    // file_type
    // file_url
    // last_update
    // sr_no
    // template_id
    // user_code

    this.loginService.postData(reqData, "gettemplateData").subscribe(
      (res) => {
        if (res?.responseStatus?.includes('success')) {
          this.otherLinksData = res.responseData;
          // console.log(this.otherLinksData);
        } else {
        }
      },
      (err) => {
      }
    );


  }
  getPaymentDetails() {




    let wslpData: any = this.globalObject.getLocallData("appDetails");

    let wsdp = {
      serviceType: "payment"
    }
    let reqData: any = {
      wsdp: wsdp,
      wslp: wslpData ? JSON.parse(wslpData) : {}
    };


    this.loginService.postData(reqData, "gettemplateData").subscribe(
      (res) => {
        if (res?.responseStatus?.includes('success')) {
          let tableDataList = res.responseData;
          // console.log(tableDataList[0].service_image1);
          for (let tableData of tableDataList) {
            //  tableData.service_image1="data:image/png;base64,"+tableData.service_image1
            //  tableData.service_image2="data:image/png;base64,"+tableData.service_image2
            this.paymentData.sr_no = tableData.sr_no;
            this.paymentData.phone_pay_mobile_no = tableData.phone_pay_mobile_no;
            this.paymentData.google_pay_mobile_no = tableData.google_pay_mobile_no;
            this.paymentData.paytm_mobile_no = tableData.paytm_mobile_no;
            this.paymentData.upi_id = tableData.upi_id;
            this.paymentData.bank_name = tableData.bank_name;
            this.paymentData.account_holder_name = tableData.account_holder_name;
            this.paymentData.account_number = tableData.account_number;
            this.paymentData.ifsc_code = tableData.ifsc_code;
          }



        } else {
        }
      },
      (err) => {
      }
    );
    // console.log("payment details : " + this.paymentData);
  }



  getCompanyDetail() {

    // console.log("company details : ", this.companyDetails);
    let wslpData = this.globalObject.getLocallData("appDetails");
    // let wsdp=this.companyDetails;
    let reqData: any = {
      // wsdp: wsdp,
      wslp: wslpData ? JSON.parse(wslpData) : {}
    };


    this.loginService.postData(reqData, "getcompanyInfo").subscribe(
      (res) => {
        if (res?.responseStatus?.includes('success')) {
          if (res.responseData[0]) {
            this.companyDetails = res.responseData[0];
          }
          // console.log(this.socialLinksList);
        } else {
        }
      },
      (err) => {
      }
    );
  }
}
