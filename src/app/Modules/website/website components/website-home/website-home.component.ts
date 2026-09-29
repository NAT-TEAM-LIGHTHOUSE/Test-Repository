import { Component, OnDestroy, OnInit, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';
// import { Login } from '../../../../services/login';
import { Navigation, Autoplay } from 'swiper/modules';
import { Login } from '../../../../services/login';
import { RouterLink } from '@angular/router';
import { Globalobjects } from '../../../../services/globalobjects';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
// import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

@Component({
  selector: 'app-website-home',
  templateUrl: './website-home.component.html',
  styleUrls: ['./website-home.component.scss'],
  standalone: true,
  imports: [CommonModule , RouterLink]
})
export class WebsiteHomeComponent implements OnInit, OnDestroy {

   services = [
    { title: 'Personilized Link', image: '/assets/website-images/about/abt-1.webp' },
    { title: 'QR code Standee', image: '/assets/website-images/about/abt-2.webp' },
    { title: 'Chip Enabled smart card', image: '/assets/website-images/about/abt-3.webp' },
    { title: 'Interractive Mobile Application', image: '/assets/website-images/about/abt-4.webp' },
    { title: 'Free Social Media Post in the application', image: '/assets/website-images/about/abt-5.webp' }
  ];

  activeIndex = 0;
  intervalId: any;
  websiteUrl: any;





  constructor(
    public globalObject : Globalobjects,private loginService: Login,private cdr : ChangeDetectorRef,
    private websiteSeoSyncService: WebsiteSeoSyncService,
    @Inject(PLATFORM_ID) private platformId: Object,
    // private transferState: TransferState
  ) { 
    // this.canonical.();
  }

  ngOnInit(): void {
    this.websiteUrl = this.globalObject.websiteUrl;
    // alert(this.websiteUrl + "/login")
    this.loadBlogcategory();
    this.websiteSeoSyncService.applySeoByPageName('Home');

    if (isPlatformBrowser(this.platformId)) {
      this.startAutoSlide();
    }
    this.loadTestimonials();


  }






  startAutoSlide() {
  this.intervalId = setInterval(() => {
    this.activeIndex = (this.activeIndex + 1) % this.services.length;
      this.cdr.detectChanges(); // Trigger change detection to update the view
  }, 3000);
}




  onHover(index: number) {
  this.activeIndex = index;   
  clearInterval(this.intervalId); 
}

onLeave() {
  this.startAutoSlide(); 
}


  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      clearInterval(this.intervalId);
    }
  }
  stars = Array(5);

  testimonials: any[] = [];



loadTestimonials(): void {
    this.loginService.getWebsiteData('testimonial').subscribe({
  // this.loginService.getWebsiteData('testimonial').subscribe({
    next: (res: any) => {
      // console.log('testimonials res: ', res);

      if (res.responseStatus === 'success') {
        const body = res.responseData as any[];

        this.testimonials = body.map(t => ({
          entry_rowid_seq: t.entry_rowid_seq,
          title_name: t.title_name,
          description: t.description,
          designation: t.designation,

          // ✅ BASE64 IMAGE HANDLING
          image: t.profile_img
            ? `${t.profile_img}`
            : '/assets/website-images/testimonial/default.png'
        }));
      }
    },
    error: err => console.error('Error fetching testimonials: ', err)
  });
}


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Wait for Swiper to be available with retry logic
      this.waitForSwiper();
    }
  }

  private waitForSwiper(attempt: number = 0): void {
    if (typeof Swiper !== 'undefined') {
      this.initializeSwipers();
    } else if (attempt < 10) {
      // Retry up to 10 times (1 second total)
      setTimeout(() => this.waitForSwiper(attempt + 1), 100);
    } else {
      console.error('Swiper library failed to load after multiple attempts');
    }
  }

  private initializeSwipers(): void {
    if (typeof Swiper === 'undefined') {
      console.warn('Swiper not loaded yet');
      return;
    }

    Swiper.use([Navigation, Autoplay]);

    setTimeout(() => {
      new Swiper('.soon_Swiper', { /* existing config */ });
    });

    setTimeout(() => {
      new Swiper('.testimonial_Swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,

        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          320: { slidesPerView: 1, spaceBetween: 10 },
          576: { slidesPerView: 1, spaceBetween: 15 }
        }
      });
    });
  }

    blogs: any[] = [];

  loadBlogcategory(): void {
  this.loginService.getWebsiteData('blogcategory').subscribe({
    next: (res: any) => {
      // console.log('blogs res: ', res);

      if (res.responseStatus && res.responseStatus.includes('success')) {
        const body = res.responseData as any[];

        // this.blogs = body.map((b: any) => ({
        //   image: b.ad_mcategoryimg
        //     ? `data:image/jpeg;base64,${b.ad_mcategoryimg}`
        //     : '/assets/website-images/blog/default.png',
        //   title: b.ad_mcategoryname,
        //   slug: b.slug_name
        // }));
        this.blogs = body.map((b: any) => ({
          image: b.ad_mcategoryimg
            ? `${b.ad_mcategoryimg}`
            : '/assets/website-images/blog/default.png',
          title: b.ad_mcategoryname,
          slug: b.slug_name,
          url:b.pcardurl
        }));
         this.cdr.markForCheck();
        // console.log(this.blogs);
      }
    },
    error: (err) => {
      console.error('Error fetching blogs: ', err);
    }
  });
}
  // gotoWebsite() {
  //   window.location.href = this.websiteUrl + "/login"
    
  // }


  gotoWebsite() {
  window.location.href = this.globalObject.urlNew + '/login';
}

}






