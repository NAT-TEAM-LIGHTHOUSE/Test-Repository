import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { applyLoggingDecorator } from 'src/app/loggingDescorator';
import { Globalobjects } from '../../../../../services/globalobjects';
import { Login } from '../../../../../services/login';
import Swiper from 'swiper';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
declare var $: any;
// declare var Swiper: any;

declare var bootstrap: any;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: true,
  imports: [CommonModule],
})





export class ServicesComponent implements OnInit {
  dataDetails: any = {
    sr_no: "",
    service_title: "",
    service_price: "",
    service_image1: "",
    service_image2: "",
    service_desc: "",
  }
  service_type = "service";
  @Input() template_type: any;
  @Output() dataEvent = new EventEmitter<string>();
  @Input() data: any;
  @Input() card_heading_bg: any;
  @Input() data2: any;
  @Input() styletype: any;
  @Input() services_outer_div: any;
  @Input() whatup: any;
 @Input() user_template: any;


  tableDataList: any = [];
  operateMode: any = "";
  card2textcolour: any;
  card2bgcolour: any;
  card1bgcolour: any;
   bodybgcolour: any;
  card1textcolour: any;
hoveredIndex: number | null = null;
  private swiper?: Swiper;
  bodytextcolour: any;

  //  ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     new Swiper('.mySwiper', {
  //       slidesPerView: 3,
  //       spaceBetween: 20,
  //       centeredSlides: true,
  //       loop: true,
  //       autoplay: {
  //         delay: 2000,
  //         disableOnInteraction: true,
  //       },
  //       pagination: {
  //         el: '.swiper-pagination',
  //         clickable: true,

  //       },

  //       breakpoints: {

  //         0: {
  //           loop: true,
  //           slidesPerView: 1,
  //           spaceBetween: 5,
  //         },

  //         768: {
  //           slidesPerView: 1,
  //           spaceBetween: 5,
  //         },

  //         1024: {
  //           slidesPerView: 3,
  //           spaceBetween: 5,
  //         },
  //       },
  //     });
  //   });

  //   setTimeout(() => {
  //     new Swiper('.mySwiperSingle', {
  //       slidesPerView: 1,
  //       spaceBetween: 0,
  //       loop: true,
  //       autoplay: {
  //         delay: 2500,
  //         disableOnInteraction: false
  //       },
  //       pagination: {
  //         el: '.mySwiperSingle .swiper-pagination',
  //         clickable: true
  //       }
  //     });
  //   });




  // }


  constructor(private loginService: Login, public globalObject: Globalobjects, @Inject(PLATFORM_ID) private platformId: Object,
  @Inject(DOCUMENT) private document: Document) {
    // if (this.globalObject.isTemplate) {
    //   return applyLoggingDecorator(this, "services")
    // }
  }


 
ngAfterViewInit() {
  if (!isPlatformBrowser(this.platformId)) {
    return; // ✅ stop SSR
  }

  setTimeout(() => {
    // ✅ extra safety (VERY IMPORTANT)
    if (!isPlatformBrowser(this.platformId)) return;

    const carousels = this.document.querySelectorAll('.carousel');

    carousels.forEach((carousel: any) => {
      new bootstrap.Carousel(carousel, {
        interval: false,
        ride: false,
        touch: true
      });
    });
  }, 300); // 🔥 don't keep 2000ms, unnecessary
}


  ngOnInit() {
    // alert("services");
    // this.getDetail();
    // console.log(this.data?.data)
    // console.log(this.data)
     if(this.data2){
    this.card2textcolour = this.data2?.data[0].card_text_color2;
    this.card2bgcolour = this.data2?.data[0].card_back_color2;
    // this.card1bgcolour = this.data2?.data[0].card_background_color1;
    // this.card1textcolour = this.data2?.data[0].card_text_color1;
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


  // ------------------ for servicemodal open --------------
  vname="nikhil";
  productpopup(data: any) {
    
    data={
      ...data,
      ...this.whatup.data[0]
    }
    this.dataEvent.emit(data);
    this.openServiceModal();
  }


  productpopup1(data: any){
    data.modal_type="Modal6";
       data={
      ...data,
      ...this.whatup.data[0]
    }
    this.dataEvent.emit(data);
  //  this.openServiceModal1();
  }


  openServiceModal1() {
    // this.modal6.present();
    }

  openServiceModal() {
    // this.modal1.present();
  }
  // --------------------------------

  getDetail() {
    let wslpData: any = this.globalObject.getLocallData("appDetails");

    let wsdp = {
      serviceType: this.service_type
    }
    let reqData: any = {
      wsdp: wsdp,
      wslp: wslpData ? JSON.parse(wslpData) : {}
    };


    this.loginService.postData(reqData, "gettemplateData").subscribe(
      (res) => {
        if (res?.responseStatus?.includes('success')) {
          this.tableDataList = res.responseData;
          // console.log(this.tableDataList[0].service_image1);
          for (let tableData of this.tableDataList) {
            tableData.service_image1 = this.globalObject.getImageSrc(tableData.service_image1);
            tableData.service_image2 = this.globalObject.getImageSrc(tableData.service_image2);
          }

          // console.log("service ", this.tableDataList);

        } else {
        }
      },
      (err) => {
      }
    );
  }


  getWhatsappLink(number: string, service_name: string): string {
    // const msg = `Hi, I am interested in your services: ${service_name} Please provide more details.`;
    // return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
if(!number){
return '';
}

     let cleanedNumber = number.replace(/\D/g, '');

  // If 10 digit number, assume India
  if (cleanedNumber.length === 10) {
    cleanedNumber = '91' + cleanedNumber;
  }

  const msg = `Hi, I am interested in your ${this.data.title}: ${service_name}. Please provide more details.`;

  return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(msg)}`;



  }


  
 




}
