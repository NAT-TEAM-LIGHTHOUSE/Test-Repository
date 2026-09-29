import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Globalobjects } from '../../../../services/globalobjects';
import { register } from 'swiper/element/bundle';
import Swiper from 'swiper';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';

register();
@Component({
  selector: 'app-website-social-media-post',
  templateUrl: './website-social-media-post.component.html',
  styleUrls: ['./website-social-media-post.component.scss'],
  imports: [ RouterLink]
})
export class WebsiteSocialMediaPostComponent  implements OnInit {

  constructor(private websiteSeoSyncService: WebsiteSeoSyncService,public globalObject: Globalobjects) { }

  ngOnInit() {
    this.websiteSeoSyncService.applySeoByPageName('social-media-post');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      new Swiper('.testimonial_Swiper', {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        // loopedSlides: 3,
        speed: 800,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        centeredSlides: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          // 1280: {
          //   slidesPerView: 3,
          //   spaceBetween: 20,
          // }
        }
      });
    });


  }

   openWhatsApp(): void {
  window.open(
    'https://wa.me/919158883141',
    '_blank',
    'noopener,noreferrer'
  );
}
}
