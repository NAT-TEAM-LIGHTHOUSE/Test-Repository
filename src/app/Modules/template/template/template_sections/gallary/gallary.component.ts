import { Component, OnInit, Input, CUSTOM_ELEMENTS_SCHEMA, PLATFORM_ID, Inject } from '@angular/core';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { Globalobjects } from '../../../../../services/globalobjects';
import { Fancybox } from "@fancyapps/ui/dist/fancybox/";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Globalobjects } from '../../../../../services/globalobjects';
import { Login } from '../../../../../services/login';
import { VideoComponent } from '../video/video.component';
// import { applyLoggingDecorator } from 'src/app/loggingDescorator';
declare var $: any;

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule , VideoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GallaryComponent implements OnInit {
  // videoUrl: string = 'https://youtu.be/EEPhVuaa__U?si=NlJ7WkzXu5NXU3DH'; // or .mp4 file
  video_list: any = [];
  @Input() template_type: any;
  @Input() data: any;
  @Input() data2: any;
  @Input() card_heading_bg: any;
  @Input() gallary_div: any;
  @Input() styletype: any;
  @Input() video: any;
 @Input() user_template: any;
  

  


  videoOperatedata: any = {
    service_type: "gallary_video",
    operateMode: ""
  }
  card2textcolour: any;
  profile_back_image: any;
  card2bgcolour: any;
  card1bgcolour: any;
  card1textcolour: any;
     bodybgcolour: any;
  bodytextcolour: any;


  ngAfterViewInit(): void {
    // Fancybox Config (Gallary)
    Fancybox.bind('[data-fancybox="gallery"]', {
      buttons: [
        "slideShow",
        "thumbs",
        "zoom",
        "fullScreen",
        "share",
        "close"
      ],
      loop: false,
      protect: true
    } as any);

  }

  constructor(private sanitizer: DomSanitizer, public globalObject: Globalobjects, public loginService: Login, @Inject(PLATFORM_ID) private platformId: Object) {

  }

  ngOnInit() {

    // this.getvideoDetail();
    // this.getDetail();
     console.log(this.video)


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
  activeTab: 'photo' | 'video' = 'photo';
  switchTab(tab: 'photo' | 'video') {
    this.activeTab = tab;
  }




  tableDataList: any = [];
  //////////////////////////////////////////////////image//////////////////////////
  getDetail() {
    let wslpData: any = this.globalObject.getLocallData("appDetails");

    let wsdp = {
      serviceType: "gallary_image"
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
            tableData.image_data = this.globalObject.getImageSrc(tableData.image_data);
            // tableData.product_image2="data:image/png;base64,"+tableData.product_image2
          }


        } else {
        }
      },
      (err) => {
      }
    );
  }
  ////////////////////////////////////////////////////////////////////////////////
  // isYoutube(url: string): boolean {
  //   return url.includes('youtube.com') || url.includes('youtu.be');
  // }

  // getSafeYoutubeUrl(url: string): SafeResourceUrl {
  //   const videoId = this.extractYouTubeVideoId(url);
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(
  //     `https://www.youtube.com/embed/${videoId}`
  //   );
  // }
  // extractYouTubeVideoId(url: string): string {
  //   const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/;
  //   const match = url.match(regex);
  //   return match ? match[1] : '';
  // }


  ////////////
  isEmbedLink(url: string): boolean {
    return !this.isDirectVideo(url);
  }

  isDirectVideo(url: string): boolean {
    return (
      url.endsWith('.mp4') ||
      url.endsWith('.webm') ||
      url.endsWith('.ogg') ||
      url.endsWith('.mov') ||
      url.endsWith('.m3u8') ||
      url.endsWith('.avi')
    );
  }
  private extractYouTubeId(url: string): string {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }
  private extractVimeoId(url: string): string {
    const regex = /vimeo\.com\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }
  getSafeEmbedUrl(url: string): SafeResourceUrl {
    let embedUrl = url;

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = this.extractYouTubeId(url);
      embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('vimeo.com')) {
      const videoId = this.extractVimeoId(url);
      embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }


    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
  async getvideoDetail() {
    let resData = await this.globalObject.getDetail(this.videoOperatedata);
    this.video_list = resData;
    // console.log(this.video_list);
  }

// ---------------------- for show more btn logic gallery( show only 3 rows)-------
  showAllGallery = false;

getGalleryLimit(): number {
    if (!isPlatformBrowser(this.platformId)) {
    return 6;
  }
  if (window.innerWidth >= 992) {
    return this.video?.flag > 0 ? 12 : 18;
  } else if (window.innerWidth >= 768) {
    return 12;
  } else if (window.innerWidth >= 576) {
    return 9;
  } else {
    return 6;
  }
}
}
