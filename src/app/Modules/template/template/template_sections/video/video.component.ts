import {
  Component,
  OnInit,
  Input,
   AfterViewInit,
   HostListener,
  ViewChild,
  ElementRef,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonIcon } from '@ionic/angular/standalone';
import { DomSanitizer } from '@angular/platform-browser';
// import { applyLoggingDecorator } from 'src/app/loggingDescorator';
import { Globalobjects } from '../../../../../services/globalobjects';
import { environment } from '../../../../../../environments/environment';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VideoComponent implements OnInit {
  @Input() template_type: any;
  @Input() data: any;
  @Input() data2: any;
  @Input() card_heading_bg: any;
  @Input() styletype: any;
  @Input() videos_outer_div: any;
  @Input() gallery: any;
 @Input() user_template: any;
  card2textcolour: any;
  card2bgcolour: any;
  card1textcolour: any;
  card1bgcolour: any;
  bodybgcolour: any;
  bodytextcolour: any;

  mainVideoUrl: any;
  allThumbnails: any[] = [];
  activeIndex: number = 0;

public assetsUrl = environment.assetUrl + "/assets";
    // ---- for see more btn----
  showAllThumbnails = false;
isOverflowing = false;

// ------------------ for THUMBNAIL OVERFLOW ----------------
  @ViewChild('thumbnailContainer')
thumbnailContainer!: ElementRef;


  constructor(
    private sanitizer: DomSanitizer,
    private globalObject: Globalobjects,
  ) {
    // if(this.globalObject.isTemplate){
    //   return applyLoggingDecorator(this,"video-component")
    // }
  }

  ngOnInit() {
    console.log(this.gallery);

    if (this.data2) {
      // this.card1textcolour = this.data2?.data[0].card_text_color1;
      this.card2textcolour = this.data2?.data[0].card_text_color2;
      this.card2bgcolour = this.data2?.data[0].card_back_color2;
      // this.card1bgcolour = this.data2?.data[0].card_background_color1;
      this.bodybgcolour = this.data2?.data[0].back_body_color;
      this.bodytextcolour = this.data2?.data[0].body_text_color;

         if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = this.user_template?.data[0]?.card_text_color1 ? this.user_template?.data[0]?.card_text_color1 : this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =  this.user_template?.data[0]?.card_background_color1 ? this.user_template?.data[0]?.card_background_color1 : this.data2?.data[0]?.card_background_color1;
    } else {
      this.card1textcolour =  this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =   this.data2?.data[0]?.card_background_color1;
    }
    }

    this.loadVideos();
  }


  // ------------------ CHECK FOR THUMBNAIL OVERFLOW ----------------

visibleThumbs = 0;


@HostListener('window:resize')
onResize() {
  this.checkThumbnailOverflow();
}


checkThumbnailOverflow() {
  const el = this.thumbnailContainer?.nativeElement;

  if (!el) return;

  const thumbWidth = 80;
  const gap = 10;
  const buttonWidth = 80;

  const itemsPerRow = Math.floor(el.offsetWidth / (thumbWidth + gap));

  // Space reserved for button
  const buttonSlots = Math.ceil((buttonWidth + gap) / (thumbWidth + gap));

  this.visibleThumbs = Math.max(1, itemsPerRow - buttonSlots);

  this.isOverflowing = this.allThumbnails.length > this.visibleThumbs;
}



 // ---------------- PREPARE VIDEOS ----------------

loadVideos() {
  this.allThumbnails = [];

  this.data.data.forEach((video: any) => {

    // Safe embed url (works for YouTube, Facebook, Instagram, Vimeo etc.)
    const embedUrl = video.safeUrl
      ? video.safeUrl
      : this.updateUrl(video.video_url);

    // Default thumbnail image
       let thumbnail = this.assetsUrl + "/templates_pcard/template_seven/video-thumbnail.PNG";

    // YouTube thumbnail generation
    if (
      video.video_url?.includes('youtube.com') ||
      video.video_url?.includes('youtu.be')
    ) {
      const videoId = this.extractVideoId(video.video_url);

      if (videoId) {
        thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
      }
    }

    // Override with API thumbnail if available
    if (video.thumbnail) {
      thumbnail = video.thumbnail;
    }

    // Override with thumbnails array if available
    if (video.thumbnails?.length) {
      thumbnail = video.thumbnails[0];
    }

    // Final fallback
    if (!thumbnail || thumbnail.trim() === '') {
       thumbnail = this.assetsUrl + "/templates_pcard/template_seven/video-thumbnail.PNG";
    }

    this.allThumbnails.push({
      embedUrl: embedUrl,
      thumbnail: thumbnail,
      videoUrl: video.video_url,
    });
  });

  console.log('FINAL VIDEOS:', this.allThumbnails);

  // Default main video
  if (this.allThumbnails.length) {
    this.mainVideoUrl = this.allThumbnails[0].embedUrl;
  }

  // ------------------ CHECK FOR THUMBNAIL OVERFLOW ----------------
    setTimeout(() => {
    this.checkThumbnailOverflow();
  }, 200);

}

  // ---------------- EXTRACT YOUTUBE VIDEO ID ----------------

  extractVideoId(url: string): string {
    if (!url) return '';

    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;

    const match = url.match(regExp);

    return match ? match[1] : '';
  }

  // ------------- for video show in div (NEW TEMPLATES LOGIC) -------

  updateUrl(url: any) {
    // console.log(this.sanitizer.bypassSecurityTrustResourceUrl(url))
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // ---------------- MOBILE VIDEO CHANGE ----------------

  changeVideo(video: any, videoData: any, index: number) {
    video.activeIndex = index;

    video.safeUrl = videoData.embedUrl;
  }

  // ---------------- DESKTOP VIDEO CHANGE ----------------

  changeMainVideo(video: any, index: number) {
    this.activeIndex = index;

    this.mainVideoUrl = video.embedUrl;
  }
}