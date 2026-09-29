import { Component, OnInit, Input, AfterViewInit, NgZone, PLATFORM_ID, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// import { IonIcon } from '@ionic/angular/standalone';
import { Globalobjects } from '../../../../../services/globalobjects';
// import { STANDALONE_IMPORTS } from 'src/app/shared/ionic.imports';
// import { applyLoggingDecorator } from 'src/app/loggingDescorator';
// import { Globalobjects } from '../../../../../services/globalobjects';





@Component({
  selector: 'app-other-businesses',
  templateUrl: './other-businesses.component.html',
  styleUrls: ['./other-businesses.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})



export class OtherBusinessesComponent implements OnInit , AfterViewInit{
  @Input() template_type: any;
  @Input() data: any;
  @Input() data2: any;
  @Input() card_heading_bg: any;
  @Input() other_business_h2: any;
  @Input() other_business_visit_btn: any;
  @Input() styletype:any;
  @Input() otherbusiness_card_divs :any;
  @Input() link_btn_latest_other_business_hover: any;
  @Input() user_template: any;
resizeHandler!: () => void;



  isHover: boolean = false;
   hover = false;
   isHovered: boolean[] = [];
  swiper: any;
hoveredIndex: number | null = null;
  card2textcolour: any;
  card2bgcolour: any;
  card1textcolour: any;

  bodybgcolour: any;
  card1bgcolour: any;
  bodytextcolour: any;

  constructor(private ngZone: NgZone, public globalObject: Globalobjects, @Inject(PLATFORM_ID) private platformId: Object) {
    // if (this.globalObject.isTemplate) {
    //   return applyLoggingDecorator(this, "other-business-component")
    // }
  }

  ngOnInit() {
    // console.log(this.data)
    //   console.log(this.template_type)
     if(this.data2){
    // this.card1bgcolour = this.data2?.data[0].card_background_color1;
    this.bodybgcolour = this.data2?.data[0].back_body_color;
    this.card2textcolour = this.data2?.data[0].card_text_color2;
    this.card2bgcolour = this.data2?.data[0].card_back_color2;
    // this.card1textcolour = this.data2?.data[0].card_text_color1;
     this.bodytextcolour= this.data2?.data[0].body_text_color;

        if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = this.user_template?.data[0]?.card_text_color1 ? this.user_template?.data[0]?.card_text_color1 : this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =  this.user_template?.data[0]?.card_background_color1 ? this.user_template?.data[0]?.card_background_color1 : this.data2?.data[0]?.card_background_color1;
    } else {
      this.card1textcolour =  this.data2?.data[0]?.card_text_color1;
    this.card1bgcolour =   this.data2?.data[0]?.card_background_color1;
    }

  }
    this.isHovered = new Array(this.data?.data?.length || 0).fill(false);
}


ngAfterViewInit() {
  if (!isPlatformBrowser(this.platformId)) return;

  this.resizeHandler = this.handleSwiper.bind(this);

  setTimeout(() => {
    this.handleSwiper();
  }, 300); // ⚠️ 40000ms is too much, probably mistake

  window.addEventListener('resize', this.resizeHandler);
}

handleSwiper() {

  Swiper.use([Autoplay, Navigation]);

  const totalSlides = this.data?.data?.length || 0;

  if (window.innerWidth >= 768) {

    // determine slides per view based on breakpoint
    let slidesPerView = 2;
    if (window.innerWidth >= 1427) {
      slidesPerView = 3;
    }

    const isOverflow = totalSlides > slidesPerView;

    if (!this.swiper) {

      this.swiper = new Swiper('.other-business-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,

        autoplay: isOverflow ? {
          delay: 2500,
          disableOnInteraction: false,
        } : false,

        centeredSlides: false,
        grabCursor: true,

        loop: isOverflow,

        // navigation: isOverflow ? {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // } : false,

        navigation: {
  nextEl: '.swiper-button-next',
  prevEl: '.swiper-button-prev'
},

        breakpoints: {
      
          800: { slidesPerView: 2 },
          1150: { slidesPerView: 3 }
        },

        on: {
          init: (swiper: any) => {
            this.handleCenter(swiper, isOverflow);
          },
          breakpoint: (swiper: any) => {
            this.handleCenter(swiper, this.checkOverflow(swiper));
          }
        }
      });

      // 🔥 FIX: force correct state AFTER layout stabilizes
     requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    if (this.isSwiperReady(this.swiper)) {
      this.swiper.update();
      this.handleCenter(this.swiper, this.checkOverflow(this.swiper));
    }
  });
});

    } else {

      // 🔥 update existing swiper
      const newOverflow = totalSlides > slidesPerView;

      if (!this.isSwiperReady(this.swiper)) return;

      this.handleCenter(this.swiper, newOverflow);

      if (newOverflow) {
        this.swiper.autoplay?.start();
      } else {
        this.swiper.autoplay?.stop();
      }

      this.swiper.update();

      // 🔥 ALSO FIX during resize/update
      setTimeout(() => {
        if (this.isSwiperReady(this.swiper)) {
          this.swiper.update();
          this.handleCenter(this.swiper, this.checkOverflow(this.swiper));
        }
      }, 100);
    }

  } else {

    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }
}




handleCenter(swiper: any, isOverflow: boolean) {

  if (!this.isSwiperReady(swiper)) return;

  const next = document.querySelector('.other-business-swiper .swiper-button-next') as HTMLElement;
  const prev = document.querySelector('.other-business-swiper .swiper-button-prev') as HTMLElement;

  if (!isOverflow) {

    swiper.wrapperEl.style.display = 'flex';
    swiper.wrapperEl.style.justifyContent = 'center';

    // hide safely
    if (next) {
      next.style.opacity = '0';
      next.style.pointerEvents = 'none';
    }

    if (prev) {
      prev.style.opacity = '0';
      prev.style.pointerEvents = 'none';
    }

    swiper.allowTouchMove = false;
    swiper.autoplay?.stop();

  } else {

    swiper.wrapperEl.style.justifyContent = '';

    //  show safely
    if (next) {
      next.style.opacity = '1';
      next.style.pointerEvents = 'auto';
     
    }

    if (prev) {
      prev.style.opacity = '1';
      prev.style.pointerEvents = 'auto';
   
    }

    swiper.allowTouchMove = true;
    swiper.autoplay?.start();
  }
}

checkOverflow(swiper: any): boolean {
  if (!this.isSwiperReady(swiper)) return false;

  const totalSlides = swiper.slides.length;

  let slidesPerView = swiper.params.slidesPerView;

  if (typeof slidesPerView !== 'number') {
    slidesPerView = swiper.currentBreakpoint
      ? swiper.params.breakpoints[swiper.currentBreakpoint]?.slidesPerView
      : 1;
  }

  return totalSlides > slidesPerView;
}

private isSwiperReady(swiper: any): boolean {
  return !!swiper && !swiper.destroyed && !!swiper.wrapperEl;
}

 ngOnDestroy(): void {
  if (!isPlatformBrowser(this.platformId)) return;

  if (this.resizeHandler) {
    window.removeEventListener('resize', this.resizeHandler);
  }

  if (this.swiper) {
    this.swiper.destroy(true, true);
    this.swiper = null;
  }
}
}

