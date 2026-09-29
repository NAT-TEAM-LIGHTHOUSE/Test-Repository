import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink,Router } from '@angular/router';
import { Globalobjects } from '../../../../services/globalobjects';
import { Login } from '../../../../services/login';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';


register();
@Component({
  selector: 'app-website-power-card',
  templateUrl: './website-power-card.component.html',
  styleUrls: ['./website-power-card.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  // providers: [DatePipe]
})
export class WebsitePowerCardComponent implements OnInit,OnDestroy {
  voicesMedia: { link: SafeResourceUrl }[] = [];

  ngAfterViewInit(): void {
      if (!isPlatformBrowser(this.platformId)) {
    return;
  }
    setTimeout(() => {
      new Swiper('.powerCard_Swiper', {
        slidesPerView: 1,
        spaceBetween: 5,
        centeredSlides: false,
        loop: true,
        freeMode: true,
        speed: 3000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        breakpoints: {

          600: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          // >= 985px
          985: {
            slidesPerView: 3,
            spaceBetween: 10,
          }
        }

      });
    });


    setTimeout(() => {
      new Swiper('.businessC_Swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          }
        }
      });
    });


    setTimeout(() => {
      new Swiper('.socialMedia_Swiper', {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        // loopedSlides: 3,
        speed: 1200,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        centeredSlides: false,
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          }
        }
      });
    });


    // setTimeout(() => {
    //   new Swiper('.voicesMedia_Swiper', {
    //     slidesPerView: 2,
    //     slidesPerGroup: 1,
    //     spaceBetween: 20,
    //     loop: true,
    //     loopedSlides: 2,
    //     speed: 1000,
    //     autoplay: {
    //       delay: 3000,
    //       disableOnInteraction: false,
    //     },


    //     breakpoints: {
    //       0: {
    //         slidesPerView: 2,
    //         spaceBetween: 15,
    //       },
    //       480: {
    //         slidesPerView: 2,
    //         spaceBetween: 15,
    //       },
    //       768: {
    //         slidesPerView: 3,
    //         spaceBetween: 20,
    //       },
    //       1024: {
    //         slidesPerView: 4,
    //         spaceBetween: 20,
    //       },
    //       1280: {
    //         slidesPerView: 5,
    //         spaceBetween: 20,
    //       }
    //     }
    //   });
    // });

 setTimeout(() => {
      new Swiper('.voicesMedia_Swiper', {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        // loopedSlides: 'auto',
        speed: 1200,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        centeredSlides: false,
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          }
        }
      });
    });



    setTimeout(() => {
      new Swiper('.pcardsGallery_Swiper', {
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        speed: 800,
        centeredSlides: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: true,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          }
        }
      });
    });


    setTimeout(() => {
      new Swiper('.benefits_Swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        speed: 1000,
        centeredSlides: false,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: true,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 1,
            spaceBetween: 20,
          }
        }
      });
    });

    setTimeout(() => {
      new Swiper('.testimonial_Swiper', {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        // loopedSlides: 4,
        speed: 1300,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        centeredSlides: false,
        grabCursor: true,
        simulateTouch: true,
        slideToClickedSlide: true,
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          }
        }
      });
    });


    setTimeout(() => {
      new Swiper('.blogs_Swiper', {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        // loopedSlides: 4,
        speed: 900,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        centeredSlides: false,
        grabCursor: true,
        simulateTouch: true,
        slideToClickedSlide: true,
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          601: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          }
        }
      });
    });
  }
  businessCard = [
    { title: 'Automotive & Mobility ', image: '/assets/website-images/about/cat-1.webp' },
    { title: 'Consultation', image: '/assets/website-images/about/cat-2.webp' },
    { title: 'Consumer Product', image: '/assets/website-images/about/cat-3.webp' },
    { title: 'Education', image: '/assets/website-images/about/cat-4.webp' },
    { title: 'Event & Exhibition', image: '/assets/website-images/about/cat-5.webp' },
    { title: 'Fashion & Lifestyle ', image: '/assets/website-images/about/cat-6.webp' },
    { title: 'Financial Institutions', image: '/assets/website-images/about/cat-7.webp' },
    { title: 'Food & Beverage', image: '/assets/website-images/about/cat-8.webp' },
    { title: 'Health & Fitness', image: '/assets/website-images/about/cat-9.webp' },
    { title: 'Home Decor & Interior', image: '/assets/website-images/about/cat-10.webp' },
    { title: 'Information Technology', image: '/assets/website-images/about/cat-11.webp' },
    { title: 'Jewellery', image: '/assets/website-images/about/cat-12.webp' },
    { title: 'Manufacturing', image: '/assets/website-images/about/cat-13.webp' },
    { title: 'Media & Entertainment', image: '/assets/website-images/about/cat-14.webp' },
    { title: 'Medical & Health care', image: '/assets/website-images/about/cat-15.webp' },
    { title: 'Political', image: '/assets/website-images/about/cat-16.webp' },
    { title: 'Professionals', image: '/assets/website-images/about/cat-17.webp' },
    { title: 'Real Estate', image: '/assets/website-images/about/cat-18.webp' },
    { title: 'Spa & Body Boutique', image: '/assets/website-images/about/cat-19.webp' },
    { title: 'Technology & Engineering', image: '/assets/website-images/about/cat-20.webp' },
  ]

  socialMedia = [
    {
      title: 'Mahashivratri', images: [
        '/assets/website-images/socialMedia/m-1.webp',
        '/assets/website-images/socialMedia/m-2.webp',
        '/assets/website-images/socialMedia/m-3.webp',
        '/assets/website-images/socialMedia/m-1.webp'
      ]
    },

    {
      title: 'B.R. Ambedkar Jayanti', images: [
        '/assets/website-images/socialMedia/add-1.webp',
        '/assets/website-images/socialMedia/add-2.webp',
        '/assets/website-images/socialMedia/add-3.webp',
        '/assets/website-images/socialMedia/add-4.webp'
      ]
    },
    {
      title: 'Cricket WorldCup', images: [
        '/assets/website-images/socialMedia/add-1-1.webp',
        '/assets/website-images/socialMedia/add-1-2.webp',
        '/assets/website-images/socialMedia/add-1-3.webp',
        '/assets/website-images/socialMedia/add-1-4.webp',

      ]
    },
    {
      title: 'Hanuman Jayanti', images: [
        '/assets/website-images/socialMedia/h1.webp',
        '/assets/website-images/socialMedia/h2.webp',
        '/assets/website-images/socialMedia/h3.webp',
        '/assets/website-images/socialMedia/h1.webp',
      ]
    },
    {
      title: 'Girl Child Day', images: [
        '/assets/website-images/socialMedia/g1.webp',
        '/assets/website-images/socialMedia/g2.webp',
        '/assets/website-images/socialMedia/g3.webp',
        '/assets/website-images/socialMedia/g1.webp',
      ]
    },

  ]
  pcardsGalley = [
    { title: 'pcards Images', image: '/assets/website-images/about/gallery-sreen1.webp' },
    { title: 'pcards Images', image: '/assets/website-images/about/gallery-sreen2.webp' },
    { title: 'pcards Images', image: '/assets/website-images/about/gallery-sreen3.webp' },
    { title: 'pcards Images', image: '/assets/website-images/about/gallery-sreen4.webp' },
    { title: 'pcards Images', image: '/assets/website-images/about/gallery-sreen5.webp' },
    { title: 'pcards Images', image: '/assets/website-images/about/gallery-sreen6.webp' },
    { title: 'pcards Images', image: '/assets/website-images/about/gallery-sreen1.webp' },
    { title: 'pcards Images', image: '/assets/website-images/about/gallery-sreen2.webp' },
    { title: 'pcards Images', image: '/assets/website-images/about/gallery-sreen3.webp' },
  ]
  benefits = Array(5);

  testiMonial1 = [
    { title: 'pcards Images', image: '/assets/website-images/testi-1.webp' },
    { title: 'pcards Images', image: '/assets/website-images/testi-2.webp' },
    { title: 'pcards Images', image: '/assets/website-images/testi-3.webp' },
    { title: 'pcards Images', image: '/assets/website-images/testi-4.webp' },
    { title: 'pcards Images', image: '/assets/website-images/testi-5.webp' },
  ]

  // blogs = [
  //   { 
  //     title: 'pcards Images', 
  //     image: '/assets/website-images/blog-1.jpg',
  //     desc: 'Simplify Your Digital Presence with PCARDS',
  //     date: 'May 19, 2024',
  //     more: 'Read More',
  //     icon: 'fa fa-arrow-right'
  //   },
  //   { 
  //     title: 'pcards Images', 
  //     image: '/assets/website-images/blog-2.jpeg',
  //     desc: 'WHAT IS PCARDS? HOW DO PCARDS WORK, AND WHERE CAN I USE THIS? ',
  //     date: 'May 19, 2024',
  //     more: 'Read More',
  //     icon: 'fa fa-arrow-right'
  //   },
  //   { 
  //     title: 'pcards Images', 
  //     image: '/assets/website-images/blog-3.jpeg',
  //     desc: '9 MOST ESSENTIAL WAYS TO DRIVE FROM STARTUP TO A GROWING BUSINESS ',
  //     date: 'May 19, 2024',
  //     more: 'Read More',
  //     icon: 'fa fa-arrow-right'
  //   },
  //   { 
  //     title: 'pcards Images', 
  //     image: '/assets/website-images/blog-4.jpeg',
  //     desc: 'WHY DIGITAL BUSINESS CARDS WIN OVER PAPER CARDS ',
  //     date: 'May 19, 2024',
  //     more: 'Read More',
  //     icon: 'fa fa-arrow-right'
  //   },
  //   { 
  //     title: 'pcards Images', 
  //     image: '/assets/website-images/blog-1.jpg',
  //     desc: 'Simplify Your Digital Presence with PCARDS',
  //     date: 'May 19, 2024',
  //     more: 'Read More',
  //     icon: 'fa fa-arrow-right'
  //   },
  //   { 
  //     title: 'pcards Images', 
  //     image: '/assets/website-images/blog-2.jpeg',
  //     desc: 'WHAT IS PCARDS? HOW DO PCARDS WORK, AND WHERE CAN I USE THIS? ',
  //     date: 'May 19, 2024',
  //     more: 'Read More',
  //     icon: 'fa fa-arrow-right'
  //   },
  //   { 
  //     title: 'pcards Images', 
  //     image: '/assets/website-images/blog-3.jpeg',
  //     desc: '9 MOST ESSENTIAL WAYS TO DRIVE FROM STARTUP TO A GROWING BUSINESS ',
  //     date: 'May 19, 2024',
  //     more: 'Read More',
  //     icon: 'fa fa-arrow-right'
  //   },
  //   { 
  //     title: 'pcards Images', 
  //     image: '/assets/website-images/blog-4.jpeg',
  //     desc: 'WHY DIGITAL BUSINESS CARDS WIN OVER PAPER CARDS ',
  //     date: 'May 19, 2024',
  //     more: 'Read More',
  //     icon: 'fa fa-arrow-right'
  //   }
  // ];




  blogs: any[] = [];
  testiMonial: any[] = [];


  constructor(private router : Router,public globalObject: Globalobjects, @Inject(PLATFORM_ID) private platformId: Object,private sanitizer: DomSanitizer, private loginService: Login, private websiteSeoSyncService: WebsiteSeoSyncService) {
    // this.canonical.setCanonicalUrl();
    // this.voicesMedia = [
    //   { link: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/SQW49qQ8Wi0') },
    //   { link: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/x1HgqBqLV7c') },
    //   { link: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/dQmi09YU8DI') },
    //   { link: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/30JHxvkzqaw') },
    //   { link: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/pbQxjLHp4Ao') },
    //   { link: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/SQW49qQ8Wi0') },
    //   { link: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/x1HgqBqLV7c') },
    // ];

  }
  ngOnInit(): void {
    this.websiteSeoSyncService.applySeoByPageName('Power card');
    this.loadBlogs();
    this.loadVoicesOfSatisfaction();

    // throw new Error('Method not implemented.');
  }


  ngOnDestroy(): void {
  }

  // website-power-card.component.ts
  selectedBlog: any | null = null;

  showBlogDetails(): void {
    this.loginService.getWebsiteData('blogs').subscribe({
      next: (res: any) => {
        // console.log('blogs res: ', res);

        if (res.responseStatus && res.responseStatus.includes('success')) {
          const body = res.responseData as any[];

          // take first blog (or find by entry_rowid_seq)
          const b = body[0]; // or body.find(x => x.entry_rowid_seq === 4)

          this.selectedBlog = {
            entry_rowid_seq: b.entry_rowid_seq,
            ad_blogname: b.ad_blogname,
            slug_name: b.slug_name,
            ad_blogimg_name: b.ad_blogimg_name,
            ad_blogimg: b.ad_blogimg
          };
        }
      },
      error: (err) => console.error('Error fetching blogs: ', err)
    });
  }

  loadBlogs(): void {
    this.loginService.getWebsiteData('blogs').subscribe({
      next: (res: any) => {
        // console.log('blogs res: ', res);

        if (res.responseStatus && res.responseStatus.includes('success')) {
          const body = res.responseData as any[];

          // this.blogs = body.map((b: any) => ({
          //   image: b.ad_blogimg
          //     ? `data:image/jpeg;base64,${b.ad_blogimg}`
          //     : '/assets/website-images/blog/default.png',

          //   title: b.ad_blogname,
          //   date: b.created_date
          // }));
          this.blogs = body.map((b: any) => ({
            image: b.ad_blogimg
              ? `${b.ad_blogimg}`
              : '/assets/website-images/blog/default.png',

            title: b.ad_blogname,
            date: b.created_date,
            slug_name : b.slug_name
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching blogs: ', err);
      }
    });
  }



  loadVoicesOfSatisfaction(): void {
    this.loginService.getWebsiteData('voiceofsatisfaction').subscribe({
      next: (res: any) => {
        // console.log('voiceofsatisfaction res: ', res);

        if (res.responseStatus && res.responseStatus.includes('success')) {
          const body = res.responseData as any[];

          // map backend URL to SafeResourceUrl
          this.voicesMedia = body.map((v: any) => ({
            link: this.sanitizer.bypassSecurityTrustResourceUrl(
              // backend gives "https://www.youtube.com/shorts/..." 
              this.toEmbedUrl(v.video_embeded_url)
            ),
          }));
        }
      },
      error: (err) => console.error('Error fetching voiceofsatisfaction: ', err),
    });
  }

  // helper: convert shorts/watch to embed URL
  private toEmbedUrl(url: string): string {
    if (!url) return '';
    // shorts -> embed
    if (url.includes('youtube.com/shorts/')) {
      const id = url.split('shorts/')[1]?.split('?')[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    // watch?v= -> embed
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    // otherwise use as is
    return url;
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     new Swiper('.blogs_Swiper', {
  //       slidesPerView: 4,
  //       slidesPerGroup: 1,
  //       spaceBetween: 20,
  //       loop: true,
  //       loopedSlides: 4,
  //       speed: 900,
  //       autoplay: {
  //         delay: 3000,
  //         disableOnInteraction: false,
  //       },
  //       centeredSlides: false,
  //       grabCursor: true,
  //       simulateTouch: true,
  //       slideToClickedSlide: true,
  //       breakpoints: {
  //         320: { slidesPerView: 1, spaceBetween: 10 },
  //         480: { slidesPerView: 1, spaceBetween: 15 },
  //         768: { slidesPerView: 4, spaceBetween: 20 },
  //         1024: { slidesPerView: 3, spaceBetween: 20 },
  //         1280: { slidesPerView: 4, spaceBetween: 20 }
  //       }
  //     });
  //   });
  // }



  openBlog(slug: string) {
    this.router.navigate([
      'blogs/Knowledge-Center-Read-More-Blog',
      slug
    ]);
  }

  openWhatsApp(): void {
  window.open(
    'https://wa.me/919158883141',
    '_blank',
    'noopener,noreferrer'
  );
}
}

