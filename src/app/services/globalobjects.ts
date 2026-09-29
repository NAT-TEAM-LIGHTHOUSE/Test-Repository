
import { Inject, Injectable, PLATFORM_ID,  } from '@angular/core';
// import { Login } from './login.service';
import { BehaviorSubject, filter, firstValueFrom } from 'rxjs';

import { NavigationEnd, Router } from '@angular/router';
// import { SuccInfoComponent } from '../component/Layout/admin_layout/succ-info/succ-info.component';
// import { style } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Login } from './login';
import { Seo } from './seo';
import { environment } from '../../environments/environment';

// import { isString } from '@amcharts/amcharts5/.internal/core/util/Type';
// import { visibility } from 'html2canvas/dist/types/css/property-descriptors/visibility';

@Injectable({
  providedIn: 'root'
})
export class Globalobjects {
   public assetsUrl = environment.assetUrl + "/assets";
  public websiteUrl :any;
  public webBuildVersion = '1.4.1';
public googleReviewLink:any
public urlNew= environment.loginPageUrl;

  public blockedDomains = [
    '0-mail.com', '0815.ru', '10mail.org', '10minutemail.com', '10minutemail.net', '10minutemail.org', '20minutemail.com',
    '2prong.com', '33mail.com', '3d-painting.com', '4warding.com', 'anonbox.net', 'anonymbox.com', 'antichef.com',
    'armyspy.com',
    'binkmail.com', 'bodhi.lawlita.com', 'bofthew.com',
    'burnermail.io',
    'byom.de',
    'chacuo.net',
    'cool.fr.nf',
    'courriel.fr.nf',
    'dayrep.com',
    'deadaddress.com',
    'despam.it',
    'devnullmail.com',
    'discard.email',
    'discardmail.com',
    'discardmail.de',
    'disposable.com',
    'dispostable.com',
    'dm.w3internet.co.uk',
    'dodgit.com',
    'dodgit.org',
    'dontreg.com',
    'dropmail.me',
    'dump-email.info',
    'e4ward.com',
    'emailondeck.com',
    'emailtemporario.com.br',
    'emailtmp.com',
    'fakeinbox.com',
    'fake-mail.ml',
    'fastacura.com',
    'filzmail.com',
    'fizmail.com',
    'fleckens.hu',
    'frapmail.com',
    'garliclife.com',
    'getairmail.com',
    'getnada.com',
    'gishpuppy.com',
    'gmal.com',
    'guerrillamail.biz',
    'guerrillamail.com',
    'guerrillamail.de',
    'guerrillamail.net',
    'guerrillamail.org',
    'guerrillamailblock.com',
    'hidemail.de',
    'hmamail.com',
    'hotpop.com',
    'incognitomail.com',
    'jetable.com',
    'jetable.fr.nf',
    'kasmail.com',
    'keepmymail.com',
    'killmail.com',
    'klezmail.com',
    'mail-temporaire.fr',
    'maildrop.cc',
    'mailinator.com',
    'mailinator.net',
    'mailinator.org',
    'mailnesia.com',
    'mailnull.com',
    'mailnesia.com',
    'mailtothis.com',
    'mintemail.com',
    'mintmail.com',
    'mohmal.com',
    'mytemp.email',
    'no-spam.ws',
    'noclickemail.com',
    'nowmymail.com',
    'objectmail.com',
    'one-time.email',
    'opayq.com',
    'owlpic.com',
    'pookmail.com',
    'proxymail.eu',
    'rcpt.at',
    'recode.me',
    'sharklasers.com',
    'spambog.com',
    'spambog.de',
    'spambog.ru',
    'spamgourmet.com',
    'spamherelots.com',
    'spamhereplease.com',
    'spamhole.com',
    'spamify.com',
    'spaminator.de',
    'spamspot.com',
    'temp-mail.io',
    'temp-mail.org',
    'temp-mail.ru',
    'tempail.com',
    'tempemail.com',
    'tempinbox.com',
    'tempmail.com',
    'tempmail.net',
    'tempmailaddress.com',
    'temporaryemail.net',
    'throwawaymail.com',
    'trashmail.at',
    'trashmail.com',
    'trashmail.de',
    'trashmail.net',
    'wegwerfemail.de',
    'wegwerfmail.de',
    'yopmail.com',
    'yopmail.fr',
    'yopmail.net'
  ];
  clearGlobalVariables(): void {
    this.isOffline.next(false);
    this.pay_suc_failed_page = undefined;
    this.pteam_login_flag = true;
    this.permission_data = { permission_flag: {} };
    this.team_url = undefined;
    this.admin_user_name = undefined;
    this.adminMenucode_active = "";
    this.global_temp_live_flag = false;
    this.design_menu_code = undefined;
    this.user_code = undefined;
    this.user_rights = undefined;
    this.user_name = undefined;
    this.user_image = undefined;
    this.user_image_admin = undefined;
    this.template_card_image = undefined;
    this.user_role = undefined;
    this.initial_name = undefined;
    this.userwp = undefined;
    this.userEmail = undefined;
    this.userMobile = undefined;
    this.user_company_image = undefined;
    this.url = "";
    this.barcode = undefined;
    
    this.routing_details = {};
    this.admin_sidebar_tab_data = undefined;
    this.showHeaderSearch = false;
    this.company_logo = undefined;
    this.company_name = undefined;
    this.user_saved_image_count = undefined;
    this.header_heading = undefined;
    this.team_parent_child_value = '';
    this.isTemplate = true;
    this.set_admin_pcard_usercode = undefined;
    // Add more resets for any other global variables as needed
  }
  public isOffline = new BehaviorSubject<boolean>(false);
  pay_suc_failed_page: any;
  pteam_login_flag: any = true;
  permission_data: any = {
    permission_flag: {}
  };
  dash_not_verified_flag: any = false;
  app_version: any = '1.4.8';
  dash_route_data: any = {
    dash_not_verified_flag: false,
    dash_active_flag: false,
    dash_deactive_flag: false,
    dash_template_flag: false,
    dash_totaltemplate_flag: false
  }


  designer_dash_route_data: any = {
    active_design_flag: false,
    total_design_flag: false
  }


  set_admin_pcard_usercode: any;
  team_url: any;
  admin_user_name: any;
  adminMenucode_active = "";
  back_dashobardMenu = false;
  global_temp_live_flag = false;
  design_menu_code: any;
  user_code: any;
  user_rights: any;
  user_name: any;
  user_image: any;
  user_image_admin: any;
  template_card_image: any;
  user_role: any;
  initial_name: any;
  userwp: any;
  userEmail: any;
  userMobile: any;
  user_company_image: any;
  url = "";
  barcode: any;
  // user_code_value:any;
  public routing_details: any = {}
  admin_sidebar_tab_data: any;
  public showHeaderSearch: boolean = false;
  company_logo: any;
  company_name: any;
  user_saved_image_count: any;
  header_heading: any;
  team_parent_child_value = '';
  team_parent_child_default = ''
  image_url: any;
  team_number = 0;
  isTemplate = true
  private history: string[] = [];
  // isTemplate = true
  loader = false;

  currencyValue: any = {
    "INR": "",
    "USD": "",
    "CAD": ""
  }
  currency_date: any;

  stateList = [
    "Maharashtra",
    "Goa",
    "Gujrat",
    "Andhra Pradesh"
  ]
  formsObj: any =
    {

      "MENU-002": {
        fields: [
          { key: 'package_name', label: 'Package Name:', type: 'text', required: true },
          { key: 'price', label: 'Price:', type: 'number', required: true },
          { key: 'valid_days', label: 'Valid Days:', type: 'number', required: true },
          { key: 'total_users', label: 'Total User:', type: 'number', required: true },
          {
            key: 'register_type',
            label: 'Register Type:',
            type: 'select',
            required: true,
            options: []
          }
        ],
        title: "Package List"
      },
      "MENU-018": {
        fields: [
          { key: 'role_name', label: 'Role Name', type: 'textonly', required: true }
        ],
        title: "Role"
      },
      "MENU-019": {
        fields: [
          { key: 'country_name', label: 'Select Country', type: 'select', required: true, options: [], disable: true },
          {
            key: 'state_name',
            label: 'Select State',
            type: 'select',
            required: true,
            options: [],
            disable: true
          },
          {
            key: 'geo_name',
            label: 'City Name',
            type: 'text',
            required: true
          },
          {
            key: 'pin_code',
            label: 'Pin Code',
            type: 'pin_code',
            required: true
          }
        ],
        title: "City"
      },
      "MENU-020": {
        fields: [
          { key: 'geo_name', label: 'Country Name', type: 'text', required: true },
        ],
        title: "Role"
      }, "MENU-021": {
        fields: [
          {
            key: 'parent_code',
            label: 'Country Name:',
            type: 'select',
            required: true,
            options: []
          },
          { key: 'geo_name', label: 'State', type: 'text', required: true },

        ],
        title: "State"
      },

      "MENU-023": {
        fields: [
          {
            key: 'parent_profession_code',
            label: 'Parent Profession:',
            type: 'select',
            required: true,
            options: []
          },
          { key: 'profession_name', label: 'Occupation Name', type: 'textonly', required: true },

        ],
        title: "Occupation"
      },
      "MENU-024": {
        fields: [
          { key: 'email_subject', label: 'Template Name', type: 'text', required: true },
          { key: 'template_code', label: 'Template Id:', type: 'text', required: true },
          { key: 'email_body', label: 'Template Message:', type: 'ckeditor', required: true },
        ],
        title: "SMS Template"
      },
      "MENU-026": {
        fields: [
          { key: 'company_name', label: 'Company Name:', type: 'text', required: true },
          { key: 'contact_person', label: 'Contact Person:', type: 'text', required: true },
          // { key: 'email', label: 'Email:', type: 'text', required: true },
          { key: 'email', label: 'Email:', type: 'email', required: true },
          // { key: 'password', label: 'Password:', type: 'text', required: true },
          { key: 'password', label: 'Password:', type: 'password', required: true },
          // { key: 'mobile_no', label: 'Mobile Number:', type: 'text', required: true },
          { key: 'mobile_no', label: 'Mobile Number:', type: 'mobile', required: true },
          // { key: 'whatsapp_no', label: 'Whats app Mobile:', type: 'text', required: true },
          { key: 'whatsapp_no', label: 'Whats app Mobile:', type: 'mobile', required: false },
          { key: 'company_address', label: 'Company Address:', type: 'textarea', required: true },
          { key: 'state', label: 'State:', type: 'text', required: true },
          { key: 'city', label: 'City:', type: 'text', required: true },
          { key: 'pincode', label: 'Pincode:', type: 'text', required: true },//mobile
          { key: 'nature_of_business', label: 'Nature Of Business:', type: 'text', required: true },
          { key: 'reference_by', label: 'Refrence By:', type: 'text', required: true },
          { key: 'gst_no', label: 'GST Number:', type: 'text', required: false },
          { key: 'company_logo', label: 'Company Logo:', type: 'image', required: false }
        ],
        title: "Channel Partner"
      },
      "MENU-027": {
        fields: [
          { "key": "first_name", "label": "First Name:", "type": "text", "required": true, "placeholder": "Enter First Name" },
          { "key": "middle_name", "label": "Middle Name:", "type": "text", "required": true, "placeholder": "Enter Middle Name" },
          { "key": "last_name", "label": "Last Name:", "type": "text", "required": true, "placeholder": "Enter Last Name" },

          {
            "key": "gender",
            "label": "Gender:",
            "type": "radio",
            "required": true,
            "options": ["Male", "Female"]
          },

          { "key": "dob", "label": "Date of Birth:", "type": "date", "required": true, "placeholder": "dd-mm-yyyy" },
          { "key": "doj", "label": "Date of Joining:", "type": "date", "required": true, "placeholder": "dd-mm-yyyy" },

          { "key": "user_address", "label": "Present Address:", "type": "textarea", "required": true },
          { "key": "permanent_address", "label": "Permanent Address:", "type": "textarea", "required": true },

          { "key": "city", "label": "City:", "type": "text", "required": true, "placeholder": "Enter City Name" },
          { "key": "pincode", "label": "Pincode:", "type": "text", "required": true, "placeholder": "Enter Pincode" },

          { "key": "email_id", "label": "Email:", "type": "email", "required": true, "placeholder": "Enter Email" },
          { "key": "password", "label": "Password:", "type": "password", "required": true },

          { "key": "mobile_no", "label": "Permanent Mobile:", "type": "mobile", "required": true, "placeholder": "Enter Mobile1 Number" },
          { "key": "wp_number", "label": "Alternate Mobile:", "type": "mobile", "required": false, "placeholder": "Enter Mobile2 Number" },

          { "key": "company_name", "label": "Organisation Name:", "type": "text", "required": true, "placeholder": "Enter Organisation Name" },

          {
            "key": "designation",
            "label": "Select Designation:",
            "type": "select",
            "required": true,
            "options": []
          },

          {
            "key": "role_code",
            "label": "Select Role:",
            "type": "select",
            "required": true,
            "options": []
          },

          { "key": "profile_image", "label": "Profile Image:", "type": 'image', "required": false }
        ],
        title: "Staff List"
      }, "MENU-033": {
        fields: [
          {
            key: 'ad_mcategoryname', label: 'Blog Category Name', type: 'text', required: true
          },
          { key: 'ad_mcategoryimg', label: 'Image:', type: 'image', required: true },
        ],
        title: "Blog Category"
      }
      , "MENU-036": {
        fields: [
          { key: 'title_name', label: 'Title:', type: 'text', required: true },
          { key: 'description', label: 'Description:', type: 'textarea', required: true },
          { key: 'designation', label: 'Designation:', type: 'textarea', required: true },
          { key: 'profile_img', label: 'Profile Images:', type: 'image', required: true },
        ],
        title: "Testimonial"
      },

      "MENU-037": {
        fields: [
          { key: 'video_title', label: 'Video Title:', type: 'text', required: true },
          { key: 'video_embeded_url', label: 'Video Embeded URL:', type: 'text', required: true },
        ],
        title: "Video"
      }
      , "MENU-038": {
        fields: [
          { key: 'ad_seoname', label: 'SEO Title:', type: 'text', required: false },
          {
            key: 'page_name',
            label: 'Page Name:',
            type: 'select',
            required: true,
            options: []
          },
          { key: 'seo_desc', label: 'Description:', type: 'textarea', required: false },
          { key: 'ad_keyword', label: 'Keywords:', type: 'textarea', required: false },
        ],
        title: "Video"
      }, "MENU-035": {
        fields: [
          { key: 'ad_blogname', label: 'Blog Name', type: 'text', required: true },
          {
            key: 'category_id',
            label: 'Parent Category:',
            type: 'multi-select',
            required: true,
            options: []
          },
          { key: 'ad_blogimg', label: 'Image:', type: 'image', required: true },
          { key: 'blog_desc', label: 'Description:', type: 'ckeditor', required: false },
        ],
        title: "Video"
      }

      , "MENU-039": {
        fields: [
          { key: 'page_category', label: 'Page Name:', type: 'text', required: false },
        ],
        title: "Page Category"
      }

      //     ,"MENU-039": {
      //       fields:[	           
      //       { key: 'seo_title', label: 'SEO Title:', type: 'text', required: false },
      //       { key: 'page_name', label: 'Page Name:', type: 'text', required: false },
      //       { key: 'description', label: 'Description:', type: 'text', required: false },
      //       { key: 'keywords', label: 'Keywords:', type: 'text', required: false },
      // ],
      // title:"SEO Category"
      //     }

      ,
      "MENU-012": {
        fields: [
          { "key": "first_name", "label": "First Name:", "type": "text", "required": true, "placeholder": "Enter First Name" },
          { "key": "middle_name", "label": "Middle Name:", "type": "text", "required": true, "placeholder": "Enter Middle Name" },
          { "key": "last_name", "label": "Last Name:", "type": "text", "required": true, "placeholder": "Enter Last Name" },

          {
            "key": "gender",
            "label": "Gender:",
            "type": "radio",
            "required": true,
            "options": ["Male", "Female"]
          },

          { "key": "dob", "label": "Date of Birth:", "type": "date", "required": true, "placeholder": "dd-mm-yyyy" },
          { "key": "doj", "label": "Date of Joining:", "type": "date", "required": true, "placeholder": "dd-mm-yyyy" },

          { "key": "user_address", "label": "Present Address:", "type": "textarea", "required": true },
          { "key": "permanent_address", "label": "Permanent Address:", "type": "textarea", "required": true },

          { "key": "city", "label": "City:", "type": "text", "required": true, "placeholder": "Enter City Name" },
          { "key": "pincode", "label": "Pincode:", "type": "text", "required": true, "placeholder": "Enter Pincode" },

          { "key": "email_id", "label": "Email:", "type": "email", "required": true, "placeholder": "Enter Email" },
          { "key": "password", "label": "Password:", "type": "password", "required": true },

          { "key": "mobile_no", "label": "Permanent Mobile:", "type": "mobile", "required": true, "placeholder": "Enter Mobile1 Number" },
          { "key": "wp_number", "label": "Alternate Mobile:", "type": "mobile", "required": false, "placeholder": "Enter Mobile2 Number" },
          { "key": "company_name", "label": "Organisation Name:", "type": "text", "required": true, "placeholder": "Enter Organisation Name" },


          {
            key: 'role_code', label: 'Select Role:', type: 'select', required: true,
            options: []
          },

          { "key": "profile_image", "label": "Profile Image:", "type": "image", "required": false }
        ], title: "Designers List"
      }
      ,

      "MENU-047": {
        "title": "Add New Design",
        "fields": [
          {
            "key": "event_name",
            "label": "Design Title:",
            "type": "text",
            "required": true,
            "placeholder": "Enter Design Title"
          },
          {
            "key": "description",
            "label": "Description:",
            "type": "textarea",
            "required": false,
            "placeholder": "Enter Description"
          },
          // {
          //   "key": "parent_category",
          //   "label": "Select Parent Category:",
          //   "type": "select",
          //   "required": true,
          //   "options": [],
          //   "placeholder": "Select Any"
          // },
          // {
          //   "key": "sub_category",
          //   "label": "Select Sub Category:",
          //   "type": "select",
          //   "required": true,
          //   "options": [],
          //   "placeholder": "Select Any"
          // },

          {
            key: 'parent_category',
            label: 'Select Parent Category',
            type: 'select',
            required: true,
            options: [], // Will be filled dynamically
            showWhen: { field: 'target', value: 'Add Category', required: true, }
          },

          {
            key: 'sub_category',
            label: 'Select Sub Category',
            type: 'select',
            required: true,
            options: [],
            // we show this only once a parentVal has been chosen
            showWhen: { field: 'parent_category', value: null }
          },
          {
            "key": "industry",
            "label": "Select Industry:",
            "type": "select",
            "required": true,
            "options": [
              "Accountant", "Actor", "Advertiser", "Architect", "Artist", "Academician", "Author", "Blogger", "Businessman",
              "Chartered Accountant", "Company Secretary", "Consultant", "Dentist", "Designer", "Dietitian", "Digital Marketer",
              "Doctor", "Electrician", "Engineer", "Entrepreneur", "Event Manager", "Fashion designer", "Hairdresser",
              "Interior designer", "Investment Bankers", "IT Professional", "Journalist", "Lawyers", "Lecturer", "Librarian",
              "Mechanic", "Pharmacist", "Photographer", "Physician", "Plumber", "Psychologist", "Scientist", "Software Developer",
              "Tax Advisor", "Technician", "Trainer", "Intrapreneur", "Student", "Tourism", "HR", "Politician"
            ]
          },
          {
            "key": "image_data",
            "label": "Upload Photo:",
            "type": "image",
            "required": true
          },
          {
            "key": "logo_status",
            "label": "Logo Status:",
            "type": "radio",
            "required": true,
            "options": ["Yes", "No"]
          },
          {
            "key": "bottom_footer",
            "label": "Bottom Footer:",
            "type": "radio",
            "required": true,
            "options": ["Yes", "No"]
          },
          {
            "key": "upper_footer",
            "label": "Upper Footer:",
            "type": "radio",
            "required": true,
            "options": ["Yes", "No"]
          },
          {
            "key": "tags",
            "label": "Tags:",
            "type": "text",
            "required": false,
            "placeholder": "e.g. Test case, Test Event"
          },
          {
            "key": "remark",
            "label": "Remark:",
            "type": "textarea",
            "required": false
          }
        ]
      }, "MENU-044": {
        fields: [
          { key: 'slider_name', label: 'Add Slider Name', type: 'text', },
          { key: 'description', label: 'Slider Description', type: 'textarea', },
          {
            key: 'target',
            label: 'Select Target',
            type: 'select',
            required: true,
            options: [
              { label: 'Select any', value: 'Select any' },
              { label: 'Add Category', value: 'Add Category' },
              { label: 'Add New Website Link', value: 'Add New Website Link' }
            ]
          },
          {
            key: 'parent_category_code',
            label: 'Select Parent Category',
            type: 'select',
            options: [], // Will be filled dynamically
            showWhen: { field: 'target', value: 'Add Category', required: true, }
          },

          {
            key: 'sub_category',
            label: 'Select Sub Category',
            type: 'select',
            options: [],
            // we show this only once a parentVal has been chosen
            showWhen: { field: 'parent_category_code', value: null }
          },
          { key: 'link', label: 'Add New Website Link:', type: 'link' },
          { key: 'slider_image', label: 'Select Image:', type: 'image', required: true },


        ],
        title: "Slider"
      },
      "MENU-043": {
        fields: [
          { key: 'ad_tagname', label: 'Add Tag Name:', type: 'text', required: true }
        ],
        title: "tags"
      },
      //       "MENU-040": {
      //       fields:[	           
      //       { key: 'category_name', label: 'Parent Category Name', type: 'text', required: false },
      //       { key: 'category_img', label: 'Images', type: 'image', required: false },
      // ],
      // title:"Parent Category"
      //     }
      //      ,
      //      "MENU-041": {
      //       fields:[	
      //         { key: 'sub_category', label: 'Sub Category Name', type: 'text', required: false },  
      //       {
      //   key: 'parent_category',
      //   label: 'Select Parent Category',
      //   type: 'multi-select',
      //   options: []
      // },    

      //       { key: 'image_data', label: 'Image', type: 'image', required: false },
      //        { "key": "start_date", "label": "Start Date", "type": "date", "required": false, "placeholder": "dd-mm-yyyy" },
      //     { "key": "end_date", "label": "End Date", "type": "date", "required": false, "placeholder": "dd-mm-yyyy" },
      //       { key: 'description', label: 'Description', type: 'textarea', required: false },
      // ],
      // title:"Sub Category"
      //     },
      "MENU-003_Feedback": {
        fields: [
          { key: 'sys_date', label: 'Date:', type: 'text', required: true, readonly: true },

          {
            key: 'call_type',
            label: 'Call Type:',
            type: 'select',
            required: true,
            options: []
          },
          { key: 'response', label: 'Response:', type: 'text', required: true },
          {
            key: 'client_label',
            label: 'Client Status:',
            type: 'select',
            required: true,
            options: []
          }
        ],
        title: "Feedback"
      }

      // ,"MENU-042": {
      //       fields:[	
      //         { key: 'sub_category', label: 'Sub Category Name', type: 'text', required: false },           
      //       { key: 'parent_category', label: 'Parent Category', type: 'text', required: true },
      //       { key: 'image_data', label: 'Image', type: 'image', required: false },
      //        { "key": "created_date", "label": "Start Date", "type": "date", "required": false, "placeholder": "dd-mm-yyyy" },
      //     { "key": "last_update", "label": "End Date", "type": "date", "required": false, "placeholder": "dd-mm-yyyy" },
      //       { key: 'description', label: 'Description', type: 'textarea', required: false },
      // ],
      // title:"Parent Category"
      //     },

      , "MENU-042": {
        fields: [
          { key: 'sub_category_name', label: 'Sub Category Name', type: 'text', required: true },
          {
            key: 'parent_category_id',
            label: 'Select Parent Category',
            type: 'multi-select',
            options: [],
            require: true
          },

          { key: 'sub_category_image', label: 'Image', type: 'image', required: true },
          { "key": "start_date", "label": "Start Date", "type": "date", "required": false, "placeholder": "dd-mm-yyyy" },
          { "key": "end_date", "label": "End Date", "type": "date", "required": false, "placeholder": "dd-mm-yyyy" },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
        ],
        title: "Sub Category"
      },

      "MENU-028_SMS": {
        fields: [
          { key: 'full_name', label: 'Name:', type: 'text', required: false, readonly: true },
          { key: 'mobile_no', label: 'Mobile Number:', type: 'mobile', required: true, readonly: true },

          {
            key: 'template',
            label: 'Select Template:',
            type: 'select',
            required: true,
            options: [],
          },
          { key: 'message', label: 'Message:', type: 'ckeditor', required: true }
        ],
        title: "Registered Card - Send SMS"
      },
      "MENU-028_EMAIL": {
        fields: [
          // { key: 'first_name', label: 'Name:', type: 'text', required: false  ,readonly:true},
          { key: 'email_id', label: 'Email ID:', type: 'email', required: true, readonly: true },
          {
            key: 'template',
            label: 'Email Subject:',
            type: 'text',
            required: false

          },
          { key: 'message', label: 'Email Body:', type: 'ckeditor', required: true }
        ],
        title: "Registered Card - Send Email"
      },
      "MENU-029_SMS": {
        fields: [
          { key: 'full_name', label: 'Name:', type: 'text', required: false, readonly: true },
          { key: 'mobile_no', label: 'Mobile Number:', type: 'mobile', required: true, readonly: true },
          {
            key: 'template',
            label: 'Select Template:',
            type: 'select',
            required: true,
            options: []
          },
          { key: 'message', label: 'Message:', type: 'ckeditor', required: true }
        ],
        title: "Archived Card - Send SMS"
      },
      "MENU-029_EMAIL": {
        fields: [
          // { key: 'first_name', label: 'Name:', type: 'text', required: false },
          { key: 'email_id', label: 'Email ID:', type: 'email', required: true, readonly: true },
          {
            key: 'template',
            label: 'Email Subject:',
            type: 'text',          // was 'select'
            required: false
          },
          { key: 'message', label: 'Email Body:', type: 'ckeditor', required: true }
        ],
        title: "Archived Card - Send Email"
      },
      "MENU-029_Change_Password": {
        fields: [
          { key: 'full_name', label: 'Name:', type: 'text', required: false },
          { key: 'email_id', label: 'Email ID1:', type: 'email', required: false, disabled: true },
          { key: 'template', label: 'New Password1:', type: 'password', required: false },
        ],
        title: "Archived Card - Send Email"
      },
      "MENU-029": {
        fields: [
          { key: 'first_name', label: 'First Name:', type: 'text', required: true, readonly: true },
          { key: 'last_name', label: 'Last Name:', type: 'text', required: true, readonly: true },
          { key: 'gender', label: 'Gender:', type: 'text', required: true, readonly: true },
          { key: 'dob', label: 'DOB:', type: 'text', required: true, readonly: true },
          { key: 'mobile_no', label: 'Mobile:', type: 'mobile', required: true, readonly: true },
          { key: 'email_id', label: 'Email:', type: 'email', required: true, readonly: true },
          { key: 'company_name', label: 'Company Name:', type: 'text', required: true, readonly: true },
          { key: 'designation', label: 'Designation:', type: 'text', required: true, readonly: true },
          { key: 'user_address', label: 'Address Info:', type: 'text', required: true, readonly: true },
          { key: 'package_id', label: 'Package Name:', type: 'text', required: true, readonly: true }
        ],
        title: "Archived_View"
      }, "MENU-028_NewPassword": {
        fields: [
          { key: 'full_name', label: 'Name', type: 'text', required: false, readonly: true },
          { key: 'email_id', label: 'Email', type: 'email', required: false, readonly: true },
          { key: 'new_password', label: 'New Password', type: 'password', required: false },
          // { key: 'user_code', label: 'User Code:', type: 'select', required: false ,visibility:false}

        ],
        title: "New Password",
      },
      "MENU-028_NewEmail": {
        fields: [
          { key: 'full_name', label: 'Name', type: 'text', required: false, readonly: true },
          { key: 'email_id', label: 'Email', type: 'email', required: false, readonly: true },
          { key: 'new_email', label: 'New Email', type: 'email', required: false },
          // { key: 'user_code', label: 'User Code:', type: 'select', required: false ,visibility:false}

        ],
        title: "New Email",
      },
      "MENU-046": {
        fields: [
          { key: 'ad_mcategoryname', label: 'Page Name', type: 'text', required: true }
        ],
        title: "Page Category",
      }
      /////////////////////////for oracle start/////////////
      , "MENU-040": {
        fields: [
          { key: 'category_name', label: 'Parent Category Name', type: 'text', required: true },
          // { key: 'category_image', label: 'Images', type: 'image', required: false },
          { key: 'category_image', label: 'Images', type: 'image', required: true },

        ],
        title: "Parent Category"
      }
      , "MENU-041": {
        fields: [
          { key: 'sub_category_name', label: 'Sub Category Name', type: 'text', required: true },
          {
            key: 'parent_category_id',
            label: 'Select Parent Category',
            type: 'multi-select',
            options: [],
            required: true
          },

          { key: 'sub_category_image', label: 'Image', type: 'image', required: true },
          { "key": "start_date", "label": "Start Date", "type": "date", "required": false, "placeholder": "dd-mm-yyyy" },
          { "key": "end_date", "label": "End Date", "type": "date", "required": false, "placeholder": "dd-mm-yyyy" },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
        ],
        title: "Sub Category"
      },
      "MENU-056": {
        fields: [
          { key: 'parent_profession_label', label: 'Occupation Name:', type: 'text', required: true }
        ],
        title: "Profession label"
      },
      "MENU-057": {
        fields: [
          { key: 'icon_name', label: 'Icon Name', type: 'text', required: true },
          { key: 'icon_image', label: 'Image:', type: 'image', required: true }
        ],
        title: "FontAwesome"
      }
      ///////////////////////for oracle end/////

    }
  parentlist: any;
  user_name_admin!: any;
  loadingPop: any;
  public backIcon = 'arrow-back-outline';
  private lastActualWidth: number = 0;
  private userManuallyToggled: boolean = false;

  private sidebarToggleSource = new BehaviorSubject<boolean>(false);
  sidebarToggle$ = this.sidebarToggleSource.asObservable();

  constructor(private seo: Seo, @Inject(PLATFORM_ID) private platformId: Object,
  private loginService: Login,  private router: Router,   ) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.history.push(event.urlAfterRedirects);
        // console.log("history "+isString(this.history)+this.history);
        if (this.history) {
          if (this.history.length > 1) {
            this.setDataLocally("history_data", JSON.stringify(this.history));
          }
        }
        if (this.history && this.history.length < 2) {
          let hdata: any = this.getLocallData("history_data");
          let hdta: any = JSON.parse(hdata);
          if (hdta && hdta.length > 1) {
            console.log(hdta);
            this.history = hdta;
            console.log(this.history);
          }
        }
      });



    // if (isPlatformBrowser(this.platformId)) {
    //   this.sidebarToggleSource = new BehaviorSubject<boolean>(window.innerWidth <= 768);
    //   this.sidebarToggle$ = this.sidebarToggleSource.asObservable();
    //   this.initResizeListener();
    // }

    if (isPlatformBrowser(this.platformId)) {
      // ✅ ye line add karo
      this.lastActualWidth = Math.round(window.outerWidth / (window.devicePixelRatio || 1));

      // ye already hai
      this.sidebarToggleSource = new BehaviorSubject<boolean>(window.innerWidth <= 768);
      this.sidebarToggle$ = this.sidebarToggleSource.asObservable();
      this.initResizeListener();
    }






  }

  // loadStatesForMenu(menuCode: string, fieldKey: string) {
  //   this.loginService.getStatesList().subscribe((res: any) => {
  //     const formFields = this.formsObj[menuCode]?.fields;
  //     const field = formFields?.find((f: { key: string; }) => f.key === fieldKey);

  //     if (field) {
  //       const responseData = res?.data ?? []; // Safe fallback to []

  //       field.options = responseData.map((item: any) => ({
  //         label: item.state_name || item.label || item.name || 'N/A',
  //         value: item.state_name || item.value || item.name || 'N/A'
  //       }));
  //     }
  //   }, (error) => {
  //     console.error("Failed to load states:", error);
  //   });
  // }

  loadStatesForMenu(menuCode: string, key: string) {
    const wslpData = this.getLocallData("appDetails");

    const reqData = {
      wslp: wslpData ? JSON.parse(wslpData) : {},
      wsdp: {
        geo_type: 'ST',
        serviceType: menuCode
      }
    };

    this.loginService.postData(reqData, "getStateList").subscribe((res: any) => {
      if (res?.responseStatus === 'success' && res.responseData?.length) {
        const states = res.responseData.map((item: any) => ({
          value: item.geo_code,
          label: item.geo_name
        }));

        // Attach options to the correct form field
        const formFields = this.formsObj[menuCode].fields;
        const field = formFields.find((f: any) => f.key === key);
        if (field) field.options = states;
      }
      console.log("this is ifoffline");
    });
  }

  // countries: string[] = [];
  //   states: string[] = [];
  //   cities: string[] = [];
  scrollSection(id: any): void {
    const footerElement = document.getElementById(id);
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  }


  setDataLocally(key: string, value: any): void {

    if (!isPlatformBrowser(this.platformId)) return;

    const data = typeof value === 'string' ? value : JSON.stringify(value);
    // const platform = Capacitor.getPlatform();

    // if (platform === 'android' || platform === 'ios') {
    //   localStorage.setItem(key, data);
    // } else {
      sessionStorage.setItem(key, data);
      console.log("setDataLocally" + key + " : " + data);
    // }
  }


  getImageSrc(image: string | null | undefined): string {
    if (!image) {
      return 'assets/header/PROFILE.png';
    }
    if (
      image.startsWith('http') ||
      image.startsWith('https') ||
      image.startsWith('assets/') ||
      image.startsWith('/')
    ) return image;

    if (image.startsWith('data:image')) return image;

    return `data:image/png;base64,${image}`;
  }
  getImageSrcActiveTemplate(image: string | null | undefined): string {
    if (!image) {
      return 'assets/header/PROFILE.png';
    }
    if (
      image.startsWith('http') ||
      image.startsWith('https') ||
      image.startsWith('assets/')
      // ||image.startsWith('/')
    ) return image;

    if (image.startsWith('data:image')) return image;

    return `data:image/png;base64,${image}`;
  }


  // getChildParentTeamTypeGl(menu_code?: any) {
  //   let team_perm_flag = true
  //   let team_perm_data: any = {
  //     team_perm_flag: team_perm_flag,
  //     team_type: ''
  //   }
  //   if (this.team_parent_child_value == 'child' || !this.team_parent_child_value) {
  //     const wslpData = this.getLocallData("appDetails");
  //     const wslp = wslpData ? JSON.parse(wslpData) : null;
  //     let reqData: any
  //     if (menu_code) {
  //       reqData = {
  //         wslp: wslp,
  //         wsdp: { menu_code: menu_code }
  //       };
  //     } else {
  //       reqData = {
  //         wslp: wslp,
  //       };
  //     }
  //     // console.log("getChildParent req :", reqData);
  //     this.loginService.postData(reqData, "getchildparent").subscribe(
  //       (res: any) => {
  //         // console.log("getChildParent response :", res);
  //         if (res?.responseStatus?.toLowerCase() === 'success' && res.responseData) {
  //           const teamData = res.responseData;
  //           // console.log(
  //           //   "Detected team type :",teamData
  //           // );
  //           if (teamData.team_type && teamData.team_type == 'parent') {
  //             this.team_parent_child_value == 'parent'
  //             team_perm_flag = true;
  //             // team_perm_flag:team_perm_flag,
  //             team_perm_data.team_perm_flag = team_perm_flag;
  //             team_perm_data.team_type = this.team_parent_child_value;
  //             return team_perm_data;
  //           } else if (teamData.team_type && teamData.team_type == 'child') {
  //             this.team_parent_child_value == 'child'
  //             if (teamData.team_flag && teamData.team_flag == 'true') {
  //               team_perm_flag = true;
  //               //  alert("true"+this.team_perm_flag);
  //             } else {
  //               team_perm_flag = false;
  //               alert("false" + team_perm_flag);
  //               //  return team_perm_flag;
  //             }
  //             team_perm_data.team_perm_flag = team_perm_flag;
  //             team_perm_data.team_type = this.team_parent_child_value;
  //             return team_perm_data;
  //           }
  //         }
  //       },
  //       (err) => {
  //         console.error("getChildParent API error", err);
  //       }
  //     );

  //   } else {
  //     if (this.team_parent_child_value && this.team_parent_child_value == 'parent') {
  //       // alert('parent')
  //       team_perm_flag = true;
  //       //  return team_perm_flag;
  //       team_perm_data.team_perm_flag = team_perm_flag;
  //       team_perm_data.team_type = this.team_parent_child_value;
  //       return team_perm_data;

  //     } else {
  //       // alert('child');
  //     }
  //   }
  // }

  // getChildParentTeamTypeGlobal(callback: (flag: any) => void): void {
  //   // const wslpData = this.getLocallData("appDetails");

  //   let temp_user = this.getLocallData("template_user");

  //   let wslpData = temp_user ? temp_user : this.getLocallData("appDetails");

  //   const wslp = wslpData ? JSON.parse(wslpData) : null;

  //   const reqData: any = {
  //     wslp: wslp,
  //     wsdp: {}
  //   };

  //   // console.log("getChildParent req :", reqData);

  //   this.loginService.postData(reqData, "getchildparent").subscribe(
  //     (res: any) => {
  //       // console.log("getChildParent response :", res);

  //       if (
  //         res?.responseStatus?.toLowerCase() === 'success' &&
  //         res.responseData
  //       ) {
  //         const teamData = res.responseData;

  //         if (teamData.team_type === 'parent') {
  //           this.team_parent_child_value = 'parent';
  //           callback('true');
  //         } else {
  //           this.team_parent_child_value = 'child';
  //           callback('false');
  //         }
  //       } else {
  //         callback('true');
  //       }
  //     },
  //     (err) => {
  //       console.error("getChildParent API error", err);
  //       callback('true');
  //     }
  //   );
  // }


  // loadDynamicSelectOptions(key: any, fieldKey: string): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this.loginService.getParentList().subscribe({
  //       next: (res: any) => {
  //         const formFields = this.formsObj[key]?.fields;
  //         const field = formFields?.find((f: { key: string }) => f.key === fieldKey);

  //         const responseData = res ?? [];

  //         const options = responseData.map((item: any) => ({
  //           parent_category_code: item.category_name || 'N/A',
  //           entry_rowid_seq: item.entry_rowid_seq || 'N/A'
  //         }));

  //         this.parentlist = options;

  //         if (field) {
  //           field.options = options;
  //         }

  //         resolve(options); // resolve the promise with the options
  //       },
  //       error: (err) => {
  //         console.error("Failed to load parent categories:", err);
  //         reject(err); // reject the promise if error occurs
  //       }
  //     });
  //   });
  // }
  // loadSubCategoryOptions(menuCode: string, fieldKey: string, parentVal: string): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this.loginService.getSubCategories(parentVal).subscribe(
  //       (res: any[]) => {
  //         // console.log("loadSubCategoryOptions ----->", res);

  //         const fields = this.formsObj[menuCode]?.fields;
  //         const field = fields?.find((f: { key: string; }) => f.key === fieldKey);
  //         if (field) {
  //           field.options = res.map(item => ({
  //             label: item.sub_category,
  //             value: item.sub_category
  //           }));
  //         }
  //         resolve(res);
  //       },
  //       err => {
  //         console.error('Failed to load sub-categories', err);
  //         reject(err);
  //       }
  //     );
  //   });
  // }



  getLocallData(key: any) {
    // Return null when not running in a browser (SSR / server)
    if (!isPlatformBrowser(this.platformId)) return null;

    // const platform = Capacitor.getPlatform();

    // if (platform === 'android' || platform === 'ios') {
    //   return localStorage.getItem(key);
    // }

    return sessionStorage.getItem(key);


  }
  removeLocalData(key: any) {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      sessionStorage.removeItem(key);
    } catch (e) { }
    try {
      localStorage.removeItem(key);
    } catch (e) { }
  }

  // async deletePOP(){

  //   new Promise((resolve,reject) => {
  //     let model  = modalController.create()

  //     model.onD.the(res => {
  //         resolve(res)
  //     })
  //   })

  // }


  // destroyLocalData(key: string) {
  //   if (!isPlatformBrowser(this.platformId)) return;
  //   const platform = Capacitor.getPlatform();

  //   if (platform === 'android' || platform === 'ios') {
  //     return localStorage.removeItem(key);
  //   }

  //   return sessionStorage.removeItem(key);
  // }
  clearLocalData() {
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      sessionStorage.clear();
    } catch (e) { }
    try {
      localStorage.clear();
    } catch (e) { }
    // setTimeout(() => {
    //   window.location.reload();
    // }, 0);
  }
  //////////////////////////////////////////////////////////// get data save data////////////////////////////

  // getDetail(operateData:any) {
  //   let wslpData: any = this.getLocallData("appDetails");
  //   let resData:any;
  //   let wsdp = {
  //     serviceType: operateData.service_type
  //   }
  //   let reqData: any = {
  //     wsdp: wsdp,
  //     wslp: wslpData ? JSON.parse(wslpData) : {}
  //   };


  //   this.loginService.postData(reqData, "gettemplateData").subscribe(
  //     (res) => {
  //       if (res?.responseStatus?.includes('success')) {
  //       resData=res.responseData;
  //       return resData;
  //       } else {
  //       }
  //     },
  //     (err) => {
  //     }
  //   );
  // }







  async getDetail(operateData: any): Promise<any> {
    let wslpData: any = this.getLocallData("appDetails");
    if (!wslpData) {
      wslpData = this.getLocallData("tempDetails");
    }
    let wsdp = {
      serviceType: operateData.service_type
    };

    let reqData: any = {
      wsdp: wsdp,
      wslp: wslpData ? JSON.parse(wslpData) : {}
    };

    try {
      const res = await firstValueFrom(this.loginService.postData(reqData, "gettemplateData"));
      if (res?.responseStatus?.includes('success')) {
        return res.responseData;
      } else {
        // handle failure case
        return null;
      }
    } catch (err) {
      // handle error
      console.error("Error in getDetail:", err);
      return null;
    }
  }

  // async addDetail(dataDetails: any, operateData: any, url?: any) {
  //   // console.log("Details ", dataDetails);
  //   let resData: any
  //   /////////////removing <p> tag from cke editor//////
  //   // const plainText = this.ckeDescription?this.ckeDescription.replace(/<[^>]+>/g, ''):"";
  //   // this.dataDetails.long_desc = plainText;
  //   ////////////////////
  //   let wsdp: any = dataDetails;
  //   let wslpData: any = this.getLocallData("appDetails");
  //   // wslpData.serviceType="template_business";
  //   let reqData: any = {};
  //   reqData = {
  //     wsdp: wsdp,
  //     wslp: wslpData ? JSON.parse(wslpData) : {}
  //   };

  //   reqData.wsdp.serviceType = operateData.service_type;
  //   if (operateData.operateMode == "update") {
  //     operateData.operateMode = "";
  //     reqData.wsdp.operation_mode = "update";
  //   } else if (operateData.operateMode == "delete") {
  //     operateData.operateMode = "";
  //     reqData.wsdp.operation_mode = "delete";
  //   } else {
  //     operateData.operateMode = "";
  //     reqData.wsdp.operation_mode = "save";
  //   }
  //   // this.loginService.postData(reqData, "operateData").subscribe(
  //   //   (res) => {
  //   //     if (res?.responseStatus?.includes('success')) {
  //   //       // this.tableDataList = res.responseData;
  //   //     //  tableDataList = res.responseData;
  //   //     //   // console.log(this.tableDataList[0].service_image1);
  //   //     //   for(let tableData of tableDataList){
  //   //     //     tableData.product_image1="data:image/png;base64,"+tableData.product_image1
  //   //     //     tableData.product_image2="data:image/png;base64,"+tableData.product_image2
  //   //     //   }
  //   //     resData=res.responseData;
  //   //     return resData;

  //   //     } else {
  //   //     }
  //   //   },
  //   //   (err) => {
  //   //   }
  //   // );
  //   try {
  //     let urldata = "operateData";
  //     if (url) {
  //       urldata = url;
  //     }
  //     const res = await lastValueFrom(this.loginService.postData(reqData, urldata));
  //     if (res?.responseStatus?.includes('success')) {
  //       this.checkToast(reqData.wsdp.operation_mode);
  //       return res.responseData;
  //     } else {
  //       return null;
  //     }
  //   } catch (err) {
  //     console.error("Error in postDetail:", err);
  //     return null;
  //   }
  //   // return resData;
  // }


  // checkToast(operation?: string) {
  //   if (operation === 'delete') {
  //     this.toastr.error("Deleted Successfully");
  //   } else if (operation === 'update') {
  //     this.toastr.success("Updated successfully");
  //   } else if (operation == 'operateDataAdmin') {
  //     this.toastr.success("Template update sucessfulley", "Success");
  //   } else {
  //     this.toastr.success("Saved successfully");
  //   }


  // }




  editData(dataDetails: any, operateMode: any, data: any) {
    operateMode.operateMode = "update";
    // dataDetails = data;
    Object.assign(dataDetails, data);
    dataDetails.sr_no = data.sr_no;
    // console.log(dataDetails);
  }
  deleteData(dataDetails: any, operateMode: any, data: any) {
    operateMode.operateMode = "delete";
    // Object.assign(dataDetails, data);
    dataDetails.sr_no = data.sr_no;
    // console.log(dataDetails);
  }





  selectedCountry = '';
  selectedState = '';
  // onCountryChange() {
  //   let states: any;
  //   this.loginService.getStates(this.selectedCountry).subscribe((res: any) => {
  //     states = res.data.states.map((s: any) => s.name);
  //     // this.cities = [];
  //     // this.selectedState = '';
  //   });
  //   return states;
  // }

  // onStateChange() {
  //   let cities: any;
  //   this.loginService.getCities(this.selectedCountry, this.selectedState).subscribe((res: any) => {
  //     cities = res.data;
  //   });
  //   return cities;
  // }




  // getCountryList() {
  //   let countries: string[] = [];

  //   this.loginService.getCountries().subscribe((res: any) => {
  //     countries = res.data.map((c: any) => c.name);
  //   });
  //   return countries;
  // }


  /////////////////////////////temperory dropdownlist///////////////






  socailLinkIconList: any = [
    {
      key: "linkedin",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/linkedin.png",
      template_icon: this.assetsUrl + "/templates_pcard/template_one/img/linkedin.png"
    },
    {
      key: "facebook",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/facebook.png",
      template_icon: this.assetsUrl + "/templates_pcard/template_one/img/facebook.png"
    },
    {
      key: "instagram",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/instagram.png",
      template_icon: this.assetsUrl + "\templates_pcard\template_one\img\fa-instagram.png"
    },
    {
      key: "pinterest",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/pinterest.png",
      template_icon: this.assetsUrl + "\templates_pcard\template_one\img\fa-instagram.png\fa-pinterest.png"
    },
    {
      key: "reddit",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/reddit.png",
      template_icon: this.assetsUrl + "\templates_pcard\template_one\img\fa-reddit.png"
    },
    {
      key: "tumblr",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/tumblr.png",
      template_icon: this.assetsUrl + "\templates_pcard\template_one\img\fa-instagram.png\fa-tumblr.png"
    },
    {
      key: "twitter",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/twitter.png",
      template_icon: this.assetsUrl + "/templates_pcard/template_one/img/twitter.png"
    },
    {
      key: "whatsapp",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/whatsapp.png",
      template_icon: this.assetsUrl + "/templates_pcard/template_one/img/whatsapp.png"
    },
    {
      key: "dribble",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/dribbble.png",
      template_icon: this.assetsUrl + "/templates_pcard/template_one/img/dribbble.png"
    },
    {
      key: "youtube",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/youtube.png",
      template_icon: this.assetsUrl + "/templates_pcard/template_one/img/youtube.png"
    },
    {
      key: "behance",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/behance.png",
      template_icon: this.assetsUrl + "/templates_pcard/template_one/img/behance.png"
    },
    {
      key: "justdial",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/justdial.png",
      template_icon: this.assetsUrl + "/templates_pcard/template_one/img/fa-justdial.png"
    },
    {
      key: "indiamart",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/indiamart.png",
      template_icon: this.assetsUrl + "/templates_pcard/template_one/img/fa-indiamart.png",
    },
    {
      key: "googlemybusiness",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/googlebusiness.png",
      template_icon: this.assetsUrl + "/templates_pcard/template_one/img/googlebusiness.png",
    },
    {
      key: "globe",
      keytype: "image",
      value: "",
      app_icon: this.assetsUrl + "/templates_pcard/template_one/img/Globe.png",
      template_icon: this.assetsUrl + "/templates_pcard/template_one/img/Globe.png",
    },





  ]
  otherLinkDataList: any = [
    {
      key: "PDF",
      keytype: "image",
      value: this.assetsUrl + "/other-links/pdf.png"
    },
    {
      key: "Link",
      keytype: "image",
      value: this.assetsUrl + "/other-links/link.png"
    },
    {
      key: "Website",
      keytype: "image",
      value: this.assetsUrl + "/other-links/website.png"
    },
    {
      key: "Word File",
      keytype: "image",
      value: this.assetsUrl + "/other-links/word.png"
    }
  ]
  /////////////////////////////////////////////////logout
  // async onLogOut() {








  /////////////////////////////////////add update delete global function////////
  //operation mode save,update,delete only.
  // async operateService(dataDetails: any, service_type: any, operation_mode: any, url?: any, data?: any) {
  //   let wsdp: any = dataDetails;
  //   // let wslpData: any = this.getLocallData("appDetails");

  //   let temp_user = this.getLocallData("template_user");

  //   let wslpData = temp_user ? temp_user : this.getLocallData("appDetails");

  //   let reqData: any = {};
  //   reqData = {
  //     wsdp: wsdp,
  //     wslp: wslpData ? JSON.parse(wslpData) : {}
  //   };
  //   reqData.wsdp.serviceType = service_type;
  //   reqData.wsdp.operation_mode = operation_mode;

  //   try {
  //     let urldata = "operateData";
  //     if (url) {
  //       urldata = url;
  //     }
  //     const res = await lastValueFrom(this.loginService.postData(reqData, urldata));
  //     if (res.responseStatus && res?.responseStatus?.includes('success')) {

  //       //  this.checkToast(reqData.wsdp.operation_mode);
  //       if (service_type && service_type != 'user_saved_image') {
  //         if (reqData.wsdp.operation_mode === 'delete') {
  //           this.presentToast("Deleted Successfully ", 'bottom');
  //         }
  //         else {
  //           this.presentToast("Saved Successfully ", 'bottom');
  //         }
  //       }
  //       // return res.responseData;
  //       return res;

  //     } else {
  //       return null;
  //     }
  //   } catch (err) {
  //     console.error("Error in postDetail:", err);
  //     return null;
  //   }
  //   // return resData;
  // }

 

  async msgBox(data: any) {

  }

  


  async hideLoading() {
    if (this.loadingPop) {
      // console.log(this.loadingPop);
      await this.loadingPop.dismiss();
      this.loadingPop = null;
    }
  }




  // async showLoading() {
  //   this.loadingPop = await this.loadingCtrl.create({
  //     cssClass: 'custom_loading_spiner',
  //     id: 'load'
  //   });

  //   // this.loadingPop.present();
  //   await this.loadingPop.present();

  // }

  // async presentToast(msg: any, position: 'top' | 'middle' | 'bottom') {
  //   const toast = await this.toastController.create({
  //     header: 'Success',
  //     message: msg,
  //     duration: 1500,
  //     position: 'bottom',
  //     cssClass: 'toast_success',
  //     icon: 'checkmark',
  //     animated: true,
  //     mode: 'ios',



  //   });

  //   await toast.present();
  // }


  // async presentToast1(msg: any, position: 'top' | 'middle' | 'bottom') {
  //   const toast = await this.toastController.create({
  //     header: 'Error',
  //     message: msg,
  //     duration: 1500,
  //     position: 'bottom',
  //     cssClass: 'toast_success',
  //     icon: 'checkmark',
  //     animated: true,
  //     mode: 'ios',



  //   });

  //   await toast.present();
  // }









  // async redpresentToast(msg: any, position: 'top' | 'middle' | 'bottom') {
  //   const toast = await this.toastController.create({
  //     header: 'Error',
  //     message: msg,
  //     duration: 1500,
  //     position: 'bottom',
  //     cssClass: 'toast_error',
  //     icon: 'checkmark',
  //     animated: true,
  //     mode: 'ios',



  //   });

  //   await toast.present();
  // }





  validateEmail(emailData: any): any {
    // this.emailError = '';
    // this.emailValid = false;
    let resdata: any = {
      response: false,
      message: ''
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailData?.trim()) {
      // this.emailError = 'Email is required';
      // return;
      resdata.response = false;
      resdata.message = 'Email is required'
    }

    else if (!emailPattern.test(emailData.trim())) {
      // this.emailError = 'Invalid email format';
      resdata.response = false;
      resdata.message = 'Invalid email format'
    }
    else {
      resdata.response = true;
      resdata.message = 'Valid email'
    }
    // this.emailValid = true;
    // this.emailError = 'Valid email ✓';
    return resdata;
  }





 

  validatePincode(pincodeData: any): any {
    let resdata: any = {
      response: false,
      message: ''
    };

    if (!pincodeData || !pincodeData.trim()) {
      resdata.response = false;
      resdata.message = 'Pincode is required';
      return resdata;
    }

    const value = pincodeData.trim();

    const internationalPattern = /^[a-zA-Z0-9\s-]{3,10}$/;

    if (!internationalPattern.test(value)) {
      resdata.response = false;
      resdata.message = 'Invalid pincode';
    } else {
      resdata.response = true;
      resdata.message = 'Valid pincode';
    }

    return resdata;
  }
  // Mobile validation: Indian +91 country code + 10 digits
  validateMobile(mobileValue: any): any {
    let mobileError = '';
    // this.mobileValid = false;
    let response: any = false;
    let resdata: any = {
      response: false,
      message: ''
    }
    const cleanedMobile = mobileValue.replace(/[\s\-+]/g, '');
    let mobileToValidate = cleanedMobile;
    const mobilePattern = /^[6-9]\d{9}$/;

    if (cleanedMobile.startsWith('91') && cleanedMobile.length === 12) {
      mobileToValidate = cleanedMobile.substring(2);
    }
    if (!mobileValue?.trim()) {
      mobileError = 'Mobile number is required';
      response = false;
      resdata.response = false;
      resdata.message = 'Mobile number is required'
      // return mobileError;
    }

    else if (!mobilePattern.test(mobileToValidate)) {
      mobileError = 'Invalid mobile. Must be 10 digits starting with 6-9';
      response = false;
      resdata.response = false;
      resdata.message = 'Invalid mobile. Must be 10 digits starting with 6-9'
      // return mobileError;
    } else {
      response = true;
      resdata.response = true;
      // resdata.message='Valid mobile.'
    }

    // this.mobileValid = true;
    return resdata;
  }





  // Password validation: min 8 chars, 1 uppercase, 1 special char, 1 digit
  validatePassword(data: any): any {
    let resdata: any = {
      response: false,
      message: ''
    }
    // this.passwordError = '';
    // this.passwordValid = false;

    if (!data) {
      // this.passwordError = 'Password is required';
      resdata.response = false;
      resdata.message = 'Password is required'
      // return;
    }

    else if (data.length < 8) {
      // this.passwordError = 'Password must be at least 8 characters long';
      resdata.response = false;
      resdata.message = 'Password must be at least 8 characters long'
      // return;
    }

    else if (!/[A-Z]/.test(data)) {
      // this.passwordError = 'Password must contain at least one uppercase letter';
      resdata.response = false;
      resdata.message = 'Password must contain at least one uppercase letter'
      // return;
    }
    else if (!/[a-z]/.test(data)) {
      // this.passwordError = 'Password must contain at least one uppercase letter';
      resdata.response = false;
      resdata.message = 'Password must contain at least one small letter'
      // return;
    }
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data)) {
      // this.passwordError = 'Password must contain at least one special character';
      resdata.response = false;
      resdata.message = 'Password must contain at least one special character'
      // return;
    }

    else if (!/\d/.test(data)) {
      // this.passwordError = 'Password must contain at least one number';
      resdata.response = false;
      resdata.message = 'Password must contain at least one number'
      // return;
    }
    else {
      resdata.response = true;
      // resdata.message='Strong password Valid';
    }
    return resdata;
    // this.passwordValid = true;
    // this.passwordError = 'Strong password ✓';
  }
  getwslpDataParentUser() {
    // let wslp=this.getLocallData("appDetails");

    // let wslpData: any = this.getLocallData("appDetails");

    let temp_user = this.getLocallData("template_user");

    let wslpData = temp_user ? temp_user : this.getLocallData("appDetails");

    let resWslp = wslpData;
    let wslp: any = wslpData ? JSON.parse(wslpData) : {}
    if (wslp && wslp?.parent_code) {
      wslp.user_code = wslp.parent_code;
      resWslp = JSON.stringify(wslp);
    } return resWslp;


  }
  // onDismissEditCardServices(model: any, data: any) {
  //   if (model == "popover") {
  //     this.modalCtrl.dismiss(data)
  //   } else {
  //     this.location.back()
  //   }

  // }






  toggleSidebar() {
    this.userManuallyToggled = true;
    this.sidebarToggleSource.next(!this.sidebarToggleSource.value);
  }

  resetToggle() {
    this.sidebarToggleSource.next(false);
  }


  closeSidebar() {
    this.sidebarToggleSource.next(true);
  }

  openSidebar() {
    this.sidebarToggleSource.next(false);
  }
  // ✅ Zoom proof actual width
  private getActualWidth(): number {
    const dpr = window.devicePixelRatio || 1;
    return Math.round(window.outerWidth / dpr);
  }

  initResizeListener() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.lastActualWidth = this.getActualWidth();

    window.addEventListener('resize', () => {
      const actualWidth = this.getActualWidth();
      if (actualWidth === this.lastActualWidth) return;
      this.lastActualWidth = actualWidth;

      if (this.userManuallyToggled) return;
      if (actualWidth <= 768) {
        this.sidebarToggleSource.next(true);
      } else {
        this.sidebarToggleSource.next(false);
      }
    });
  }

  // initResizeListener() {
  //   if (!isPlatformBrowser(this.platformId)) return;
  //   window.addEventListener('resize', () => {
  //     if (window.innerWidth <= 768) {
  //       this.sidebarToggleSource.next(true);
  //     } else {
  //       this.sidebarToggleSource.next(false);
  //     }
  //   });
  // }



  private loginToggleSource = new BehaviorSubject<boolean>(false);
  loginToggle$ = this.loginToggleSource.asObservable();


  toggleLogin() {
    this.loginToggleSource.next(true);
  }

  resetLoginToggle() {
    this.loginToggleSource.next(false);
  }

  // this is for login page end


  /* searchbar toggle service*/
  private searchToggleSource = new BehaviorSubject<boolean>(false);
  searchbarToggle$ = this.searchToggleSource.asObservable();

  toggleSearchbar() {
    this.searchToggleSource.next(true)
  }
  resetSearchToggle() {
    this.searchToggleSource.next(false);
  }

  setMetaTags(profile: any, templateUrl: string, seoImage: string, keywords: string, description: string, seo_profile: any,seoTitle:any) {
    let fullName = `${profile.first_name} ${profile.last_name}`
    let seoHeading = seoTitle ? seoTitle : fullName
    console.log(fullName)
    this.seo.setTitle(seoHeading);
    // Prefer seoImage, else profile.image, else fallback
    // let imageUrl = seo_profile.image || profile.image ;
    let imageUrl: any;
    if (seo_profile?.image) {
      imageUrl = seo_profile.image;
    } else if (profile.image) {
      imageUrl = profile.image;
    } else {
      imageUrl = this.assetsUrl+"/header/PROFILE.png";
    }
    console.log(imageUrl)
    // let seoImageUrl1 = seoImage || imageUrl;
    let seoImageUrl: any = "";
    if (seoImage) {
      seoImageUrl = seoImage;
    } else if (imageUrl) {
      seoImageUrl = seoImage;
    }

    // const platform = Capacitor.getPlatform();
    // const ogType = (platform === 'android' || platform === 'ios') ? 'profile' : 'website';
    this.seo.setMeta({
      ogType: "android",
      ogDescription: `${profile.designation} | ${profile.company_name}`,
      ogTitle: `${profile.first_name} ${profile.last_name}`,
      ogImage: imageUrl,
      ogUrl: templateUrl,
      description: description,
      keywords: keywords
      // seoTitle : seoTitle
    });
    console.log(":++++++++++++++++++++++++++"+profile.first_name )
    this.seo.setCanonical(templateUrl);

    // Update favicon dynamically
    this.seo.updateFavicon(seoImageUrl);


  }
  //   setMetaTags(profile: any, templateUrl: string, seoImage: string, keywords: string, description: string) {
  //     const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim();
  //     const titleText = fullName || profile?.company_name || 'Profile';
  //     const roleText = [profile?.designation, profile?.company_name].filter(Boolean).join(' | ');
  //     const metaDescription = description;

  //     this.seo.setTitle(titleText);

  //     // Prefer seoImage, else profile.image, else fallback
  //     const imageUrl = seoImage || profile?.image || 'assets/Image.webp';
  //     let finalImageUrl = imageUrl;
  //     try {
  //       if (imageUrl && !/^https?:\/\//i.test(imageUrl) && templateUrl) {
  //         const base = new URL(templateUrl);
  //         finalImageUrl = new URL(imageUrl, base.origin).toString();
  //       }
  //     } catch {
  //       finalImageUrl = imageUrl;
  //     }
  //     const imageAlt = titleText || 'Profile image';

  //     this.seo.setMeta({
  //       description: metaDescription,
  //       keywords: keywords,
  //       ogTitle: titleText,
  //       ogDescription: metaDescription,
  //       ogImage: finalImageUrl,
  //       ogImageAlt: imageAlt,
  //       ogUrl: templateUrl,
  //       ogType: 'profile',
  //       twitterCard: 'summary_large_image',
  //       twitterTitle: titleText,
  //       twitterDescription: metaDescription,
  //       twitterImage: finalImageUrl
  //     });
  //     this.seo.setCanonical(templateUrl);

  //     // Update favicon dynamically (browser only)
  //     if (!isPlatformServer(this.platformId)) {
  //       this.seo.updateFavicon(finalImageUrl);
  //     }


  // }









  back() {
    this.history.pop(); // remove current route
    const previousUrl = this.history.pop();
    if (previousUrl && previousUrl.includes("/admin/dashboard")) {
      this.back_dashobardMenu = true;
    }
    this.setDataLocally("history_data", JSON.stringify(this.history));
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
    } else {
      this.router.navigate(['/dashboard']); // fallback
    }

  }

  getBaseUrl(): string {
    if (!isPlatformBrowser(this.platformId)) return '';
    return window.location.origin;
  }

  getLoginUrl(): string {
    return `${this.getBaseUrl()}/`;
  }

 



}



