import { ChangeDetectorRef, Component, Inject, Input, OnInit, OnDestroy, Optional, PLATFORM_ID, REQUEST, ViewChild, PendingTasks, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, finalize, take, takeUntil } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileComponent } from './template_sections/profile/profile.component';
import { SocialLinksComponent } from './template_sections/social-links/social-links.component';
import { SocialContactComponent } from './template_sections/social-contact/social-contact.component';
import { WhatsappSettingsComponent } from './template_sections/whatsapp-settings/whatsapp-settings.component';
import { QrcodeComponent } from './template_sections/qrcode/qrcode.component';
import { CompanyInfoComponent } from './template_sections/company-info/company-info.component';
import { OtherLinksComponent } from './template_sections/other-links/other-links.component';
import { ProductsComponent } from './template_sections/products/products.component';
import { ServicesComponent } from './template_sections/services/services.component';
import { PaymentComponent } from './template_sections/payment/payment.component';
import { AboutUsComponent } from './template_sections/about-us/about-us.component';
import { EducationComponent } from './template_sections/education/education.component';
import { GallaryComponent } from './template_sections/gallary/gallary.component';
import { OtherBusinessesComponent } from './template_sections/other-businesses/other-businesses.component';
import { LatestUpdateComponent } from './template_sections/latest-update/latest-update.component';
import { ContactUsComponent } from './template_sections/contact-us/contact-us.component';

import { ExperienceComponent } from './template_sections/experience/experience.component';
import { VideoComponent } from './template_sections/video/video.component';
import { SkillsComponent } from './template_sections/skills/skills.component';
import { Login } from '../../../services/login';
import { Globalobjects } from '../../../services/globalobjects';
import { Seo } from '../../../services/seo';

declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    ProfileComponent, VideoComponent,
    SocialLinksComponent, SocialContactComponent, SkillsComponent,
    WhatsappSettingsComponent, QrcodeComponent, CompanyInfoComponent,
    OtherLinksComponent, ProductsComponent, ServicesComponent,
    PaymentComponent, AboutUsComponent, EducationComponent, ExperienceComponent,
    GallaryComponent, OtherBusinessesComponent, LatestUpdateComponent,
    ContactUsComponent
  ],
  providers: [Login,  Globalobjects, Seo]
})
export class TemplatePage implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  private templateLoaded = false;
  userCode: string = ''; // Store user_code for Google Review
  slug: string = ''; // Dynamic slug from route

  previewFlag!: boolean;
  operateSocialLink: any = "";
  selectedProduct: any = null;
  template_type: any = "layout3";
  showErrors = false;
  selectedService: any = null;
  encodedWhatsAppMessage: string = '';
  style_type: any;
  imagePath: string | undefined;
  showLocation = false
  templateStyleData: any;
  temp_details_data: any;
  modal_latest_update: any;
  currentIndex = 0;
  componentsOrder: any = [];
  sanitizedUrl!: SafeResourceUrl;
  bodybgcolour: any;
  card1textcolour: any = '';
  card1bgcolour: any;
  card2textcolour: any;
  url: any;
  passid: any;
  card2bgcolour: any = '';
  loader: boolean = false;
  templatebgimg: any;
  profile_back_image: any;
  socialLinksList: any = [];
  templateId: any;
  dtaObj: any = {
    bg_color: "red",
    body_bg_color: "#0d9494"

  }


  
  childMessage: any = []; bodytextcolour: any;
  ;
  template1: any;
  ischeck: boolean = false;
  componentsOrder1 = [
    'app-template-header',
    'app-about-us',
    'app-stay-connected',
    'app-services',
    'app-about-me',
    'app-products',
    'app-gallary',
    'app-companies',
    'app-template-footer',
  ];

  card_style: any;
  Contact: any = {
    socialPortal: '',
    tel: '',
    email: '',
    desc: ''
  }
  isHover: boolean = false;
  hover = false;
  hoveredIndex: number | null = null;
  @Input() template_view!: string;

  @Input() input_id!: string;


  // Pure Angular UI state (replaces Ionic modals/menu)
  menuOpen = false;
// Old/base modals
showProductModal = false;       // Modal
showShareModal = false;         // Modal2
showServiceModal = false;       // Modal1
showLatestModal = false;        // Modal3
showHelpModal = false;          // helpModal

// New-template modals
showShareModalNew = false;      // Modal4
showProductModalNew = false;    // Modal5
showServiceModalNew = false;    // Modal6
showLatestModalNew = false;     // Modal7


  @ViewChild(LatestUpdateComponent) latestUpdateComp!: LatestUpdateComponent;



  shareMessage: string = "Hello! Check out my profile card.";
  shareUrl: string = "https://example.com/my-profile";

  styleArr: any = {};

  editCardFlag: boolean = false;



  constructor(private seo: Seo, public route: ActivatedRoute, public globalObject: Globalobjects, private router: Router, public loginService: Login,
    private pendingTasks: PendingTasks, private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) public platformId: Object, @Optional() @Inject(REQUEST) private request: any,

    private sanitizer: DomSanitizer) {
    // if (this.globalObject.isTemplate) {
    //   return applyLoggingDecorator(this, "template")
    // }
    // console.log("template url :- ", this.route.url)

    // Get slug from route params
    this.route.params.subscribe(params => {
      this.slug = params['slug'];
      console.log("Slug from URL:", this.slug);
    });

  }




  //---------------------------------- gallery carousel ( new template 1 )---------------------------






  ngOnInit() {

    
    // this.globalObject.destroyLocalData("cur_symbol_sign");
    this.setProperty();
    this.imagePath = this.getImagePath('template_one');
    // The template is rendered from two dependent HTTP calls. Register the
    // chain with SSR so Angular does not serialize the initial, empty view.
    // Route data is emitted after route activation. Applying it here (instead
    // of in the constructor) guarantees that nested @if blocks see the data
    // during the server's first render pass.
    this.route.data.pipe(take(1)).subscribe(data => {
      const resolvedTemplate = data['templateData'];
      if (resolvedTemplate?.detailResponse?.responseStatus?.includes('success')) {
        this.applyResolvedTemplate(resolvedTemplate);
        return;
      }

      // Fallback for usages outside the router, such as an embedded preview.
      const completeSsrTask = isPlatformServer(this.platformId)
        ? this.pendingTasks.add()
        : undefined;
      this.callTemp(completeSsrTask);
    });
    // console.log(this.childMessage)

    // this.setMetaTags();

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // private applyResolvedTemplate(resolvedTemplate: any): void {
  //   const callData = { ...resolvedTemplate.callResponse.responseData[0] };
  //   const details = resolvedTemplate.detailResponse.responseData;
  //   const templateType = callData.template_type;

  //   this.userCode = callData.user_code ?? '';
  //   this.template_type =
  //     templateType === 'Layout-1' ? 'layout4' :
  //     templateType === 'Layout-2' ? 'layout5' :
  //     templateType === 'Layout-3' ? 'layout6' :
  //     templateType === 'Layout-4' ? 'layout1' :
  //     templateType === 'Layout-5' ? 'layout2' :
  //     templateType === 'Layout-6' ? 'layout3' :
  //     templateType === 'Layout-7' ? 'layout7' :
  //     templateType === 'Layout-8' ? 'layout8' :
  //     templateType === 'Layout-9' ? 'layout9' : 'layout4';
  //   this.style_type = callData.template_id;
  //   this.componentsOrder = callData.template_seq ? callData.template_seq.split(',') : [];
  //   this.temp_details_data = details;
  //   this.globalObject.googleReviewLink =  details?.google_review_link?.data?.[0]?.google_review_link || '';
  //   this.applyTemplateSeo(details);

  //   const style = details?.template_layout_style?.data?.[0];
  //   if (style) {
  //     this.bodybgcolour = style.back_body_color;
  //     this.card1textcolour = style.card_text_color1;
  //     this.card1bgcolour = style.card_background_color1;
  //     this.card2textcolour = style.card_text_color2;
  //     this.card2bgcolour = style.card_back_color2;
  //     this.bodytextcolour = style.body_text_color;
  //     this.templatebgimg = this.globalObject.getImageSrc(style.card_background_image1);
  //     this.profile_back_image = style.profile_back_image;
  //     this.card_style = style.card_style;
  //   }
  //   this.setProperty();

  //   if (Array.isArray(details?.video_gallery?.data)) {
  //     details.video_gallery.data = details.video_gallery.data.map((video: any) => ({
  //       ...video,
  //       safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(this.convertToEmbedUrl(video.video_url))
  //     }));
  //   }

  //   // The app is zoneless. Updating regular class fields does not trigger a
  //   // second render automatically, so structural @if blocks otherwise remain
  //   // as SSR placeholders until a mouse or click event occurs.
  //   this.cdr.markForCheck();
  // }
private applyResolvedTemplate(resolvedTemplate: any): void {

  const callData = {
    ...resolvedTemplate.callResponse.responseData[0]
  };
  const details = resolvedTemplate.detailResponse.responseData;
 const templateType = callData.template_type;
  this.userCode = callData.user_code ?? '';
  this.template_type = templateType === 'Layout-1' ? 'layout4' :
    templateType === 'Layout-2' ? 'layout5' :
    templateType === 'Layout-3' ? 'layout6' :
    templateType === 'Layout-4' ? 'layout1' :
    templateType === 'Layout-5' ? 'layout2' :
    templateType === 'Layout-6' ? 'layout3' :
    templateType === 'Layout-7' ? 'layout7' :
    templateType === 'Layout-8' ? 'layout8' :
    templateType === 'Layout-9' ? 'layout9' :
    'layout4';
  this.style_type = callData.template_id;
  this.componentsOrder =  callData.template_seq  ? callData.template_seq.split(',')  : [];
  this.temp_details_data = details;
  this.globalObject.googleReviewLink =
    details?.google_review_link?.data?.[0]?.google_review_link || '';
  this.applyTemplateSeo(details);
  const style = details?.template_layout_style?.data?.[0];
  const userStyle = details?.user_template_layout_style?.data?.[0];
  if (style) {
    this.bodybgcolour =style.back_body_color;
    if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = userStyle?.card_text_color1 ? userStyle?.card_text_color1 : style?.card_text_color1;
    this.card1bgcolour =  userStyle?.card_background_color1 ? userStyle?.card_background_color1 : style?.card_background_color1;
    } else {
      this.card1textcolour =  style?.card_text_color1;
    this.card1bgcolour =   style?.card_background_color1;
    }
    this.card2textcolour = style?.card_text_color2;
    this.card2bgcolour = style?.card_back_color2;
    this.bodytextcolour = style?.body_text_color;

    this.templatebgimg =  this.globalObject.getImageSrc(
        style?.card_background_image1
      );
    this.profile_back_image =  style?.profile_back_image;
    this.card_style =   style?.card_style;
  }


  
  this.setProperty();


  if (Array.isArray(details?.video_gallery?.data)) {

    details.video_gallery.data =
      details.video_gallery.data.map((video: any) => ({
        ...video,

        safeUrl:
          this.sanitizer
            .bypassSecurityTrustResourceUrl(
              this.convertToEmbedUrl(video.video_url)
            )
      }));
  }


  this.cdr.markForCheck();
}








  openServiceModal(service: any) {
    this.selectedService = service;
  }

  openProductModal(product: any) {
    this.selectedProduct = product;
  }


  getImagePath(template: string): string {

    return this.globalObject.assetsUrl + `/templates_pcard/${template}/img/top-img.png`;
  }





  private convertToEmbedUrl(url: string): string {
    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/");
    }
    return url;
  }

  private applyTemplateSeo(details: any): void {
    const profile = details?.profile_images?.data?.[0];
    const seoProfile = details?.seo_profile_images?.data?.[0];
    const templateUrl = details?.pcard_url_template?.data?.[0]?.template_url;
    const seoData = details?.seo?.data?.[0];

    if (!profile || !templateUrl) return;

    const seoImage = seoData?.seo_image || seoProfile?.image || profile.image ||
      this.globalObject.assetsUrl + '/header/PROFILE.png';
    const seoTitle = details?.seo?.title || seoData?.title;

    this.globalObject.setMetaTags(
      profile,
      templateUrl,
      seoImage,
      seoData?.keyword || '',
      seoData?.description || '',
      seoProfile,
      seoTitle
    );
  }



  playVideo(video: any) {
    const embedUrl = this.convertToEmbedUrl(video.video_url) + '?autoplay=1';
    video.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }


  getSmsLink(): string {
    const number = this.temp_details_data?.contact_Details?.[0]?.mobile_number || '';
    const url = this.temp_details_data?.qr_code?.[0]?.qr_url || '';
    return 'sms:' + number + '?body=' + encodeURIComponent(url);
  }


  initializeSwiper() {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      if (typeof Swiper === 'undefined') return;

      new Swiper('.mySwiper', {
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 2000,
          disableOnInteraction: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          0: {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
        },
      });
    }, 100);
  }






  getSanitizedUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }











  // checkToast(operation?: string) {

  //   this.toastr.success("Saved successfully");

  // }




  // scrollToSection(sectionId: string) {
  //   if (isPlatformServer(this.platformId)) return;
  //   this.menuController.close();
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  //   this.menuController.close();
  // }



  scrollToSection(sectionId: string) {
    if (isPlatformServer(this.platformId)) return;

    this.closeMenu();

    setTimeout(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  }

  scrollToTop() {
    if (isPlatformServer(this.platformId)) return;

    this.closeMenu();

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleMenu() {
    if (isPlatformBrowser(this.platformId)) {
      this.menuOpen = !this.menuOpen;
    }
  }

  closeMenu() {
    this.menuOpen = false;
  }


  receiveData(message: any) {

    this.childMessage = message;
    if (message.short_desc) {

      this.childMessage.desc_html = this.decodeHtml(this.childMessage?.short_desc)
    }
    if (message.modal_type == 'Modal') {

      this.showProductModal = true;
    }
    // else if (message == 'product_new') {
    //   this.showProductModal = true;
    // }
    // else if (message == 'Services_new') {
    //   this.showServiceModal = true;
    // } else if (message == 'latest') {
    //   this.showLatestModal = true;
    // }
    else if (message.modal_type == 'old-update') {
      this.modal_latest_update = message;
      this.showLatestModal = true;
    }
    else if (message.modal_type == 'Modal7') {
      this.modal_latest_update = message;
      console.log(this.modal_latest_update)
      this.showLatestModalNew = true;

    }





    else {
      this.showServiceModal = true;
    }



  }

  receiveData11(message: any) {
    this.childMessage = message;
    if (message.short_desc) {

      this.childMessage.desc_html = this.decodeHtml(this.childMessage?.short_desc)
    }
    if (message.modal_type == 'Modal3') {

      this.showLatestModal = true;
    }
  }


  receiveData121(message: any) {
    this.showShareModal = true;
  }


  openpopup(sectionId: any) {
    if (isPlatformServer(this.platformId)) return;

    if (sectionId == "Profile2") {
      this.showShareModalNew = true;
      return
    }
 if (sectionId == "Profile7") {
      this.showShareModalNew = true;
      return
    }

    this.passid = sectionId;

    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        console.warn('Section not found:', sectionId);
      }
    };

    if (sectionId === 'education' || sectionId === 'skills' || sectionId === 'experience') {
      setTimeout(scrollToSection);
      return;
    }

    scrollToSection();
  }







  // receiveData1(message: any) {
  //   if (message == 'Profile2') {
  //     this.showShareModal = true;

  //   } else {
  //     this.showShareModal = true;
  //   }

  // }
receiveData1(message: any) {
  this.showShareModal = true;
}
  // receiveData6(message: any) {
  //   console.log(message+"from the services")
  //   this.childMessage = message;
  //   if (message.short_desc) {

  //     this.childMessage.desc_html = this.decodeHtml(this.childMessage?.short_desc)
  //   }
  //   if (message.modal_type == 'Modal6') {
  //     this.showServiceModal = true;

  //   }
  // }

  receiveData6(message: any) {
  console.log(message+"from the services")
  this.childMessage = message;

  if (message.short_desc) {
    this.childMessage.desc_html =
      this.decodeHtml(this.childMessage?.short_desc);
  }

  if (message.modal_type == 'Modal6') {
    this.showServiceModalNew = true;
  }
}
  // receiveData7(message: any) {

  //   this.childMessage = message;
  //   if (message.short_desc) {

  //     this.childMessage.desc_html = this.decodeHtml(this.childMessage?.short_desc)
  //   }
  //   if (message.modal_type == 'Modal5') {
  //     this.showProductModal = true;

  //   }
  // }


receiveData7(message: any) {
  this.childMessage = message;

  if (message.short_desc) {
    this.childMessage.desc_html =
      this.decodeHtml(message.short_desc);
  }

  if (message.modal_type === 'Modal5') {
    this.showProductModalNew = true;
  }
}






  setProperty() {
    this.styleArr = {

      // --------- started layout 4 sub-templates ---------------

      style2: {
        temp_div_class: 't2',
        temp_div_style: ``,
        profile_bg_img_div: { 'background-image': 'linear-gradient(45deg, color-mix(in srgb, ' + this.card1bgcolour + ' 87%, transparent),  color-mix(in srgb, ' + this.card2bgcolour + ' 91%, #ffffff 38%))' },
        profile_h1_p: { 'color': this.card2textcolour },
        profile_h4: { 'color': 'color-mix(in srgb, ' + this.card2bgcolour + ' 42%, #ffffff 96%)' },
        share_profile_btn_div: { 'background-color': '#fff' },
        social_contact: { 'background-color': this.card1bgcolour },
        social_contact_links: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour },
        social_contact_a: { 'color': this.card2textcolour },
        share_profile_button_hover: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour },
        social_contact_span: { 'color': this.card2textcolour },
        


      },
      style3: {
        temp_div_class: 't3',
        temp_div_style: ``,
        card_heading_bg: ``,
        profile_bg_img_div: { 'background-image': 'linear-gradient(45deg, #000000ba, #00000080), url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )' },
        profile_h1_h4_p: { 'color': this.card1textcolour },
        share_profile_btn_div: { 'background-color': '#fff' },
        social_contact: { 'background-color': this.card1bgcolour },
        social_contact_links: { 'color': this.card1textcolour, 'border-bottom': '1px solid ' + this.card1textcolour },
        social_contact_a: { 'color': this.card1textcolour },
          share_profile_button_hover: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour },
        social_contact_span: { 'color': this.card1textcolour },
     

      },
      style4: {
        temp_div_class: 't4',
        temp_div_style: ``,
        card_heading_bg: ``,
        profile_h1_h4_p: { 'color': this.card1textcolour },
         share_profile_button_hover: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour , 'border': '1px solid ' + this.card1textcolour},
        profile_bg_img_div: { 'background-image': 'linear-gradient(45deg, ' + this.card1bgcolour + ', color-mix(in srgb, ' + this.card1bgcolour + ' 60%, white))' },
        share_profile_btn_div: { 'background-color': this.card1bgcolour },
        share_profile_button: { 'background-color': this.card1textcolour, 'color': this.card1bgcolour },
        social_contact_links: { 'background-color': this.card1bgcolour },
        social_contact_a: { 'background-color': this.card1textcolour, 'color': this.card1bgcolour },
        social_contact_span: { 'color': this.card1textcolour },
        popup_card_header: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        popup_enquiry_btns: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
           link_btn_latest_other_business_hover: {'background-color': this.card2bgcolour, 'color': this.card2textcolour , 'border' : '2px solid ' + this.card2textcolour }

      },
      style5: {
        temp_div_class: 't5',
        temp_div_style: ``,
        card_heading_bg: ``,
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )' },
        profile_h1_h4_p: { 'color': this.card2textcolour },
        share_profile_button: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour },
        share_profile_btn_div: { 'background-color': '#fff' },
          share_profile_button_hover: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        social_contact: { 'background-color': this.card1bgcolour },
        social_contact_links: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        social_contact_a: { 'color': this.card1textcolour },
        social_contact_span: { 'color': this.card1textcolour },

      },
      style22: {
        temp_div_class: 't22',
        temp_div_style: { 'background-color': this.card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )' },
        profile_h1_h4_p: { 'color': this.card1textcolour },
        share_profile_button: { 'background-color': 'color-mix(in srgb, ' + this.card1bgcolour + ' 85%, black)', 'color': this.card1textcolour },
        share_profile_btn_div: { 'background-color': '#fff' },
        social_contact_links: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour },
        social_contact_a: { 'color': 'color-mix(in srgb, ' + this.card1bgcolour + ' 85%, black)' },
        social_contact_span: { 'color': this.card2bgcolour },
        share_profile_button_hover: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour },

      },
      style24: {
        temp_div_class: 't24',
        card_heading_bg: { 'background-color': 'transparent', 'color': this.card1textcolour },
        temp_div_style: { 'background-color': this.card2bgcolour },
        share_profile_button: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour },
        share_profile_btn_div: { 'background-color': '#fff' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )' },
        social_contact_links: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour },
        social_contact_a: { 'background-color': 'transparent', 'color': this.card2bgcolour },
        social_contact_span: { 'color': this.card2bgcolour },
        profile_h1_h4_p: { 'color': this.card1textcolour },
        share_profile_button_hover: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },

      },
      style30: {
        temp_div_class: 't30',
        temp_div_style: { 'background-color': this.card2bgcolour },
        card_heading_bg: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour },
        share_profile_button: { 'background-color': '#01AD49', 'color': 'white' },
        social_contact_links: { 'background-color': this.card1textcolour, 'color': this.card1bgcolour },
        social_contact_a: { 'background-color': 'transparent', 'color': this.card1bgcolour },
        social_contact_span: { 'color': this.card1bgcolour },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )' },
        share_profile_btn_div: { 'background-color': 'transparent' },
        profile_h1_h4_p: { 'color': this.card1textcolour },
        share_profile_button_hover: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour },

      },

      style33: {
        temp_div_class: 't33',
        temp_div_style: { 'background-color': this.card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )' },
        card_heading_bg: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour },
        other_business_h2: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour ,'border' : '2px solid ' + this.card2bgcolour },
           link_btn_latest_other_business_hover: { 'background-color': this.card1textcolour, 'color': this.card1bgcolour ,'border' : '2px solid ' + this.card1textcolour },
        other_business_visit_btn: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour ,'border' : '2px solid ' + this.card2bgcolour },
        other_links_icon: { 'border': '1px solid ' + this.card2textcolour, 'background-color': this.card2bgcolour, 'color': this.card2textcolour },
         other_links_icon_hover: { 'border': '1px solid ' + this.card2textcolour, 'background-color': this.card2bgcolour, 'color': this.card2textcolour , 'border-right': 'none'},
        other_links_a: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour },
        other_links_span: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
         other_links_span_hover: { 'border': '1px solid ' + this.card2textcolour, 'background-color': this.card2bgcolour, 'color': this.card2textcolour},
        profile_section_bg: { 'background-color': this.card2textcolour },
        share_profile_button: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour },
        share_profile_btn_div: { 'background-color': '#fff' },
        profile_h1_h4_p: { 'color': this.card1textcolour },
        social_contact_links: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        social_contact_a: { 'background-color': 'transparent', 'color': this.card1textcolour },
        social_contact_span: { 'color': this.card1textcolour },
        contact_visit_btn : {'background-color': this.card1textcolour, 'color': this.card1bgcolour , 'border' : '1px solid ' + this.card1textcolour  },
        contact_btn_hover : { 'background-color': this.card1bgcolour, 'color': this.card1textcolour , 'border' : '1px solid ' + this.card1textcolour}

      },

      // --------- started layout 5 sub-templates ---------------
      style7: {
        temp_div_class: 't7',
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': 'transparent' },
        share_profile_button: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour, 'border': '1px solid ' + this.card2textcolour },
        share_profile_button_hover: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour, 'border': '1px solid ' + this.card2textcolour },
        share_profile_button_div: { 'background-color': this.card2bgcolour, 'border-bottom': '1px solid ' + this.card2textcolour },
        social_contact: { 'background-color': 'transparent' },
        social_contact_a: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },

      },
      style8: {
        temp_div_class: 't8',
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': this.card2bgcolour },
        social_contact: { 'background-color': this.card2bgcolour },
        social_contact_links: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour, 'border': '1px solid ' + this.card2textcolour },
        social_contact_a: { 'background-color': this.card1textcolour, 'color': this.card1bgcolour },
        
      },

      style9: {
        temp_div_class: 't9',
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': this.card2bgcolour },
        social_contact: { 'background-color': this.card2bgcolour },
        social_contact_links: { 'background-color': 'color-mix(in srgb, ' + this.card2bgcolour + ' 45%, white)', 'color': this.card2textcolour }
      },
      style18: {
        temp_div_class: 't18',
        temp_div_style: { 'background-color': this.card2bgcolour },
        card_heading_bg: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour },
        profile_section_bg: { 'background-color': this.card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': this.card2bgcolour },
        profile_h1_h4_p: { 'color': this.card2textcolour },
        social_contact: { 'background-color': this.card2bgcolour },
        social_contact_a: { 'color': this.card1bgcolour },
        social_contact_links: { 'background-color': this.card1textcolour, 'color': this.card1bgcolour },


      },
      style19: {
        temp_div_class: 't19',
        profile_section_bg: { 'background-color': this.card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': this.card2bgcolour },
        temp_div_style: { 'background-color': this.card2bgcolour },
        card_heading_bg: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour },
        gallary_div: { 'background-color': '#ccc' },
        social_contact: { 'background-color': this.card2bgcolour },
        social_contact_a: { 'color': this.card1bgcolour },
        social_contact_links: { 'background-color': 'color-mix(in srgb, ' + this.card2bgcolour + ' 45%, white)', 'color': this.card1bgcolour }
      },

      style20: {
        temp_div_class: 't20',
        temp_div_style: { 'background-color': this.card2bgcolour },
        profile_section_bg: { 'background-color': this.card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': this.card2bgcolour },
        profile_h1_h4_p: { 'color': this.card2textcolour },
        share_profile_button_div: { 'background-color': 'color-mix(in srgb, ' + this.card1bgcolour + ' 88%, black)', 'border-bottom': '1px solid ' + this.card1textcolour },
        social_contact: { 'background-color': this.card2bgcolour },
        social_contact_links: { 'background-color': 'color-mix(in srgb, ' + this.card1bgcolour + ' 88%, black)', 'color': this.card1textcolour },
        social_contact_a: { 'background-color': 'color-mix(in srgb, ' + this.card1bgcolour + ' 58%, black)', 'color': this.card1textcolour },
      },

      style21: {
        temp_div_class: 't21',
        temp_div_style: { 'background': 'linear-gradient(45deg, ' + this.card1bgcolour + ', ' + this.card2bgcolour + ')' },
        social_contact: { 'background-color': 'transparent' },
        social_contact_links: { 'background-color': 'color-mix(in srgb, ' + this.card2bgcolour + ' 78%, black)', 'color': this.card2textcolour },
        social_contact_a: { 'background-color': 'color-mix(in srgb, ' + this.card1bgcolour + ' 73%,  white)', 'color': this.card1textcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': 'transparent' },
        share_profile_button_div: { 'background-color': this.card1bgcolour, 'border-bottom': '1px solid ' + this.card1textcolour },
        share_profile_button: { 'background-color': 'color-mix(in srgb, ' + this.card1bgcolour + ' 73%,  white)', 'color': this.card1textcolour },
        qr_code_card_data: { 'background-color': 'transparent' },
        google_review: { 'background-color': 'transparent' },
        about_company_data: { 'background-color': 'transparent' },
        otherlinks_btns_div: { 'background-color': 'transparent' },
        products_outer_div: { 'background-color': 'transparent' },
        services_outer_div: { 'background-color': 'transparent' },
        payment_data_div: { 'background-color': 'transparent' },
        about_us_card_divs: { 'background-color': 'transparent' },
        videos_outer_div: { 'background-color': 'transparent' },
        latest_update_card_divs: { 'background-color': 'transparent' },
        otherbusiness_card_divs: { 'background-color': 'transparent' },
        contact_us: { 'background-color': 'transparent' },
        contact_visit_btn: { 'background-color': '#000', 'color': '#fff' , 'border': '1px solid #000'}
      },

      style23: {
        temp_div_class: 't23',
        temp_div_style: { 'background-color': this.card2bgcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': this.card2bgcolour },
        social_contact: { 'background-color': this.card2bgcolour },
        social_contact_links: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        social_contact_a: { 'color': this.card1textcolour },
      },
      style25: {
        temp_div_class: 't25',
        temp_div_style: { 'background-color': this.card2bgcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': this.card2bgcolour },
        share_profile_button: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour , 'border': '1px solid ' + this.card2bgcolour},
         share_profile_button_hover: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour, 'border': '1px solid ' + this.card2bgcolour },
        social_contact: { 'background-color': this.card2bgcolour },
        social_contact_links: { 'background-color': this.card1textcolour, 'color': this.card1bgcolour },
        social_contact_a: { 'color': this.card1bgcolour },
        card_heading_bg: { 'background-color': 'transparent', 'color': this.card1textcolour },
      },
      style26: {
        temp_div_class: 't26',
        temp_div_style: { 'background-color': this.card2bgcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': this.card2bgcolour },
        share_profile_button: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour , 'border': '1px solid ' + this.card2bgcolour },
          share_profile_button_hover: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour, 'border': '1px solid ' + this.card2bgcolour },
        social_contact: { 'background-color': this.card2bgcolour },
        social_contact_links: { 'background-color': this.card1textcolour, 'color': this.card1bgcolour },
        social_contact_a: { 'color': this.card1bgcolour },
        card_heading_bg: { 'background-color': 'transparent', 'color': this.card1textcolour },
      },
      style27: {
        temp_div_class: 't27',
        temp_div_style: { 'background-color': this.card2bgcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': this.card2bgcolour },
        share_profile_button_div: { 'background-color': 'color-mix(in srgb, ' + this.card2bgcolour + ' 72%, white)', 'border-bottom': '1px solid ' + this.card2textcolour },
        share_profile_button: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour },
           share_profile_button_hover: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        social_contact: { 'background-color': this.card2bgcolour },
        social_contact_links: { 'background-color': 'transparent ', 'color': this.card2textcolour, 'border': '1px solid ' + this.card2textcolour },
        social_contact_a: { 'color': this.card2textcolour },
      },

      style28:
      {
        temp_div_class: 't28',
        temp_div_style: { 'background-color': this.card2bgcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': this.card2bgcolour },
        share_profile_button_div: { 'background-color': 'white' },
        share_profile_button: { 'background-color': '#363636', 'color': 'white' },
           share_profile_button_hover: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        social_contact: { 'background-color': this.card2bgcolour },
        social_contact_links: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        social_contact_a: { 'color': this.card1textcolour },
        card_heading_bg: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
      },

      style29:
      {
        temp_div_class: 't29',
        temp_div_style: { 'background-color': this.card2bgcolour },
        card_heading_bg: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        profile_section_bg: { 'background-color': 'white' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': 'transparent' },
        share_profile_button_div: { 'background-color': this.card2bgcolour, 'border-bottom': '1px solid ' + this.card2textcolour },
        share_profile_button: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour },
           share_profile_button_hover: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        social_contact: { 'background-color': 'transparent' },
        social_contact_links: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour },
        social_contact_a: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
      },

      style31:
      {
        temp_div_class: 't31',
        card_heading_bg: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour },
        temp_div_style: { 'background': 'linear-gradient(163deg, ' + this.card2bgcolour + ' 10%, rgba(255, 255, 255, 1) 52%, ' + this.card1bgcolour + ' 90%)' },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': 'transparent' },
        share_profile_button_div: { 'background-color': 'white' },
          share_profile_button_hover: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour, 'border': '1px solid ' + this.card2bgcolour },
        social_contact: { 'background-color': 'transparent' },
        social_contact_links: { 'background-color': 'white ', 'color': this.card1textcolour },
        social_contact_a: { 'color': this.card1textcolour },
        qr_code_card_data: { 'background-color': 'transparent' },
        google_review: { 'background-color': 'transparent' },
        about_company_data: { 'background-color': 'transparent', 'color': this.card1textcolour },
        otherlinks_btns_div: { 'background-color': 'transparent' },
        products_outer_div: { 'background-color': 'transparent' },
        services_outer_div: { 'background-color': 'transparent' },
        payment_data_div: { 'background-color': 'transparent', 'color': this.card1textcolour },
        about_us_card_divs: { 'background-color': 'transparent' },
        videos_outer_div: { 'background-color': 'transparent' },
        latest_update_card_divs: { 'background-color': 'transparent' },
        otherbusiness_card_divs: { 'background-color': 'transparent' },
        contact_us: { 'background-color': 'transparent' },
        share_profile_button_1: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour , 'border': '1px solid ' + this.card2bgcolour },
        share_profile_button_2: { 'background-color': this.card1bgcolour, 'color': this.card2textcolour ,'border': '1px solid ' + this.card1bgcolour },
        social_links_a: { 'border': '2px solid ' + this.card1textcolour },
        other_business_h2: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour ,  'border': '2px solid ' + this.card2bgcolour  },
        other_business_visit_btn: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour ,  'border': '2px solid ' + this.card2bgcolour },
       link_btn_latest_other_business_hover : {'background-color': this.card2textcolour, 'color': this.card2bgcolour , 'border': '2px solid ' + this.card2bgcolour},
        other_links_icon: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour },
        other_links_span: { 'color': '#555' },
        other_links_icon_hover: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour , 'border-right': '1px solid ' + this.card2textcolour},
        other_links_span_hover: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour },
        about_company_sub_heading: { 'color': this.card1textcolour },
        about_us_p: { 'color': this.card1textcolour },
          contact_visit_btn: { 'background-color': '#000', 'color': '#fff' , 'border': '1px solid #000'},
           contact_btn_hover: { 'background-color': '#fff', 'color': '#000' , 'border': '1px solid #000'}

      },

      style32:
      {
        temp_div_class: 't32',
        profile_section_bg: { 'background-color': this.card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )', 'background-color': this.card2bgcolour },
        share_profile_button_2: { 'background-color': 'color-mix(in srgb,  ' + this.card1bgcolour + ', white 30%) ', 'color': this.card1textcolour },
          share_profile_button_1: { 'background-color': '#f47117', 'color': '#fff' },
        social_contact: { 'background-color': this.card2bgcolour },
        social_contact_links: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        social_contact_a: { 'color': this.card1textcolour },
        social_contact_span: { 'color': this.card1textcolour },
        link_btn_latest_other_business_hover : {'background-color': this.card1textcolour, 'color': this.card1bgcolour , 'border': '2px solid ' + this.card1bgcolour},
        popup_card_header: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
           share_profile_button_hover: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour },
        popup_enquiry_btns: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },


      },

      // ------- layout 6 ------------

      style11:
      {
        temp_div_class: 't11',
        temp_div_style: { 'background-color': '#edeef0' },
        temp_div_style_image: { 'background-image': ' url( ' + this.globalObject.getImageSrc(this.profile_back_image) + ' )' },
        social_contact_links: { 'border-bottom': '1px  dashed ' + this.card1bgcolour },
        social_contact_a: { 'color': '#ebc960 ' },
        social_contact_span: { 'color': this.card1bgcolour },
        share_profile_button_div: { 'background-color': 'transparent' },
        share_profile_button_1: { 'background-color': '#e8d52e', 'color': 'white', 'border': '1px  solid  white' },
        share_profile_button_2: { 'background-color': '#e8d52e', 'color': 'white' ,  'border': '1px  solid  white' },
        
        contact_visit_btn: { 'background-color': '#e8d52e', 'color': 'white', 'border': '1px  solid  #e8d52e'  },
        about_us_p: { 'color': this.card2bgcolour },
        about_company_sub_heading: { 'color': this.card2bgcolour },
        about_company_data: { 'color': this.card2bgcolour },
        payment_data_div: { 'color': this.card2bgcolour },

      },

      style12:
      {
        temp_div_class: 't12',
        share_profile_button_div: { 'background-color': 'transparent' },
        share_profile_button_2: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour , 'border': '1px  solid  ' + this.card1bgcolour},
        share_profile_button_1: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour , 'border': '1px  solid  ' + this.card2bgcolour},
        profile_h1_h4_p: { 'color': '#c8ff1f' },
        card_heading_bg: { 'color': this.card2textcolour },
        social_contact_links: { 'color': this.card2bgcolour },
        social_contact_span: { 'color': this.card2bgcolour },
        other_business_h2: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_business_visit_btn: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_links_a: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour, 'border': '1px  solid ' + this.card1bgcolour },
        other_links_icon: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_links_span: { 'background-color': this.card1textcolour , 'color': '#555'},
        contact_visit_btn: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour , 'border': '1px  solid ' + this.card1bgcolour},
        latest_update_quotes: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
       link_btn_latest_other_business_hover : { 'background-color': this.card2bgcolour, 'color': this.card2textcolour}
      },

      style13:
      {
        temp_div_class: 't13',
        share_profile_button_div: { 'background-color': 'transparent' },
        share_profile_button: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour ,  'border': '1px  solid  ' + this.card2textcolour},
        social_contact_links: { 'background-color': '#fff', 'color': '#000' },
        social_contact_span: { 'color': '#000' },
        social_contact_a: { 'color': this.card2textcolour },
        social_contact_i: { 'color': this.card1textcolour, 'background': 'linear-gradient(45deg, ' + this.card2bgcolour + ' ,  color-mix(in srgb,  ' + this.card2bgcolour + ', white 20%))' },
        profile_h1_p: { 'color': this.card2textcolour },
        profile_h4: { 'color': this.card1bgcolour },
        profile_photo_div: { 'border': '5px  solid ' + this.card1bgcolour },
        other_business_h2: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_business_visit_btn: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        contact_visit_btn: { 'background-color': this.card2textcolour, 'color': this.card2bgcolour , 'border': '1px  solid ' + this.card2textcolour },
        card_heading_bg: { 'color': this.card2textcolour },
        other_links_icon: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_links_span: { 'background-color': this.card1textcolour , 'color': '#555' },
        about_company_data: { 'color': 'color-mix(in srgb,  ' + this.card1bgcolour + ', white 20%) ' },
        payment_data_div: { 'color': 'color-mix(in srgb,  ' + this.card1bgcolour + ', white 20%) ' },
        about_us_p: { 'color': 'color-mix(in srgb,  ' + this.card1bgcolour + ', white 20%) ' },
        latest_update_quotes: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
          link_btn_latest_other_business_hover : { 'background-color': this.card2bgcolour, 'color': this.card2textcolour},
          contact_btn_hover : {'background-color': this.card1bgcolour, 'color': this.card1textcolour , 'border': '1px  solid ' + this.card1bgcolour }

      },
      style14:
      {
        temp_div_class: 't14',
        card_heading_bg: { 'color': this.card2textcolour },
        profile_h1_h4_p: { 'color': this.card2bgcolour },
        social_contact_links: { 'border-bottom': '1px  dashed ' + this.card1bgcolour },
        social_contact_span: { 'color': this.card1bgcolour },
        social_links_a: { 'background-color': this.card2bgcolour },
        other_links_icon: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_links_span: { 'background-color': this.card1textcolour , 'color': '#555' },
        other_business_h2: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_business_visit_btn: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        latest_update_quotes: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
           link_btn_latest_other_business_hover : { 'background-color': this.card2bgcolour, 'color': this.card2textcolour}

      },
      style15:
      {
        temp_div_class: 't15',
        profile_h1_h4_p: { 'color': this.card1bgcolour },
        share_profile_button: { 'background-color': 'color-mix(in srgb,  ' + this.card2bgcolour + ', white 25%) ', 'color': this.card2textcolour },
        card_heading_bg: { 'color': this.card2textcolour },
        social_contact_links: { 'border-bottom': '1px  dashed ' + this.card1bgcolour },
        social_contact_span: { 'color': this.card1bgcolour },
        social_contact_a: { 'color': this.card1bgcolour },
        other_links_icon: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_links_span: { 'background-color': this.card1textcolour , 'color': '#555' },
        other_business_h2: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_business_visit_btn: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        contact_visit_btn: { 'background-color': 'color-mix(in srgb,  ' + this.card2bgcolour + ', white 25%) ', 'color': this.card2textcolour },
        latest_update_quotes: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
            link_btn_latest_other_business_hover : { 'background-color': this.card2bgcolour, 'color': this.card2textcolour},
            share_profile_button_hover: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour , 'border': 'none' },
             contact_btn_hover : {'background-color': this.card2textcolour, 'color': this.card2bgcolour , 'border': 'none' }
      },

      style16:
      {
        temp_div_class: 't16',
        profile_h1_h4_p: { 'color': 'color-mix(in srgb,  ' + this.card2bgcolour + ', #ff9800 25%)' },
        share_profile_button_div: { 'background-color': 'transparent' },
        share_profile_button_2: { 'background-color': '#fdd25f', 'color': '#ffffff' },
        share_profile_button_1: { 'background-color': 'color-mix(in srgb,  ' + this.card2bgcolour + ', #ff9800 25%)', 'color': this.card2textcolour },
        card_heading_bg: { 'color': this.card2textcolour },
        social_contact_links: { 'border-bottom': '1px  dashed ' + this.card1bgcolour },
        social_contact_span: { 'color': this.card1bgcolour },
        social_contact_a: { 'color': this.card1bgcolour },
        other_links_icon: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_links_span: { 'background-color': this.card1textcolour , 'color': '#555' },
        other_business_h2: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_business_visit_btn: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        contact_visit_btn: { 'background-color': '#fdd25f', 'color': '#ffffff' },
        latest_update_quotes: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
           share_profile_button_hover: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour , 'border': 'none' },
    link_btn_latest_other_business_hover : { 'background-color': this.card2bgcolour, 'color': this.card2textcolour},
     contact_btn_hover : {'background-color': this.card2textcolour, 'color': this.card2bgcolour , 'border': 'none' }
      },


      style17:
      {
        temp_div_class: 't17',
        card_heading_bg: { 'color': this.card1textcolour },
        about_company_sub_heading: { 'color': this.card1textcolour },
        profile_h1_h4_p: { 'color': this.card2textcolour },
        share_profile_button_div: { 'background-color': 'transparent' },
        share_profile_button_2: { 'background-color': '#ccd144', 'color': '#ffffff' },
        share_profile_button_1: { 'background-color': 'color-mix(in srgb,  ' + this.card2bgcolour + ', #ffffff 25%)', 'color': this.card1textcolour },
        social_contact_links: { 'border-bottom': '1px  dashed color-mix(in srgb,  ' + this.card2textcolour + ', #000 20%)' },
        social_contact_span: { 'color': 'color-mix(in srgb,  ' + this.card2textcolour + ', #000 20%)' },
        social_contact_a: { 'color': 'color-mix(in srgb,  ' + this.card2textcolour + ', #000 20%)' },
        other_links_icon: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_links_span: { 'background-color': this.card1textcolour , 'color': '#555' },
        other_business_h2: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        other_business_visit_btn: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
        contact_visit_btn: { 'background-color': '#ccd144', 'color': '#ffffff' },
        latest_update_quotes: { 'background-color': this.card1bgcolour, 'color': this.card1textcolour },
           share_profile_button_hover: { 'background-color': this.card2bgcolour, 'color': this.card2textcolour , 'border': 'none' },
               link_btn_latest_other_business_hover : { 'background-color': this.card2bgcolour, 'color': this.card2textcolour},
                contact_btn_hover : {'background-color': this.card2textcolour, 'color': this.card2bgcolour , 'border': 'none' }
      }


    }
  }


  // closeProductModal() {
  //   this.showProductModal = false;
  // }

  // closeShareModal() {
  //   this.showShareModal = false;
  // }

  closeProductModal1() {
    this.showServiceModal = false;
  }

  closelatestModal() {
    this.showLatestModal = false;
  }

  // ---------------- new templates popups product , share , service , latest update --------------------

  closeShareModal2() {
    this.showShareModal = false;
  }

  closeProductModal2() {
    this.showProductModal = false;
  }

  closeServiceModal2() {
    this.showServiceModal = false;
  }



closeProductModal() {
  this.showProductModal = false;
}

closeShareModal() {
  this.showShareModal = false;
}

closeServiceModal() {
  this.showServiceModal = false;
}

closeLatestModal() {
  this.showLatestModal = false;
}

// closeHelpModal() {
//   this.showHelpModal = false;
// }


// New-template modals

closeShareModalNew() {
  this.showShareModalNew = false;
}

closeProductModalNew() {
  this.showProductModalNew = false;
}

closeServiceModalNew() {
  this.showServiceModalNew = false;
}

closeLatestModalNew() {
  this.showLatestModalNew = false;
}

  handleModalState(state: 'open' | 'close') {
    if (state === 'open' && isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        this.latestUpdateComp?.pauseSwiper();
      });
    }
  }

  closelatestModal2() {
    this.showLatestModalNew  = false;

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.latestUpdateComp?.resumeSwiper();
      }, 100);
    }
  }

  // -----------------------------------------------

  addGoogleReview(userCode?: string) {

    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (!userCode) {
      return;
    }

    // Open immediately from user gesture
    const popup = window.open('', '_blank');

    // this.loader = true;

    const reqData = {
      wsdp: {
        user_code: userCode
      }
    };

    this.loginService.postData(reqData, 'getGoogleReviewData')
      .subscribe({
        next: (response:any) => {

          this.loader = false;

          if (response?.link) {

            if (popup) {
              popup.location.href = response.link;
            } else {
              // Fallback
              window.location.href = response.link;
            }

          } else {

            if (popup) {
              popup.close();
            }

            console.warn('Review link not found');
          }
        },

        error: (err:any) => {

          this.loader = false;

          if (popup) {
            popup.close();
          }

          console.error(err);
        }
      });
  }

  private getCurrentTimestamp(): string {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${pad(now.getFullYear())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }




  openWhatsApp(event: Event) {
    if (isPlatformServer(this.platformId)) return;
    event.preventDefault(); // stop normal link behavior
    // console.log(this.temp_details_data);
    let url_links = this.temp_details_data.pcard_url_template.data[0].template_url;
    let username = this.temp_details_data?.profile_images?.data[0]?.first_name + " " + this.temp_details_data?.profile_images?.data[0]?.last_name;
    let designation = this.temp_details_data?.profile_images?.data[0]?.designation + " " + this.temp_details_data?.profile_images?.data[0]?.company_name;


    const url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(url_links);
    window.open(url, "_blank");   // open in new tab
  }



  openSMS(event: Event) {
    if (isPlatformServer(this.platformId)) return;
    event.preventDefault();
    let url_links = this.temp_details_data.pcard_url_template.data[0].template_url;
    const smsURL = "sms:?body=" + encodeURIComponent(url_links);
    window.location.href = smsURL; // works on Android + iPhone
  }


  openTelegram(event: Event) {
    if (isPlatformServer(this.platformId)) return;
    event.preventDefault();
    let url_links = this.temp_details_data.pcard_url_template.data[0].template_url;
    const webUrl = "https://t.me/share/url?text=" + encodeURIComponent(url_links);
    const appUrl = "tg://msg?text=" + encodeURIComponent(url_links);
    // Detect mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      // Try to open Telegram app
      window.location.href = appUrl;
      // Fallback to web after short delay
      setTimeout(() => {
        window.open(webUrl, "_blank");
      }, 1000);
    } else {
      window.open(webUrl, "_blank");
    }
  }

  openLinkedIn(event: Event) {
    if (isPlatformServer(this.platformId)) return;
    event.preventDefault();
    let url_links = this.temp_details_data.pcard_url_template.data[0].template_url;
    const webUrl = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url_links);
    const appUrl = "linkedin://shareArticle?mini=true&url=" + encodeURIComponent(url_links);
    // Detect mobile
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      // Try to open LinkedIn app
      window.location.href = appUrl;
      // Fallback to web after short delay
      setTimeout(() => {
        window.open(webUrl, "_blank");
      }, 1000);
    } else {
      window.open(webUrl, "_blank");
    }
  }

  updateCounter(param: any) {
    this.loginService.getCallTemplate(param, 'updateCount').pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: any) => { console.log(res) }
      );  // dummy call to trigger counter update
  }



  //   setMetaTags(){
  //    this.seo.setTitle('Dynamic Template Title');
  //   this.seo.setMeta({
  //     description: 'This is a dynamic description for the template page.',
  //     ogTitle: 'Dynamic OG Title',
  //     ogDescription: 'Dynamic OG Description',
  //     ogImage: 'https://example.com/image.jpg',
  //     robots: 'index,follow'
  //   });
  //   this.seo.setCanonical(this.slug);
  //   // Optionally, for structured data:
  //   // this.seo.setJsonLd({ ... });
  // }

  // New Get Method functions for Template call and Template Styles
  async callTemp(completeSsrTask?: () => void) {
    if (this.templateLoaded) {
      console.log('Template already loaded, skipping duplicate call');
      completeSsrTask?.();
      return;
    }
    this.templateLoaded = true;
    this.componentsOrder = [];

    let id: any = await this.getIdFromSSRorBrowser();
    // console.log("Extracted Template ID:", id);
    if (!id) {
      completeSsrTask?.();
      return

    }
    let templateid: any;

    // handle case: id contains $$
    if (id && id.includes("$$")) {
      this.editCardFlag = true;
      if (id.split("$$")[1] == 'preview') {
        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem("preview", 'true');
        }
      } else {
        templateid = id.split("$$")[1];
      }
      id = id.split("$$")[0];
    }

    // your logic: static template_id override
    let wsdp: any = {
      // template_id: id || "bhagyashree.guhe-8297166"
      template_id: id
    };
    // console.log("Initial GET Params => ", wsdp);
    if (templateid) {
      wsdp.selected_templ_id = templateid;
    }
    if (this.ischeck) {
      wsdp.visit_log = true;
    }


    // console.log("Final GET Params => ", wsdp);
    // GET CALL (✔ SSR SAFE)
    this.loginService.getCallTemplate(wsdp, "callTemplate")
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: any) => {

          console.log("GET callTemplate response:", res);
          // if (!res?.responseStatus?.includes('success')) return;
          if (!res?.responseStatus?.includes('success')) {
            this.router.navigate(['/404']);
            return;
          }

          let data = JSON.parse(JSON.stringify(res.responseData[0]));

          let cur_symbol = res.responseData[0].cur_symbol;
          let cur_symbol_sign = '';
          if (cur_symbol === 'INR') {
            cur_symbol_sign = '₹';
          } else if (cur_symbol === 'usd' || cur_symbol === 'USD') {
            cur_symbol_sign = '$';
          } else if (cur_symbol === 'CAD' || cur_symbol === 'cad') {
            cur_symbol_sign = 'C$';
          } else {
            cur_symbol_sign = '₹'; // default to currency code if symbol not recognized
          }
          this.globalObject.setDataLocally("cur_symbol_sign", cur_symbol_sign);
          console.log(data  +  "data for test");
          delete data['cur_symbol'];
          let wslpvalue: any = {};
          wslpvalue["user_code"] = res.responseData[0].user_code;
          wslpvalue["user_name"] = res.responseData[0].user_name;
          this.globalObject.setDataLocally("tempDetails", JSON.stringify(wslpvalue))
          console.log(wslpvalue+ "wclpvalues");

          if (!this.editCardFlag) {
            this.updateCounter({ user_code: res.responseData[0].user_code });
          }

          // Store user_code for Google Review
          if (data.user_code) {
            this.userCode = data.user_code;
            console.log("Stored user_code:", this.userCode);
          }

          // map template type
          const t = data.template_type;
          // console.log("template type:------------------------------", t);
          // this.template_type =
          //   t === 'Layout-1' ? 'layout1' :
          //     t === 'Layout-2' ? 'layout2' :
          //       t === 'Layout-3' ? 'layout3' :
          //         t === 'Layout-4' ? 'layout4' :
          //           t === 'Layout-5' ? 'layout5' :
          //             t === 'Layout-6' ? 'layout6' :
          //               t === 'Layout-7' ? 'layout7' : 'layout1';

          this.template_type =
            t === 'Layout-1' ? 'layout4' :
              t === 'Layout-2' ? 'layout5' :
                t === 'Layout-3' ? 'layout6' :
                  t === 'Layout-4' ? 'layout1' :
                    t === 'Layout-5' ? 'layout2' :
                      t === 'Layout-6' ? 'layout3' :
                        t === 'Layout-7' ? 'layout7' :
                          t === 'Layout-8' ? 'layout8' :
                            t === 'Layout-9' ? 'layout9' : 'layout4';

          this.style_type = data.template_id;

          // split component order
          if (data.template_seq) {
            this.componentsOrder = data.template_seq.split(",");
          }

          // finally call second API


          this.getTemplateDetail(data, completeSsrTask);
          // console.log("Template Type:", data);
        },
        (err:any) => {
          console.error("Error calling callTemplate:", err);
          completeSsrTask?.();
          this.router.navigate(['/404']);
        }


      );
  }



  decodeHtml(html: string): SafeHtml {
    if (!html) {
      return this.sanitizer.bypassSecurityTrustHtml('');
    }

    // Avoid direct DOM access during Angular SSR.
    if (isPlatformBrowser(this.platformId)) {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return this.sanitizer.bypassSecurityTrustHtml(txt.value);
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


  getTemplateDetail(data: any, completeSsrTask?: () => void) {
    this.loader = true;

    let params = data;
    // console.log("Params for getTemplateStyledata:", params);
    // GET CALL (✔ SSR SAFE)
    this.loginService.getTemplateData(params, "getTemplateStyledata")
      .pipe(
        takeUntil(this.destroy$),
        // This is called after the first request completes, so it must remain
        // pending independently for SSR to include its response in the HTML.
        finalize(() => completeSsrTask?.())
      )
      .subscribe(
        (res: any) => {

          //  console.log("GET getTemplateStyledata response:", res);
          this.loader = false;

          if (res?.responseStatus?.includes("success")) {
            this.temp_details_data = res.responseData;
            this.globalObject.googleReviewLink = res.responseData.google_review_link?.data?.[0].google_review_link;
            // alert(this.globalObject.googleReviewLink);
            const profile = res.responseData.profile_images?.data?.[0];
            const seo_profile = res.responseData.seo_profile_images?.data?.[0];
            const templateUrl = res.responseData.pcard_url_template?.data?.[0]?.template_url;
            let seoImage = res.responseData.seo?.data?.[0]?.seo_image;
            let seoKeyword = res.responseData.seo?.data?.[0]?.keyword;
            let seoTitle;
            // if(res.responseData.seo.title != "SEO"){
 seoTitle = res.responseData.seo?.title;
            // }
            
            let seoDescription = res.responseData.seo?.data?.[0]?.description;

            if (!seoImage) {
              // seoImage = res.responseData.seo_profile_images?.data?.[0].image ? res.responseData.seo_profile_images?.data?.[0].image : profile.image;
              if (seo_profile && seo_profile.image) {
                seoImage = seo_profile.image;
              } else if (profile?.image) {
                seoImage = profile.image;
              } else {
                seoImage = 'assets/header/PROFILE.png';
              }
            }
            if (profile && templateUrl) {
              this.globalObject.setMetaTags(profile, templateUrl, seoImage, seoKeyword, seoDescription, seo_profile ,seoTitle);
            }
            // this.temp_details_data = res.responseData;
            console.log("Template Details Data:", this.temp_details_data);

            const style = this.temp_details_data?.template_layout_style?.data?.[0];
            const userStyle = this.temp_details_data?.user_template_layout_style?.data?.[0];




            if (style) {
              this.bodybgcolour = style.back_body_color;
              // this.card1textcolour = style.card_text_color1;
              // this.card1bgcolour = style.card_background_color1;
              if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9' ){
                this.card1textcolour = userStyle.card_text_color1 ? userStyle.card_text_color1 : style.card_text_color1;
    this.card1bgcolour =  userStyle.card_background_color1 ? userStyle.card_background_color1 : style.card_background_color1;
                
              }else{
                this.card1textcolour = style.card_text_color1;
                this.card1bgcolour = style.card_background_color1;
              }
              this.card2textcolour = style.card_text_color2;
              this.card2bgcolour = style.card_back_color2;
              this.bodytextcolour = style.body_text_color;
              this.templatebgimg = this.globalObject.getImageSrc(style.card_background_image1);
              this.profile_back_image = style.profile_back_image;
              this.card_style = style.card_style;
            }

            this.setProperty();

            // Convert video URLs
            const videoGallery = this.temp_details_data.video_gallery?.data;
            if (Array.isArray(videoGallery)) {
              this.temp_details_data.video_gallery.data = videoGallery.map((video: any) => ({
                ...video,
                safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
                  this.convertToEmbedUrl(video.video_url)
                )
              }));
            }
            this.cdr.markForCheck();
          }
        },
        (err: any) => {
          console.log("Error in getTemplateStyledata GET:", err);
          this.router.navigate(['/404']);
        }
      );
  }



  // getIdFromSSRorBrowser(): string | null {
  //   if (isPlatformServer(this.platformId) && this.request) {
  //     const path = String(this.request.url).split('?')[0];
  //     const value = path.split('/').filter(Boolean).pop() || null;
  //     return value;
  //   } else if (this.input_id) {
  //     console.log(this.input_id)
  //     return this.input_id;
  //   }

  //   // browser - get slug and suffix parameters
  //   const slug = this.route.snapshot.paramMap.get('slug');
  //   const suffix = this.route.snapshot.paramMap.get('suffix');
  //   console.log(suffix)
  //   if (slug && suffix) {
  //     console.log("slug & suffix------------------------------------------------------------------------" + slug + suffix)
  //     return slug + '$$' + suffix;
  //   }
  //   console.log("slug in last+++++++++++++++++++++++++++++++++++" + slug)
  //   return slug;
  // }
getIdFromSSRorBrowser(): string | null {
  if (isPlatformServer(this.platformId) && this.request) {

    const requestUrl = new URL(
      this.request.url,
      `http://${this.request.headers.host}`
    );

    const segments = requestUrl.pathname
      .split('/')
      .filter(Boolean);

    const slug = segments[segments.length - 1] || null;

    console.log('SSR REQUEST:', this.request.url);
    console.log('SSR PATHNAME:', requestUrl.pathname);
    console.log('SSR SLUG:', slug);

    return slug;
  }

  if (this.input_id) {
    console.log('INPUT ID:', this.input_id);
    return this.input_id;
  }

  const slug = this.route.snapshot.paramMap.get('slug');
  const suffix = this.route.snapshot.paramMap.get('suffix');

  console.log('Browser slug:', slug);
  console.log('Browser suffix:', suffix);

  if (slug && suffix) {
    return `${slug}$$${suffix}`;
  }

  return slug;
}

  getWhatsappLink_product(number: string, product_name_name: string): string {
    if (!number) {
      return '';
    }
    let cleanedNumber = number.replace(/\D/g, '');

    // If 10 digit number, assume India
    if (cleanedNumber.length === 10) {
      cleanedNumber = '91' + cleanedNumber;
    }

    const msg = `Hi, I am interested in your ${this.temp_details_data?.product_list?.title}: ${product_name_name}. Please provide more details.`;

    return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(msg)}`;
  }


  getWhatsappLink_services(number: string, service_name: string): string {
    if (!number) {
      return '';
    }
    let cleanedNumber = number.replace(/\D/g, '');

    // If 10 digit number, assume India
    if (cleanedNumber.length === 10) {
      cleanedNumber = '91' + cleanedNumber;
    }




    const msg = `Hi, I am interested in your  ${this.temp_details_data?.services?.title}: ${service_name}. Please provide more details.`;
    return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(msg)}`;
  }

  handleRefresh() {
    if (!isPlatformBrowser(this.platformId)) return;
    window.location.reload();
  }

// --------------------- after scrolling  (reduce the height of navbar) -------


// isScrolled = false;

// onScroll(event: Event) {
//   const el = event.target as HTMLElement;

//   this.isScrolled = el.scrollTop > 50;
// }


isScrolled = false;

onScroll(event: Event) {
  const el = event.target as HTMLElement;
  const scrollTop = el.scrollTop;

  if (scrollTop <= 1) {
    this.isScrolled = false;
  } else if (scrollTop > 50) {
    this.isScrolled = true;
  }
}



// onScroll(event: Event) {
//   if (!isPlatformBrowser(this.platformId)) return;

//   const target = event.target;
//   const scrollTop = target instanceof HTMLElement
//     ? target.scrollTop
//     : window.scrollY || document.documentElement.scrollTop;

//   this.isScrolled = scrollTop > 50;
// }

// @HostListener('window:scroll', ['$event'])
// onWindowScroll(event: Event) {
//   this.onScroll(event);
// }



onModalClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    this.closeActiveModal();
  }
}

private closeActiveModal() {
  this.showProductModal = false;
  this.showShareModal = false;
  this.showServiceModal = false;
  this.showLatestModal = false;
  this.showHelpModal = false;
}

closeHelpModal() {
  this.showHelpModal = false;
}
}







