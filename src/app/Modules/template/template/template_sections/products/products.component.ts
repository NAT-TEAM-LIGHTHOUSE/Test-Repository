import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, OnDestroy , ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { applyLoggingDecorator } from 'src/app/loggingDescorator';
import { Globalobjects } from '../../../../../services/globalobjects';
import { Login } from '../../../../../services/login';
import Swiper from 'swiper'
// import { IonIcon } from '@ionic/angular/standalone';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

  // ------------------ for productmodal open --------------
// import { IonModal } from '@ionic/angular';

declare var $: any;
// declare var Swiper: any;
declare var bootstrap: any; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsComponent implements OnInit  {
  imageDisplayStatus: any = false;
  @Input() template_type: any;
  @Input() data: any;
  @Input() data2: any;
   @Input() card_heading_bg:any;
      @Input() styletype:any;
    @Input() products_outer_div:any;
 @Input() whatup:any;
 @Input() user_template: any;
 // ------------------ for productmodal open --------------
  //  @ViewChild('Modal', { read: IonModal }) modal!: IonModal;   

      
  @Output() dataEvent = new EventEmitter<string>();
  
  card2textcolour: any;
  card2bgcolour: any;
     card1bgcolour:any;
     card1textcolour:any;
      bodybgcolour: any;
     
hoveredIndex: number | null = null;
  private swiper?: Swiper;
  bodytextcolour: any;


  constructor(private loginService: Login, public globalObject: Globalobjects,  @Inject(PLATFORM_ID) private platformId: Object) {
    // if (this.globalObject.isTemplate) {
    //   return applyLoggingDecorator(this, "products")
    // }
  }



  ngOnDestroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = undefined;
    }
  }

ngAfterViewInit() {
  if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  setTimeout(() => {
    // ✅ double safety check
    if (!isPlatformBrowser(this.platformId)) return;

    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel: any) => {
      new bootstrap.Carousel(carousel, {
        interval: false,
        ride: false,
        touch: true
      });
    });
  }, 300);
}
  
  ngOnInit() {

    this.imageDisplayStatus = false;
    // this.getProductList();
  //   console.log(this.data)
  //  console.log(this.data2)
  //     console.log(this.card_heading_bg)
  //        console.log(this.styletype)
  //           console.log(this.products_outer_div)
      

 if(this.data2){
    this.card2textcolour = this.data2?.data[0].card_text_color2;;
    this.card2bgcolour = this.data2?.data[0].card_back_color2;
// this.card1bgcolour=this.data2?.data[0].card_background_color1;
// this.card1textcolour=this.data2?.data[0].card_text_color1;
      this.bodybgcolour = this.data2?.data[0].back_body_color;
       this.bodytextcolour= this.data2?.data[0].body_text_color;

          if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = this.user_template?.data[0]?.card_text_color1 ? this.user_template?.data[0]?.card_text_color1 : this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =  this.user_template?.data[0]?.card_background_color1 ? this.user_template?.data[0]?.card_background_color1 : this.data2?.data[0]?.card_background_color1;
    } else {
      this.card1textcolour =  this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =   this.data2?.data[0]?.card_background_color1;
    }

       console.log(this.whatup)
        console.log(this.data)
 }
    
  }
  // dataDetails:any={
  //   sr_no:"",
  //   product_name:"",
  //   selling_price:"",
  //   regular_price:"",
  //   product_image1:"",
  //   product_image2:"",
  //   short_desc:"",
  //   long_desc:"",
  // }
  dataDetails: any = {
    entry_rowid_seq: "",
    product_name: "",
    selling_price: "",
    regular_price: "",
    product_image1: "",
    product_image2: "",
    product_description: ""
  }
  service_type = "product"
  tableDataList: any = [];

  getProductList() {
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
          if (res.responseData) {
            this.tableDataList = res.responseData;
            // console.log(this.tableDataList[0].service_image1);
            for (let tableData of this.tableDataList) {
              if (tableData.product_image1) {
                tableData.product_image1 = this.globalObject.getImageSrc(tableData.product_image1);
                // this.imageDisplayStatus=true;
              }
              if (tableData.product_image2) {
                tableData.product_image2 = this.globalObject.getImageSrc(tableData.product_image2);
              }
            }




            for (let tableData of this.tableDataList) {
              if (tableData.product_image1) {
                this.imageDisplayStatus = true;
              }
              if (tableData.product_image2) {
              }
            }
          }


        } else {
        }
      },
      (err) => {
      }
    );

  }
  // scrollToFooter(id:any): void {
  //   const footerElement = document.getElementById(id);
  //   if (footerElement) {
  //     footerElement.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }

 // ------------------ for productmodal open for old templates--------------
  productpopup(data: any) {
    data.modal_type = 'Modal';
      data={
      ...data,
      ...this.whatup.data[0]
    }
    this.dataEvent.emit(data);
  this.openProductModal();
  }

  
  openProductModal() {
    // this.modal.present();
  }

// ---------------------------------------------------

  productpopup1(data:any){
    console.log("he")
     data.modal_type = 'Modal5';
      data={
      ...data,
      ...this.whatup.data[0]
    }
    this.dataEvent.emit(data);
  }
getWhatsappLink(number: string, productName: string): string {
  // const msg = `Hi, I am interested in your product: ${productName} Please provide more details.`;
  // return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
if(!number){
return '';
}
  let cleanedNumber = number.replace(/\D/g, '');

  // If 10 digit number, assume India
  if (cleanedNumber.length === 10) {
    cleanedNumber = '91' + cleanedNumber;
  }

  const msg = `Hi, I am interested in your ${this.data.title}: ${productName}. Please provide more details.`;

  return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(msg)}`;
}





hasRegular() {
  return this.data?.product?.regular_price > 0;
}

hasSelling() {
  return this.data?.product?.selling_price > 0;
}






}
