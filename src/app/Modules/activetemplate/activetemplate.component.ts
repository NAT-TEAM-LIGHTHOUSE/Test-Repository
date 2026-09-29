import { CommonModule, isPlatformBrowser } from '@angular/common';
import { afterNextRender, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { WebsiteHeaderComponent } from '../website/website components/website-header/website-header.component';
import { Globalobjects } from '../../services/globalobjects';
import { Login } from '../../services/login';
// import { WebsiteHeaderComponent } from '../website-header/website-header.component';




@Component({
  selector: 'app-activetemplate',
  templateUrl: './activetemplate.component.html',
  styleUrls: ['./activetemplate.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, WebsiteHeaderComponent],
  // imports:[SocialContactComponent]
}) export class ActivetemplateComponent implements OnInit {
  @ViewChild('contentRef', { static: false }) content?: ElementRef<HTMLElement>;
  bodybgcolour: any;
  modal2: any = {};
  card1textcolour: any = '';
  card1bgcolour: any;
  card2textcolour: any;
  card2bgcolour: any = '';
  template_type: any = "layout3";
  shareUrl: string = "https://example.com/my-profile";
  active_template_data: any = [];
  from_row: any = 0; searchText:any;
  to_row: any;
  total_length: any;
  card_style: any;
  limit: any = 10;
  styleArr: any = {}
  operateSocialLink: any = "";
  selectedProduct: any = null;
  showErrors = false;
  selectedService: any = null;
  encodedWhatsAppMessage: string = '';
  style_type: any;
  imagePath: string | undefined;
  showLocation = false
  templateStyleData: any;
  temp_details_data: any;
  currentIndex = 0;
  componentsOrder: any = [];
  loader: boolean = false;
  templatebgimg: any;
  profile_back_image: any;
  socialLinksList: any = [];
  templateId: any;
  user_template_data: any = [];
  pcard_url: any;
app_url : any;


  isHover: boolean = false;
  hover = false;


  showShareModal = false;
  showWebShareModal = false;

  constructor(public route: ActivatedRoute, public globalObject: Globalobjects, public loginService: Login, private el: ElementRef, private sanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    // this.app_url = this.globalObject.getLocallData("routeurls");
    //this.callTemp();
    // this.active_template_data = [];
    // afterNextRender(() => this.getscrollData());
        this.active_template_data = [];
    this.getscrollData();
     
  }


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

// -------------------------------------------------------------------


  openShareModal(data?: any) {
    // alert(data?.profile_images[0]?.image?data.profile_images[0].first_name:'');
    // alert(data?.profile_images[0]?.image?data.profile_images[0].last_name:'');
    let first_name = data?.profile_images[0]?.first_name ? data.profile_images[0].first_name : '';
    let last_name = data?.profile_images[0]?.last_name ? data.profile_images[0].last_name : '';
    this.modal2.name = first_name + " " + last_name;
    this.modal2.url = data?.pcard_url_template[0]?.template_url;



    this.modal2.card_text_color2 = data?.template_layout_style[0]?.card_text_color2;
    this.modal2.card_back_color2 = data?.template_layout_style[0]?.card_back_color2;


    this.showShareModal = true;
  }
openShareModalweb(data?: any) {
    // alert(data?.profile_images[0]?.image?data.profile_images[0].first_name:'');
    // alert(data?.profile_images[0]?.image?data.profile_images[0].last_name:'');
    let first_name = data?.profile_images[0]?.first_name ? data.profile_images[0].first_name : '';
    let last_name = data?.profile_images[0]?.last_name ? data.profile_images[0].last_name : '';
    this.modal2.name = first_name + " " + last_name;
    this.modal2.url = data?.pcard_url_template[0]?.template_url;



    this.modal2.card_text_color2 = data?.template_layout_style[0]?.card_text_color2;
    this.modal2.card_back_color2 = data?.template_layout_style[0]?.card_back_color2;


    this.showWebShareModal = true;
  }




  closeShareModal() {
    this.showShareModal = false;
    this.showWebShareModal = false;
  }


  callTemp() {

    this.componentsOrder = [];
    let id: any
    let templateid: any;
    let template_string: any;
    id = this.route.snapshot.paramMap.get('id');
    if (id && id.includes('$$')) {
      templateid = id.split('$$')[1];
      id = id.split('$$')[0];
    }
    // this.templateId = id.split("-")[1];
    this.templateId = id;

    //console.log('Route ID:', this.templateId);


    let wsdp: any = {
      template_id: this.templateId
    };


    if (templateid) {
      wsdp.selected_templ_id = templateid;
    }

    let wslpData = this.globalObject.getLocallData("appDetails");
    let reqData: any = {
      wsdp: wsdp,
      wslp: wslpData ? JSON.parse(wslpData) : {}
    }
    //console.log("reqData : ", reqData);

    this.loginService.postData(reqData, "callTemplate").subscribe(
      (res) => {
        //console.log(res);
        if (res?.responseStatus?.includes('success')) {
          let template_id: any;
          let wslpvalue = wslpData ? JSON.parse(wslpData) : {};
          wslpvalue["user_code"] = res.responseData[0].user_code;
          wslpvalue["user_name"] = res.responseData[0].user_name;
          template_string = res.responseData[0].show_template_data;
          this.globalObject.setDataLocally("tempDetails", JSON.stringify(wslpvalue))
          if (res.responseData && res.responseData[0]) {
            if (res.responseData[0].template_type) {
              let type = res.responseData[0].template_type;
              // template_id=res.responseData[0].template_id;
              if (type == 'Layout-2') {
                this.template_type = 'layout2'
              } else if (type == 'Layout-1') {
                this.template_type = 'layout1'
              } else if (type == 'Layout-3') {
                this.template_type = 'layout3'
              } else if (type == 'Layout-4') {
                this.template_type = 'layout4'
              } else if (type == 'Layout-5') {
                this.template_type = 'layout5'
              } else if (type == 'Layout-6') {
                this.template_type = 'layout6'
              }
            }

            // this.style_type = res.responseData[0].template_type;
            this.style_type = res.responseData[0].template_id;

            // //console.log("template type : ",this.template_type)
            //  this.getLayout_style()
          }
          if (res.responseData[0].template_seq) {
            let template_seqArray: any = res.responseData[0].template_seq.split(",");
            for (let temp_seq of template_seqArray) {
              this.componentsOrder.push(temp_seq);
            }
          }
          // alert("template");
          this.getTemplateDetail(template_string, this.style_type);

       
        }
      },
     
    );
  }


  //   ///////////////////////////get all data///////////////
  getTemplateDetail(val?: any, template_id?: any) {
    this.loader = true;
    let wsdp: any = {};
    // wsdp.card_data=this.dataDetailString;
    wsdp.card_data = val;
    wsdp.template_id = template_id;
    let wslpData: any = this.globalObject.getLocallData("tempDetails");
    let reqData: any = {};
    reqData = {
      wsdp: wsdp,
      wslp: wslpData ? JSON.parse(wslpData) : {}
    };

    reqData.wsdp.serviceType = "update_card_setting";

    reqData.wsdp.operation_mode = "update";
    this.loginService.postData(reqData, "getTemplateStyledata").subscribe(
      (res:any) => {
        this.loader = false;
        if (res?.responseStatus?.includes('success')) {

          this.temp_details_data = res.responseData;


          this.bodybgcolour = this.temp_details_data?.template_layout_style?.data[0]?.back_body_color;
          if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
          this.card1textcolour = this.temp_details_data?.user_template_layout_style?.[0]?.card_text_color1 ? this.temp_details_data?.user_template_layout_style?.[0]?.card_text_color1 : this.temp_details_data?.template_layout_style?.data[0]?.card_text_color1;
          this.card1bgcolour = this.temp_details_data?.user_template_layout_style?.[0]?.card_background_color1 ? this.temp_details_data?.user_template_layout_style?.[0]?.card_background_color1 : this.temp_details_data?.template_layout_style?.data[0]?.card_background_color1;
          } else {
             this.card1textcolour = this.temp_details_data?.template_layout_style?.data[0]?.card_text_color1;
          this.card1bgcolour = this.temp_details_data?.template_layout_style?.data[0]?.card_background_color1;
          }
          this.card2textcolour = this.temp_details_data?.template_layout_style?.data[0]?.card_text_color2;
          this.card2bgcolour = this.temp_details_data?.template_layout_style?.data[0]?.card_back_color2;
          this.templatebgimg = "data:image/png;base64," + this.temp_details_data?.template_layout_style?.data[0]?.card_background_image1;
          this.profile_back_image = this.temp_details_data?.template_layout_style?.data[0]?.profile_back_image;

          this.card_style = this.temp_details_data?.template_layout_style?.data[0]?.card_style;


          this.setProperty();
          console.log(this.temp_details_data);
          this.temp_details_data.video_gallery.data =
            this.temp_details_data.video_gallery.data.map((video: any) => {
              const embedUrl = this.convertToEmbedUrl(video.video_url);
              return {
                ...video,
                safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl)
              };
            });
          if (this.temp_details_data.qr_code?.data.length > 0) {
            const message = this.temp_details_data.qr_code.data[0].qr_url;
            this.encodedWhatsAppMessage = encodeURIComponent(message);
          }


        } else {
        }
      },
    
    );
  }


  setProperty(data?: any) {


    let bodybgcolour = data?.template_layout_style[0].back_body_color;
    let card1textcolour = data?.template_layout_style[0].card_text_color1;
    let card1bgcolour = data?.template_layout_style[0].card_background_color1;
    let card2textcolour = data?.template_layout_style[0].card_text_color2;
    let card2bgcolour = data?.template_layout_style[0].card_back_color2;
    let templatebgimg = "data:image/png;base64," + data?.template_layout_style[0].card_background_image1;
    let profile_back_image = data?.template_layout_style[0].profile_back_image;
    

    //  if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    // let card1textcolour = data?.user_template_layout_style[0].card_text_color1 ? data?.user_template_layout_style[0].card_text_color1 : data?.template_layout_style[0].card_text_color1;
    // let card1bgcolour =  data?.user_template_layout_style[0].card_background_color1 ? data?.user_template_layout_style[0].card_background_color1 : data?.template_layout_style[0].card_background_color1;
    // } else {
    //   let card1textcolour =  data?.template_layout_style[0].card_text_color1;
    // let card1bgcolour =   data?.template_layout_style[0].card_background_color1;
    // }

    data.card_style = data?.template_layout_style[0].card_style;



    data.styleArr = {

      // --------- started layout 4 sub-templates ---------------

      style2: {
        temp_div_class: 't2',
        temp_div_style: ``,
        profile_bg_img_div: { 'background-image': 'linear-gradient(45deg, color-mix(in srgb, ' + card1bgcolour + ' 87%, transparent),  color-mix(in srgb, ' + card2bgcolour + ' 91%, #ffffff 38%))' },
        profile_h1_p: { 'color': card2textcolour },
        profile_h4: { 'color': 'color-mix(in srgb, ' + card2bgcolour + ' 42%, #ffffff 96%)' },
        share_profile_btn_div: { 'background-color': '#fff' },
        social_contact: { 'background-color': card1bgcolour },
        social_contact_links: { 'background-color': card2bgcolour, 'color': card2textcolour },
        social_contact_a: { 'color': card2textcolour },
        social_contact_span: { 'color': card2textcolour },
         share_profile_button_hover: { 'background-color': card2bgcolour, 'color': card2textcolour },


      },
      style3: {
        temp_div_class: 't3',
        temp_div_style: ``,
          share_profile_button_hover: { 'background-color': card2bgcolour, 'color': card2textcolour },
        profile_bg_img_div: { 'background-image': 'linear-gradient(45deg, #000000ba, #00000080), url(' + 'data:image/png;base64,' + profile_back_image + ')' },
        profile_h1_h4_p: { 'color': card1textcolour },
        share_profile_btn_div: { 'background-color': '#fff' },
        social_contact: { 'background-color': card1bgcolour },
        social_contact_links: { 'color': card1textcolour, 'border-bottom': '1px solid ' + card1textcolour },
        social_contact_a: { 'color': card1textcolour },
        social_contact_span: { 'color': card1textcolour },

      },
      style4: {
        temp_div_class: 't4',
        temp_div_style: ``,
  share_profile_button_hover: { 'background-color': card1bgcolour, 'color': card1textcolour , 'border': '1px solid ' + card1textcolour},
        profile_h1_h4_p: { 'color': card1textcolour },

        profile_bg_img_div: { 'background-image': 'linear-gradient(45deg, ' + card1bgcolour + ', color-mix(in srgb, ' + card1bgcolour + ' 60%, white))' },
        share_profile_btn_div: { 'background-color': card1bgcolour },
        share_profile_button: { 'background-color': card1textcolour, 'color': card1bgcolour },
        social_contact_links: { 'background-color': card1bgcolour },
        social_contact_a: { 'background-color': card1textcolour, 'color': card1bgcolour },
        social_contact_span: { 'color': card1textcolour },
        popup_card_header: { 'background-color': card1bgcolour, 'color': card1textcolour },


      },
      style5: {
        temp_div_class: 't5',
        temp_div_style: ``,

        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')' },
        profile_h1_h4_p: { 'color': card2textcolour },
        share_profile_button: { 'background-color': card2bgcolour, 'color': card2textcolour },
           share_profile_button_hover: { 'background-color': card1bgcolour, 'color': card1textcolour },
        share_profile_btn_div: { 'background-color': '#fff' },
        social_contact: { 'background-color': card1bgcolour },
        social_contact_links: { 'background-color': card1bgcolour, 'color': card1textcolour },
        social_contact_a: { 'color': card1textcolour },
        social_contact_span: { 'color': card1textcolour },

      },
      style22: {
        temp_div_class: 't22',
        temp_div_style: { 'background-color': card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')' },
        profile_h1_h4_p: { 'color': card1textcolour },
        share_profile_button: { 'background-color': 'color-mix(in srgb, ' + card1bgcolour + ' 85%, black)', 'color': card1textcolour },
            share_profile_button_hover: { 'background-color': card2bgcolour, 'color': card2textcolour },
        share_profile_btn_div: { 'background-color': '#fff' },
        social_contact_links: { 'background-color': card2textcolour, 'color': card2bgcolour },
        social_contact_a: { 'color': 'color-mix(in srgb, ' + card1bgcolour + ' 85%, black)' },
        social_contact_span: { 'color': card2bgcolour },

      },
      style24: {
        temp_div_class: 't24',
        temp_div_style: { 'background-color': card2bgcolour },
        share_profile_button: { 'background-color': card2bgcolour, 'color': card2textcolour },
        share_profile_button_hover: { 'background-color':card1bgcolour, 'color': card1textcolour },
        share_profile_btn_div: { 'background-color': '#fff' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')' },
        social_contact_links: { 'background-color': card2textcolour, 'color': card2bgcolour },
        social_contact_a: { 'background-color': 'transparent', 'color': card2bgcolour },
        social_contact_span: { 'color': card2bgcolour },
        profile_h1_h4_p: { 'color': card1textcolour },

      },
      style30: {
        temp_div_class: 't30',
        temp_div_style: { 'background-color': card2bgcolour },
        share_profile_button: { 'background-color': '#01AD49', 'color': 'white' },
          share_profile_button_hover: { 'background-color': card2bgcolour, 'color': card2textcolour },
        social_contact_links: { 'background-color': card1textcolour, 'color': card1bgcolour },
        social_contact_a: { 'background-color': 'transparent', 'color': card1bgcolour },
        social_contact_span: { 'color': card1bgcolour },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')' },
        share_profile_btn_div: { 'background-color': 'transparent' },
        profile_h1_h4_p: { 'color': card1textcolour },

      },

      style33: {
        temp_div_class: 't33',
        temp_div_style: { 'background-color': card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')' },

        profile_section_bg: { 'background-color': card2textcolour },
        share_profile_button: { 'background-color': card2textcolour, 'color': card2bgcolour },
        share_profile_btn_div: { 'background-color': '#fff' },
        profile_h1_h4_p: { 'color': card1textcolour },
        social_contact_links: { 'background-color': card1bgcolour, 'color': card1textcolour },
        social_contact_a: { 'background-color': 'transparent', 'color': card1textcolour },
        social_contact_span: { 'color': card1textcolour },

      },

      // --------- started layout 5 sub-templates ---------------
      style7: {
        temp_div_class: 't7',
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': 'transparent' },
        share_profile_button: { 'background-color': card2bgcolour, 'color': card2textcolour, 'border': '1px solid ' + card2textcolour },
             share_profile_button_hover: { 'background-color': card2textcolour, 'color': card2bgcolour, 'border': '1px solid ' + card2textcolour },
        share_profile_button_div: { 'background-color': card2bgcolour, 'border-bottom': '1px solid ' + card2textcolour },
        social_contact: { 'background-color': 'transparent' },
        social_contact_a: { 'background-color': card1bgcolour, 'color': card1textcolour },

      },
      style8: {
        temp_div_class: 't8',
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        social_contact: { 'background-color': card2bgcolour },
        social_contact_links: { 'background-color': card2bgcolour, 'color': card2textcolour, 'border': '1px solid ' + card2textcolour },
        social_contact_a: { 'background-color': card1textcolour, 'color': card1bgcolour },
      },

      style9: {
        temp_div_class: 't9',
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        social_contact: { 'background-color': card2bgcolour },
        social_contact_links: { 'background-color': 'color-mix(in srgb, ' + card2bgcolour + ' 45%, white)', 'color': card2textcolour }
      },
      style18: {
        temp_div_class: 't18',
        temp_div_style: { 'background-color': card2bgcolour },
        profile_section_bg: { 'background-color': card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        profile_h1_h4_p: { 'color': card2textcolour },
        social_contact: { 'background-color': card2bgcolour },
        social_contact_a: { 'color': card1bgcolour },
        social_contact_links: { 'background-color': card1textcolour, 'color': card1bgcolour },


      },
      style19: {
        temp_div_class: 't19',
        profile_section_bg: { 'background-color': card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        temp_div_style: { 'background-color': card2bgcolour },

        social_contact: { 'background-color': card2bgcolour },
        social_contact_a: { 'color': card1bgcolour },
        social_contact_links: { 'background-color': 'color-mix(in srgb, ' + card2bgcolour + ' 45%, white)', 'color': card1bgcolour }
      },

      style20: {
        temp_div_class: 't20',
        temp_div_style: { 'background-color': card2bgcolour },
        profile_section_bg: { 'background-color': card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        profile_h1_h4_p: { 'color': card2textcolour },
        share_profile_button_div: { 'background-color': 'color-mix(in srgb, ' + card1bgcolour + ' 88%, black)', 'border-bottom': '1px solid ' + card1textcolour },
        social_contact: { 'background-color': card2bgcolour },
        social_contact_links: { 'background-color': 'color-mix(in srgb, ' + card1bgcolour + ' 88%, black)', 'color': card1textcolour },
        social_contact_a: { 'background-color': 'color-mix(in srgb, ' + card1bgcolour + ' 58%, black)', 'color': card1textcolour },
      },

      style21: {
        temp_div_class: 't21',
        temp_div_style: { 'background': 'linear-gradient(45deg, ' + card1bgcolour + ', ' + card2bgcolour + ')' },
        social_contact: { 'background-color': 'transparent' },
        social_contact_links: { 'background-color': 'color-mix(in srgb, ' + card2bgcolour + ' 78%, black)', 'color': card2textcolour },
        social_contact_a: { 'background-color': 'color-mix(in srgb, ' + card1bgcolour + ' 73%,  white)', 'color': card1textcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        share_profile_button_div: { 'background-color': card1bgcolour, 'border-bottom': '1px solid ' + card1textcolour },
        share_profile_button: { 'background-color': 'color-mix(in srgb, ' + card1bgcolour + ' 73%,  white)', 'color': card1textcolour },
      },

      style23: {
        temp_div_class: 't23',
        temp_div_style: { 'background-color': card2bgcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        social_contact: { 'background-color': card2bgcolour },
        social_contact_links: { 'background-color': card1bgcolour, 'color': card1textcolour },
        social_contact_a: { 'color': card1textcolour },
      },
      style25: {
        temp_div_class: 't25',
        temp_div_style: { 'background-color': card2bgcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        share_profile_button: { 'background-color': card2bgcolour, 'color': card2textcolour ,'border': '1px solid ' + card2bgcolour},
         share_profile_button_hover: { 'background-color': card2textcolour, 'color': card2bgcolour, 'border': '1px solid ' + card2bgcolour },
        social_contact: { 'background-color': card2bgcolour },
        social_contact_links: { 'background-color': card1textcolour, 'color': card1bgcolour },
        social_contact_a: { 'color': card1bgcolour },

      },
      style26: {
        temp_div_class: 't26',
        temp_div_style: { 'background-color': card2bgcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        share_profile_button: { 'background-color': card2bgcolour, 'color': card2textcolour ,'border': '1px solid ' + card2bgcolour},
         share_profile_button_hover: { 'background-color': card2textcolour, 'color': card2bgcolour, 'border': '1px solid ' + card2bgcolour },
        social_contact: { 'background-color': card2bgcolour },
        social_contact_links: { 'background-color': card1textcolour, 'color': card1bgcolour },
        social_contact_a: { 'color': card1bgcolour },

      },
      style27: {
        temp_div_class: 't27',
        temp_div_style: { 'background-color': card2bgcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        share_profile_button_div: { 'background-color': 'color-mix(in srgb, ' + card2bgcolour + ' 72%, white)', 'border-bottom': '1px solid ' + card2textcolour },
        share_profile_button: { 'background-color': card2textcolour, 'color': card2bgcolour },
            share_profile_button_hover: { 'background-color': card1bgcolour, 'color': card1textcolour },
        social_contact: { 'background-color': card2bgcolour },
        social_contact_links: { 'background-color': 'transparent ', 'color': card2textcolour, 'border': '1px solid ' + card2textcolour },
        social_contact_a: { 'color': card2textcolour },
      },

      style28:
      {
        temp_div_class: 't28',
        temp_div_style: { 'background-color': card2bgcolour },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        share_profile_button_div: { 'background-color': 'white' },
        share_profile_button: { 'background-color': '#363636', 'color': 'white' },
         share_profile_button_hover: { 'background-color':card1bgcolour, 'color': card1textcolour },
        social_contact: { 'background-color': card2bgcolour },
        social_contact_links: { 'background-color': card1bgcolour, 'color': card1textcolour },
        social_contact_a: { 'color': card1textcolour },

      },

      style29:
      {
        temp_div_class: 't29',
        temp_div_style: { 'background-color': card2bgcolour },

        profile_section_bg: { 'background-color': 'white' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': 'transparent' },
        share_profile_button_div: { 'background-color': card2bgcolour, 'border-bottom': '1px solid ' + card2textcolour },
        share_profile_button: { 'background-color': card2textcolour, 'color': card2bgcolour },
         share_profile_button_hover: { 'background-color': card1bgcolour, 'color': card1textcolour },
        social_contact: { 'background-color': 'transparent' },
        social_contact_links: { 'background-color': card2bgcolour, 'color': card2textcolour },
        social_contact_a: { 'background-color': card1bgcolour, 'color': card1textcolour },
      },

      style31:
      {
        temp_div_class: 't31',
        card_heading_bg: { 'background-color': card2textcolour, 'color': card2bgcolour },
        temp_div_style: { 'background': 'linear-gradient(163deg, ' + card2bgcolour + ' 10%, rgba(255, 255, 255, 1) 52%, ' + card1bgcolour + ' 90%)' },
        profile_section_bg: { 'background-color': 'transparent' },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': 'transparent' },
        share_profile_button_div: { 'background-color': 'white' },
        social_contact: { 'background-color': 'transparent' },
        social_contact_links: { 'background-color': 'white ', 'color': card1textcolour },
        social_contact_a: { 'color': card1textcolour },
        share_profile_button_1: { 'background-color': card2bgcolour, 'color': card2textcolour , 'border': '1px solid ' + card2bgcolour},
        share_profile_button_2: { 'background-color': card1bgcolour, 'color': card2textcolour , 'border': '1px solid ' + card1bgcolour},
          share_profile_button_hover: { 'background-color': card2textcolour, 'color': card2bgcolour, 'border': '1px solid ' + card2bgcolour },
        social_links_a: { 'border': '2px solid ' + card1textcolour },


      },

      style32:
      {
        temp_div_class: 't32',
        profile_section_bg: { 'background-color': card2bgcolour },
        profile_bg_img_div: { 'background-image': 'url(' + 'data:image/png;base64,' + profile_back_image + ')', 'background-color': card2bgcolour },
        share_profile_button_2: { 'background-color': 'color-mix(in srgb,  ' + card1bgcolour + ', white 30%) ', 'color': card1textcolour },
                   share_profile_button_hover: { 'background-color': card2textcolour, 'color': card2bgcolour },
                    share_profile_button_1: { 'background-color': '#f47117', 'color': '#fff' },
        social_contact: { 'background-color': card2bgcolour },
        social_contact_links: { 'background-color': card1bgcolour, 'color': card1textcolour },
        social_contact_a: { 'color': card1textcolour },
        social_contact_span: { 'color': card1textcolour },
        popup_card_header: { 'background-color': card1bgcolour, 'color': card1textcolour },

      },

      // ------- layout 6 ------------

      style11:
      {
        temp_div_class: 't11',
        temp_div_style: {  'background-color': '#edeef0' },
        temp_div_style_image : { 'background-image': ' url( ' + this.globalObject.getImageSrcActiveTemplate(profile_back_image) + ' )' },
       social_contact_links: { 'border-bottom': '1px  dashed ' + card1bgcolour },
        social_contact_a: { 'color': '#ebc960 ' },
        social_contact_span: { 'color': card1bgcolour },
        share_profile_button_div: { 'background-color': 'transparent' },
        share_profile_button_1: { 'background-color': '#e8d52e', 'color': 'white', 'border': '1px  solid  white' },
        share_profile_button_2: { 'background-color': '#e8d52e', 'color': 'white' , 'border': '1px  solid  white'},


      },

      style12:
      {
        temp_div_class: 't12',
        share_profile_button_div: { 'background-color': 'transparent' },
        share_profile_button_2: { 'background-color': card1bgcolour, 'color': card1textcolour , 'border': '1px  solid  ' + this.card1bgcolour },
        share_profile_button_1: { 'background-color': card2textcolour, 'color': card2bgcolour , 'border': '1px  solid  ' + this.card2bgcolour },
         profile_h1_h4_p: { 'color': '#c8ff1f' },
        card_heading_bg: { 'color': card2textcolour },
        social_contact_links: { 'color': card2bgcolour },
        social_contact_span: { 'color': card2bgcolour },


      },

      style13:
      {
        temp_div_class: 't13',
       share_profile_button_div: { 'background-color': 'transparent' },
        share_profile_button: { 'background-color': card2textcolour, 'color': card2bgcolour ,'border': '1px  solid  ' + this.card2textcolour},
          social_contact_links: { 'background-color': '#fff', 'color': '#000' },
        social_contact_span: { 'color': '#000' },
        social_contact_a: { 'color': card2textcolour },
        social_contact_i: { 'color': card1textcolour, 'background': 'linear-gradient(45deg, ' + card2bgcolour + ' ,  color-mix(in srgb,  ' + card2bgcolour + ', white 20%))' },
        profile_h1_p: { 'color': card2textcolour },
        profile_h4: { 'color': card1bgcolour },
        profile_photo_div: { 'border': '5px  solid ' + card1bgcolour },

      },
      style14:
      {
        temp_div_class: 't14',

        profile_h1_h4_p: { 'color': card2bgcolour },
        social_contact_links: { 'border-bottom': '1px  dashed ' + card1bgcolour },
        social_contact_span: { 'color': card1bgcolour },
        social_links_a: { 'background-color': card2bgcolour },



      },
      style15:
      {
        temp_div_class: 't15',
        profile_h1_h4_p: { 'color': 'color-mix(in srgb,  ' + card2bgcolour + ', white 25%)' },
        share_profile_button: { 'background-color': 'color-mix(in srgb,  ' + card2bgcolour + ', white 25%) ', 'color': card2textcolour },
          share_profile_button_hover: { 'background-color': card1bgcolour, 'color': card1textcolour , 'border': 'none' },
        card_heading_bg: { 'color': card2textcolour },
        social_contact_links: { 'border-bottom': '1px  dashed '+ card1bgcolour  },
        social_contact_span: { 'color': card1bgcolour },
        social_contact_a: { 'color': card1bgcolour },

      },

         style16:
      {
        temp_div_class: 't16',
        profile_h1_h4_p: { 'color': 'color-mix(in srgb,  ' + card2bgcolour + ', #ff9800 25%)' },
        share_profile_button_div: { 'background-color': 'transparent' },
        share_profile_button_2: { 'background-color': '#fdd25f', 'color': '#ffffff' },
        share_profile_button_1: { 'background-color': 'color-mix(in srgb,  ' + card2bgcolour + ', #ff9800 25%)' , 'color': card2textcolour },
           share_profile_button_hover: { 'background-color': card1bgcolour, 'color': card1textcolour , 'border': 'none' },
        card_heading_bg: { 'color': card2textcolour },
        social_contact_links: { 'border-bottom': '1px  dashed ' + card1bgcolour  },
        social_contact_span: { 'color':  card1bgcolour},
        social_contact_a: { 'color':  card1bgcolour },
       

      },


      style17:
      {
        temp_div_class: 't17',
       
     
        profile_h1_h4_p: { 'color':  card2textcolour },
        share_profile_button_div: { 'background-color': 'transparent' },
        share_profile_button_2: { 'background-color': '#ccd144', 'color': '#ffffff' },
        share_profile_button_1: { 'background-color': 'color-mix(in srgb,  ' + card2bgcolour + ', #ffffff 25%)' , 'color': card1textcolour },
         share_profile_button_hover: { 'background-color': card2bgcolour, 'color': card2textcolour , 'border': 'none' },
        social_contact_links: { 'border-bottom': '1px  dashed color-mix(in srgb,  ' + card2textcolour + ', #000 20%)' },
        social_contact_span: { 'color':  'color-mix(in srgb,  ' + card2textcolour + ', #000 20%)'},
        social_contact_a: { 'color':  'color-mix(in srgb,  ' + card2textcolour + ', #000 20%)' },
     
      }


    }
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
  private getscrollData(searchInputflag?:any) {
    if (this.isLoading) return;
    this.isLoading = true;
   
    let wsdp: any = {
      limit: this.limit,
      from_row: this.from_row,
      search:this.searchText
    }
    let reqData: any = {
      wsdp: wsdp
    };
    this.loginService.postData(reqData, "getActivatetemplateCount").subscribe(
      (rescount) => {
        if (rescount?.responseStatus?.includes('success')) {
          this.total_length = Number(rescount.responseData?.totalCount?.[0]?.total_count || 0);
          if (this.total_length === 0) {
            this.active_template_data = [];
            this.isLoading = false;
            this.cdr.markForCheck();
            return;
          }

          // alert(this.total_length);
          // this.total_length=40;
          this.loginService.postData(reqData, "getActivatetemplate").subscribe(
            (res) => {
              this.loader = false;
              if (res?.responseStatus?.includes('success')) {
                // if(!this.pcard_url){
                //    this.pcard_url=res.responseData[0]?.pcard_url_template[0]?.template_url;
                //    alert(this.pcard_url);
                // }


                if (res.responseData.length > 0) {
                  for (let data of res.responseData) {
                    if (data.template_layout_style && data.template_layout_style.length > 0) {
                      this.setProperty(data);
                    }
                  }
                }



                 if(searchInputflag){
                  // console.log("search ingput flag ",searchInputflag);
      this.active_template_data=[];
    }
                this.active_template_data = [...this.active_template_data, ...res.responseData];
                console.log(this.active_template_data);
                this.isLoading = false;
                this.cdr.markForCheck();

              } else {
                this.isLoading = false;
              }
            },
            (err) => {
              this.isLoading = false;
            }
          );
        } else {
          this.isLoading = false;
        }

      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  scrollEl: any;
  
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) this.scrollEl = this.content?.nativeElement;
  }
 
  isLoading = false;
  bottomReachedOnce = false; // <-- new flag

  onScroll(event: any) {
    if (!this.scrollEl || this.isLoading || this.bottomReachedOnce) return;

    const scrollTarget = event?.currentTarget as HTMLElement || this.scrollEl;
    const scrollTop = scrollTarget.scrollTop;
    const scrollHeight = scrollTarget.scrollHeight;
    const clientHeight = scrollTarget.clientHeight;

    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

    if (isAtBottom) {
      this.bottomReachedOnce = true;  // prevent re-trigger
      this.loadMore();
    }
  }
  loadMore() {
    console.log("Loading more...");


    if (this.total_length > this.active_template_data.length) {
      this.from_row = this.from_row + 10;
      this.getscrollData()
    }
    this.bottomReachedOnce = false;
  }






  openWhatsApp(event: Event, urldata?: any) {
    if (!isPlatformBrowser(this.platformId)) return;
    event.preventDefault(); // stop normal link behavior
    const url = "https://api.whatsapp.com/send?text=" + encodeURIComponent(urldata);
    window.open(url, "_blank");   // open in new tab
  }



  openSMS(event: Event, urldata?: any) {
    if (!isPlatformBrowser(this.platformId)) return;
    event.preventDefault();
    const smsURL = "sms:?body=" + encodeURIComponent(urldata);
    window.location.href = smsURL; // works on Android + iPhone
  }


  openTelegram(event: Event, urldata?: any) {
    if (!isPlatformBrowser(this.platformId)) return;
    event.preventDefault();
    const url = "https://t.me/share/url?text=" + encodeURIComponent(urldata);
    window.open(url, "_blank");
  }

  openLinkedIn(event: Event, urldata?: any) {
    if (!isPlatformBrowser(this.platformId)) return;
    event.preventDefault();
    const url = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(this.shareUrl);

    window.open(url, "_blank");
  }



  onFileSelected(event: any, data?: any) {
    if (!isPlatformBrowser(this.platformId)) return;

    const safeUrl = encodeURI(data?.pcard_url_template[0]?.template_url);
    let first_name = data?.profile_images[0]?.image ? data.profile_images[0].first_name : '';
    let last_name = data?.profile_images[0]?.image ? data.profile_images[0].last_name : '';
    // let datas of 
    data.contact_Details
    const contact = {
      name: first_name + " " + last_name,
      phone: data.contact_Details.mobile_no,
      email: data.contact_Details.email_id,
      website: safeUrl
    };

    const vcfData = `BEGIN:VCARD
      VERSION:3.0
      FN:${contact.name}
      TEL;TYPE=cell:${contact.phone}
      EMAIL:${contact.email}
      URL:${contact.website}
      END:VCARD`;

    const blob = new Blob([vcfData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contact.name}.vcf`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // --------------------- hover effect for new template -7 ( hover on social contact one by one )------- 
  hoveredIndex: number | null = null;
hoveredType: string | null = null;
setHover(index: number, type: string,data?:any) {
  data.hoveredIndex = index;
  data.hoveredType = type;
  
}

clearHover(data?:any) {
  data.hoveredIndex = null;
  data.hoveredType = null;

}

getHoverStyle(index: number, type: string,data?:any,datahover?:any) {
 
   const isActive =
    datahover.hoveredIndex === index && datahover.hoveredType === type;
  
  let hoverdata:any;
     if(isActive){
hoverdata={
      
           background: datahover?.user_template_layout_style?.[0]?.card_text_color1 ? datahover?.user_template_layout_style[0]?.card_text_color1 : data.card_text_color1,
        color: datahover?.user_template_layout_style?.[0]?.card_background_color1 ? datahover?.user_template_layout_style[0]?.card_background_color1 : data.card_background_color1,
        border: `1px solid ${ datahover?.user_template_layout_style?.[0]?.card_background_color1  ? datahover?.user_template_layout_style[0]?.card_background_color1 : data.card_background_color1}`
      }
     }else{
hoverdata={                           
       

           color: datahover?.user_template_layout_style?.[0]?.card_text_color1 ? datahover?.user_template_layout_style[0]?.card_text_color1 : data.card_text_color1,
        background: datahover?.user_template_layout_style?.[0]?.card_background_color1 ? datahover?.user_template_layout_style[0]?.card_background_color1 : data.card_background_color1,
        border: `1px solid ${datahover?.user_template_layout_style?.[0]?.card_background_color1  ? datahover?.user_template_layout_style[0]?.card_background_color1 : data.card_background_color1}`
      };
      }
     


   
    
    return hoverdata;
}


getHoverStyleweb2(index: number, type: string,data?:any,datahover?:any,user_template?:any) {

 
   const isActive =
    datahover.hoveredIndex === index && datahover.hoveredType === type;
  
  let hoverdata:any;
     if(isActive){
hoverdata={
      
         

           background:  datahover?.user_template_layout_style?.[0]?.card_text_color1 ? datahover?.user_template_layout_style[0]?.card_text_color1 : data.card_text_color1,
        color: datahover?.user_template_layout_style?.[0]?.card_background_color1  ? datahover?.user_template_layout_style[0]?.card_background_color1  : data.card_background_color1,
           border:`1px solid ${datahover?.user_template_layout_style?.[0]?.card_background_color1  ? datahover?.user_template_layout_style[0]?.card_background_color1 : data.card_background_color1}`
       
      }
     }else{
hoverdata={                           
         color: datahover?.user_template_layout_style?.[0]?.card_text_color1 ? datahover?.user_template_layout_style[0]?.card_text_color1 : data.card_text_color1,
        background: datahover?.user_template_layout_style?.[0]?.card_background_color1 ? datahover?.user_template_layout_style[0]?.card_background_color1 : data.card_background_color1,
           border:`1px solid ${datahover?.user_template_layout_style?.[0]?.card_background_color1  ? datahover?.user_template_layout_style[0]?.card_background_color1 : data.card_background_color1}`
      };
      }
     


   
    return hoverdata;
}

getProfileHoverStyle(
  index: number,
  type: string,
  data?: any,
  datahover?: any,
  element: 'button' | 'icon' = 'button'
) {

  const isActive =
    datahover?.hoveredIndex === index &&
    datahover?.hoveredType === type;

  if (element === 'icon') {
    return {
      'color': isActive
        ? data.card_text_color2
        : data.card_text_color1,

      '--color': isActive
        ? data.card_text_color2
        : data.card_text_color1
    };
  }

  return {
    'color': isActive
      ? data.card_text_color2
      : data.card_text_color1,

    'background': isActive
      ? data.card_back_color2
      : 'white'
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

open(data:any) {
  console.log("user_code ",data.contact_Details[0].user_code);

  

  for(let data_activate of this.active_template_data){
    if(data_activate.contact_Details[0].user_code!=data.contact_Details[0].user_code){
         data_activate.address_coloapse=false;
    }
  }

  if(data.address_coloapse){
data.address_coloapse=false;
  }else{
    data.address_coloapse=true;
  }
  const url = data?.contact_Details?.[0]?.google_map_url;

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


openIndex: number | null = null;

toggleCollapse(index: number) {
  this.openIndex = this.openIndex === index ? null : index;
}
search(){
// console.log(event.target.value);
// this.searchText=event.target.value;
console.log("serach",this.searchText);
this.active_template_data=[]
this.from_row=0
this.getscrollData(true);
}
clearSearch(){
  // console.log("check");
  // console.log("serach",this.searchText);
  this.searchText="";
this.active_template_data=[]
this.from_row=0
this.getscrollData(true)
}
}

// onScroll(event: any) {
//   const scrollTop = event.detail.scrollTop;
//   console.log("Scrolling...", scrollTop);

//   if (scrollTop > 400) {
//     this.loadMoreData();
//   }
// }

// loadMoreData() {
//   console.log("Loading more data...");
//   // Call your API and append more cards here
// }}