

import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener ,Inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, PLATFORM_ID, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { isPlatformBrowser, CommonModule, isPlatformServer } from '@angular/common';
// import { applyLoggingDecorator } from 'src/app/loggingDescorator';
import { auditTime, fromEvent, Subscription } from 'rxjs';


// ------------------ for sharemodal open --------------
// import { IonModal, IonIcon, IonButton,IonSpinner } from '@ionic/angular/standalone';
import { Globalobjects } from '../../../../../services/globalobjects';
import { FormsModule } from '@angular/forms';
import { SocialContactComponent } from '../social-contact/social-contact.component';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { WhatsappSettingsComponent } from '../whatsapp-settings/whatsapp-settings.component';
import { Login } from '../../../../../services/login';
// import * as VCF from 'vcf';

declare var bootstrap: any;

@Component({
 selector: 'app-profile',
 templateUrl: './profile.component.html',
 styleUrls: ['./profile.component.scss'],
 standalone: true,
 imports: [CommonModule,  FormsModule, SocialContactComponent, SocialLinksComponent, WhatsappSettingsComponent],
 //  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfileComponent implements OnInit, OnChanges {
 @Input() profileData: any;
 @Input() template_type: any;
 @Output() dataEvent = new EventEmitter<string>();
 @Output() dataEvent1 = new EventEmitter<string>();
 @Input() data: any;
 @Input() data2: any;
 @Input() datas: any;
 @Input() social: any;
 @Input() whatsapp: any;
 @Input() social_data: any;
 @Input() contact_details: any;
 @Input() share_profile_button: any;
  @Input() share_profile_button_hover: any;
 @Input() share_profile_btn_div: any;
 @Input() social_contact_links: any;
 @Input() social_contact_a: any;
 @Input() social_contact_span: any;
 @Input() profile_h1_h4_p: any;
 @Input() social_contact: any;
 @Input() profile_section_bg: any;
 @Input() profile_bg_img_div: any;
 @Input() share_profile_button_div: any;
 @Input() styletype: any;
 @Input() share_profile_button_1: any;
 @Input() share_profile_button_2: any;
 @Input() card_style: any;
 @Input() social_links_a: any;
 @Input() share_profile_button_1_hover: any;
 @Input() share_profile_button_1_nohover: any;
 @Input() social_contact_i: any;
 @Input() card_heading_bg: any;
 @Input() profile_h4: any;
 @Input() profile_photo_div: any;
 @Input() profile_h1_p: any;
 @Input() whatsapp_enquiry: any;
 @Input() pcard_url_template: any;
 @Input() data_1: any;
 @Input() template_url: any;
  @Input() qr_code: any;
@Input() company_info: any;
@Input() other_link: any;
@Input() product_list: any;
 @Input() services: any;
@Input() about_me: any;
@Input() education: any;
  @Input() skills: any;
@Input() payment: any;
@Input() experience: any;
 @Input() photo_gallery: any;
  @Input() video_gallery: any;
   @Input() other_business: any;
    @Input() latest_update: any;
    @Input() Home: any;
      @Input() google_review: any;
        @Input() user_template: any;


//--------------------- after scrolling  (reduce the height of navbar) -------
@Input() isScrolled = false;

   
 loader: boolean = false;


 private navItemWidthCache = new Map<string, number>();

private navItemMetaCache = new Map<
  string,
  {
    key: string;
    role: string;
    order: number;
    width: number;
  }
>();

 // ------------------ for sharemodal open --------------
//  @ViewChild('Modal2', { read: IonModal }) modal2!: IonModal;
 @ViewChild('navMenu', { read: ElementRef }) navMenuEl?: ElementRef<HTMLElement>;
 @ViewChildren('navItem', { read: ElementRef }) navItemEls?: QueryList<ElementRef<HTMLElement>>;
 @ViewChild('moreMeasure', { read: ElementRef }) moreMeasureEl?: ElementRef<HTMLElement>;


// ----------------- autoplay profile banner video logic on refresh also ------------------

@ViewChild('heroVideo')
set heroVideo(video: ElementRef<HTMLVideoElement> | undefined) {
  if (!video) return;

  const el = video.nativeElement;

  el.muted = true;
  el.playsInline = true;
  el.autoplay = true;

  const play = () => {
    el.play().then(() => {
      console.log('Video playing');
    }).catch(err => {
      console.error('Autoplay failed:', err.name, err.message, err);
    });
  };

  el.addEventListener('canplay', play, { once: true });
}
// ----------------------------------------------------------------
profile_banner_video_user: any;
profile_banner_video_admin: any;
 hover = false;
 isMenuOpen = false;
 profile_back_image: any
 card1bgcolour: any;
 card2bgcolour: any;
  bodybgcolour: any;
 card2textcolour: any;
  card1textcolour: any;
  isBrowser: boolean = false;
  profile_banner_images : any;
  profile_banner_video : any;
 isHover: boolean = false;
 contacts: any[] = [];
 profileImage: string = '';
hoveredIndex: number = -1;
hoveredIndexDropdown: number = -1;
bodytextcolour: any;
// screenWidth:any;

 isDesktopNav: boolean = false;
 showMoreDropdown: boolean = false;
 private movedNavKeys = new Set<string>();
 private resizeSub?: Subscription;
 private navItemsChangeSub?: Subscription;
 private isApplyingOverflow: boolean = false;
 constructor(
   @Inject(PLATFORM_ID) private platformId: Object,
   public globalObject: Globalobjects,
   public loginService: Login,
   private ngZone: NgZone,
 ) {
   // if (this.globalObject.isTemplate) {
   //   return applyLoggingDecorator(this, "profile")
   // }
 }






 ngOnInit() {

  // if (isPlatformBrowser(this.platformId)) {
    this.updateScreenWidth();
  // }

 


   console.log(this.datas)
   console.log(this.latest_update)
   console.log(this.contact_details)
   // console.log('Profile ngOnInit - template_type:', this.template_type);
   // console.log('Profile ngOnInit - data:', this.data);
   // console.log('Profile ngOnInit - data2:', this.data2);
   // console.log('Profile ngOnInit - datas:', this.datas)
   if (this.data) {
     this.profileImage = this.data?.data?.[0]?.image;
   }


   console.log(this.template_type)
   if (this.data2?.data?.[0]) {
  

    if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = this.user_template?.data[0]?.card_text_color1 ? this.user_template?.data[0]?.card_text_color1 : this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =  this.user_template?.data[0]?.card_background_color1 ? this.user_template?.data[0]?.card_background_color1 : this.data2?.data[0]?.card_background_color1;
    } else {
      this.card1textcolour =  this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =   this.data2?.data[0]?.card_background_color1;
    }

     this.profile_back_image = this.data2?.data[0]?.profile_back_image;
      this.bodytextcolour = this.data2?.data[0]?.body_text_color;
    //    this.card1textcolour = this.data2?.data[0]?.card_text_color1;
    //  this.card1bgcolour = this.data2?.data[0]?.card_background_color1;
     this.card2textcolour = this.data2?.data[0]?.card_text_color2;
     this.card2bgcolour = this.data2?.data[0]?.card_back_color2;
       this.bodybgcolour = this.data2?.data[0]?.back_body_color;
       this.profile_banner_images=this.data2?.data[0]?.profile_banner_images_list
       this.profile_banner_video_user=this.user_template?.data[0]?.profile_banner_video;
       this.profile_banner_video_admin=this.data2?.data[0]?.profile_banner_video;
      
   } else {
     console.warn('Profile component: data2 not available in ngOnInit');
   }
 }







ngAfterViewInit() {
 // ------------ nav bar open and close in mobile view ----------------
 if (!isPlatformBrowser(this.platformId)) {
   return;
 }


 const navItems = document.getElementById('navItems');
 const templateOuter = document.querySelector('.template-new-1-outer-div');


 if (navItems && templateOuter) {


   navItems.addEventListener('shown.bs.collapse', () => {
     this.isMenuOpen = true;
     templateOuter.classList.add('menu-open');
   });


   navItems.addEventListener('hidden.bs.collapse', () => {
     this.isMenuOpen = false;
     templateOuter.classList.remove('menu-open');
   });
 }


 this.initDesktopOverflowMenu();



}






 ngOnDestroy() {
   this.resizeSub?.unsubscribe();
   this.navItemsChangeSub?.unsubscribe();
 }


 isMoved(key: string): boolean {
   return this.movedNavKeys.has(key);
 }


hasPaymentData(payment: any): boolean {
  if (!payment?.data || !Array.isArray(payment.data)) {
    return false;
  }

  return payment.data.some((a: any) =>
    !!a?.paytm ||
    !!a?.upi ||
    !!a?.phonepay ||
    !!a?.google_pay ||
    (!!a?.account_number && !!a?.ifsc_code)||
     !!a?.qr_image1 ||
       !!a?.qr_image2 
  );
}



toggleMenu() {

  const navItems = document.getElementById('navItems');

  if (!navItems) {
    return;
  }

  const bootstrap = (window as any).bootstrap;

  if (!bootstrap?.Collapse) {
    return;
  }

  const collapse = bootstrap.Collapse.getOrCreateInstance(navItems);

  console.log('isMenuOpen:', this.isMenuOpen);
  console.log('show class:', navItems.classList.contains('show'));

  if (navItems.classList.contains('show')) {
    collapse.hide();
  } else {
    collapse.show();
  }
}
 // ---------------  more dropdown show on window resize (navbar overflow logic for new web templates) -----------

private initDesktopOverflowMenu() {
  this.updateDesktopNavFlag();

 
  this.ngZone.runOutsideAngular(() => {
    this.resizeSub = fromEvent(window, 'resize')
      .pipe(auditTime(100))
      .subscribe(() => {
        this.ngZone.run(() => {
          this.updateDesktopNavFlag();
          this.scheduleOverflowRecalc();
        });
      });
  });


  
  this.navItemsChangeSub = this.navItemEls?.changes.subscribe(() => {
    if (this.isApplyingOverflow) return;

    this.scheduleOverflowRecalc();
  });



  this.scheduleOverflowRecalc();
}



private updateDesktopNavFlag() {
  if (!isPlatformBrowser(this.platformId)) return;

  const nextIsDesktop = window.innerWidth > 991;

  if (this.isDesktopNav === nextIsDesktop) return;

  this.isDesktopNav = nextIsDesktop;

  if (!this.isDesktopNav) {
    this.movedNavKeys.clear();
    this.showMoreDropdown = false;

    this.navItemWidthCache.clear();
    this.navItemMetaCache.clear();
  }
}



private scheduleOverflowRecalc() {
  if (!this.isDesktopNav) return;
  if (!this.navMenuEl || !this.navItemEls) return;

  if (!isPlatformBrowser(this.platformId)) {
    this.applyOverflowCalculation();
    return;
  }

  if (this.isApplyingOverflow) return;

  this.isApplyingOverflow = true;


  requestAnimationFrame(() => {
    requestAnimationFrame(() => {

      this.applyOverflowCalculation();


      this.isApplyingOverflow = false;
    });
  });
}



private applyOverflowCalculation() {
  if (!this.isDesktopNav) return;
  if (!this.navMenuEl || !this.navItemEls) return;



  const navMenu = this.navMenuEl.nativeElement;

  const styles = window.getComputedStyle(navMenu);



  const paddingLeft =
    Number.parseFloat(styles.paddingLeft || '0') || 0;

  const paddingRight =
    Number.parseFloat(styles.paddingRight || '0') || 0;



  const gap =
    Number.parseFloat(
      (styles as any).columnGap || styles.gap || '0'
    ) || 0;



  const containerWidth =
    navMenu.clientWidth -
    paddingLeft -
    paddingRight;

  const epsilon = 2;

  if (containerWidth <= 0) return;




  const visibleItems = this.navItemEls
    .toArray()
    .map((el) => {

      const nativeEl = el.nativeElement;

      const key =
        nativeEl.dataset['navKey'] || '';

      const role =
        nativeEl.dataset['navRole'] || '';

      const order =
        Number(
          nativeEl.dataset['navOrder'] || 0
        );

      const width =
        nativeEl.getBoundingClientRect().width || 0;

      return {
        key,
        role,
        order,
        width
      };
    })
    .filter(
      (i) =>
        !!i.key &&
        i.width > 0
    );



  for (const item of visibleItems) {

    this.navItemWidthCache.set(
      item.key,
      item.width
    );

    this.navItemMetaCache.set(
      item.key,
      {
        key: item.key,
        role: item.role,
        order: item.order,
        width: item.width
      }
    );
  }




  const allItems = Array.from(
    this.navItemMetaCache.values()
  )
    .map((item) => {

      const cachedWidth =
        this.navItemWidthCache.get(item.key);

      return {
        ...item,
        width:
          cachedWidth || item.width
      };
    })
    .filter(
      (i) =>
        !!i.key &&
        i.width > 0
    );



  const contact = allItems.find(
    (i) => i.role === 'contact'
  );

  if (!contact) return;



  const movable = allItems
    .filter(
      (i) =>
        i.role !== 'contact' &&
        i.key !== 'home'
    )
    .slice()
    .sort(
      (a, b) =>
        b.order - a.order
    );


 

  const totalBaseWidth =
    allItems.reduce(
      (sum, item) =>
        sum + item.width,
      0
    );

  const totalGapsNoMore =
    Math.max(
      0,
      allItems.length - 1
    ) * gap;

  const requiredNoMore =
    totalBaseWidth +
    totalGapsNoMore;



  if (
    requiredNoMore <=
    containerWidth - epsilon
  ) {

    this.movedNavKeys.clear();

    this.showMoreDropdown = false;

    return;
  }




  const moreWidth =
    this.moreMeasureEl
      ?.nativeElement
      .getBoundingClientRect()
      .width || 80;



  let requiredWithMore =
    totalBaseWidth +
    moreWidth +
    Math.max(
      0,
      allItems.length
    ) * gap;


  const moved = new Set<string>();


  for (const item of movable) {

  
    if (
      requiredWithMore <=
      containerWidth - epsilon
    ) {
      break;
    }

    moved.add(item.key);

    requiredWithMore -=
      item.width + gap;
  }



  this.movedNavKeys = moved;

  this.showMoreDropdown =
    moved.size > 0;
}


// ------------ open pages dropdown and close --------
isPagesOpen = false;


togglePages(event: Event): void {
 event.preventDefault();
 event.stopPropagation();


 this.isPagesOpen = !this.isPagesOpen;
}


closePages(): void {
 this.isPagesOpen = false;
}




scrollToSection(sectionId: string) {
  
//  this.dataEvent.emit(sectionId);


 // close custom Pages dropdown
 this.closePages();


 if (!isPlatformBrowser(this.platformId)) {
   return;
 }


 const navItems = document.getElementById('navItems');
 const navbarNavAltMarkup = document.getElementById('navbarNavAltMarkup');
  const navbarNavAltMarkup1 = document.getElementById('navbarNavAltMarkup1');

 const bootstrap = (window as any)?.bootstrap;

 if (bootstrap?.Collapse) {
  if (navItems) {
    bootstrap.Collapse.getOrCreateInstance(navItems).hide();
  }

  if (navbarNavAltMarkup) {
    bootstrap.Collapse.getOrCreateInstance(navbarNavAltMarkup).hide();
  }

  if (navbarNavAltMarkup1) {
    bootstrap.Collapse.getOrCreateInstance(navbarNavAltMarkup1).hide();
  }
}

 setTimeout(() => {
    this.dataEvent.emit(sectionId);
  }, 350);


 this.isMenuOpen = false;
}


@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent): void {
 const target = event.target as HTMLElement;


 if (!target.closest('.nav-more')) {
   this.isPagesOpen = false;
 }
}


 ngOnChanges(changes: SimpleChanges) {

  
   if (changes['template_type']) {
     console.log('Profile ngOnChanges - template_type changed:',
       'previous:', changes['template_type'].previousValue,
       'current:', changes['template_type'].currentValue);
   }


   if (this.data2?.data?.[0]) {
    //  this.card1textcolour = this.data2.data[0].card_text_color1;
    //  this.card1bgcolour = this.data2.data[0].card_background_color1;
      if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = this.user_template?.data[0]?.card_text_color1 ? this.user_template?.data[0]?.card_text_color1 : this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =  this.user_template?.data[0]?.card_background_color1 ? this.user_template?.data[0]?.card_background_color1 : this.data2?.data[0]?.card_background_color1;
    } else {
      this.card1textcolour =  this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =   this.data2?.data[0]?.card_background_color1;
    }
    
     this.profile_back_image = this.data2?.data[0]?.profile_back_image;
     this.card2textcolour = this.data2?.data[0]?.card_text_color2;
     this.card2bgcolour = this.data2?.data[0]?.card_back_color2;
   }
 }


 cc() {
   alert("kajsbdkb")
 }
 // ------------------ for sharemodal open --------------
 share(data?: any) {
   this.dataEvent.emit(data);
 }


addGoogleReview() {


 const userCode = this.company_info.data?.[0]?.user_code;


 if (!userCode) {
   return;
 }


 const reviewWindow = window.open('', '_blank');


 // Show loading message in new tab
 if (reviewWindow) {
   reviewWindow.document.write(`
     <html>
       <head>
         <title>Loading...</title>
         <style>
           body{
             display:flex;
             justify-content:center;
             align-items:center;
             height:100vh;
             font-family:Arial,sans-serif;
           }
         </style>
       </head>
       <body>
         <div>Loading Google Review...</div>
       </body>
     </html>
   `);
   reviewWindow.document.close();
 }


//  this.globalObject.loader = true;


 const reqData = {
   wsdp: {
     user_code: userCode
   }
 };


 this.loginService.postData(reqData, 'getGoogleReviewData')
   .subscribe({
     next: (response) => {


       this.globalObject.loader = false;


       if (response?.link) {


         if (reviewWindow) {
           reviewWindow.location.href = response.link;
         } else {
           window.location.href = response.link;
         }


       } else if (reviewWindow) {
         reviewWindow.close();
       }
     },
     error: () => {


       this.globalObject.loader = false;


       if (reviewWindow) {
         reviewWindow.close();
       }
     }
   });
}


 // onFileSelected(event: any) {


 //   const safeUrl = encodeURI(this.globalObject.url);


 //   const contact = {
 //     name: this.data.data[0].first_name + " " + this.data.data[0].last_name,
 //     phone: this.datas.data[0].mobile_no,
 //     email: this.datas.data[0].email_id,
 //     website: safeUrl
 //   };


 //   const vcfData = `BEGIN:VCARD
 //     VERSION:3.0
 //     FN:${contact.name}
 //     TEL;TYPE=cell:${contact.phone}
 //     EMAIL:${contact.email}
 //     URL:${contact.website}
 //     END:VCARD`;


 //   const blob = new Blob([vcfData], { type: 'text/vcard' });
 //   const url = window.URL.createObjectURL(blob);
 //   const a = document.createElement('a');
 //   a.href = url;
 //   a.download = `${contact.name}.vcf`;
 //   a.click();
 //   window.URL.revokeObjectURL(url);
 // }




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



 // ----------get media screen px to apply style on mobile and desktop view ---------------
 
  //  screenWidth = window.innerWidth;

  // @HostListener('window:resize')
  // onResize() {
  //    if (isPlatformBrowser(this.platformId)) {
  //   this.screenWidth = window.innerWidth;
  //    }
  // }
screenWidth: any;

@HostListener('window:resize')
onResize() {
  this.updateScreenWidth();
}

private updateScreenWidth() {
  if (isPlatformBrowser(this.platformId)) {
    this.isBrowser = true;
    this.screenWidth = window.innerWidth;
    console.log('screenWidth:', this.screenWidth);
  }
}
 // scrollToSection(sectionId: string) {
 //   // if (isPlatformServer(this.platformId)) return;
 //   // this.menuController.close();
 //   // const element = document.getElementById(sectionId);
 //   this.dataEvent.emit(sectionId);


 //   if (!isPlatformBrowser(this.platformId)) {
 //     return;
 //   }


 //   const navItems = document.getElementById('navItems');
 //   if (!navItems || !navItems.classList.contains('show')) {
 //     return;
 //   }


 //   const bootstrap = (window as any)?.bootstrap;
 //   if (bootstrap?.Collapse?.getOrCreateInstance) {
 //     bootstrap.Collapse.getOrCreateInstance(navItems).hide();
 //     return;
 //   }


 //   const toggler = document.querySelector(
 //     'button.navbar-toggler[aria-controls="navItems"]',
 //   ) as HTMLElement | null;
 //   toggler?.click();
 //   // this.menuController.close();
 // }








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



