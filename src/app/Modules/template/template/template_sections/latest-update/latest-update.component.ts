import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  EventEmitter,
  Output,
  NgZone,
  PLATFORM_ID,
  Inject,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Globalobjects } from '../../../../../services/globalobjects';

declare var bootstrap: any;

@Component({
  selector: 'app-latest-update',
  templateUrl: './latest-update.component.html',
  styleUrls: ['./latest-update.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LatestUpdateComponent implements OnInit, AfterViewInit {

  @Input() template_type: any;
  @Input() data: any;
  @Input() data2: any;
  @Input() card_heading_bg: any;
  @Input() latest_update_quotes: any;
  @Input() styletype: any;
  @Input() other_business_h2: any;
  @Input() latest_update_card_divs: any;
    @Input() link_btn_latest_other_business_hover: any;
   @Input() user_template: any;

  @Output() dataEvent = new EventEmitter<string>();
  @Output() modalState = new EventEmitter<'open' | 'close'>();

  @ViewChildren('descRef') descRefs!: QueryList<ElementRef>;

  showReadMore: boolean[] = [];
hoveredIndex: number | null = null;
  card2textcolour: any;
  card2bgcolour: any;
  card1textcolour: any;
  bodybgcolour: any;
  card1bgcolour: any;
  isHover: boolean = false;
  hover = false;
  isHovered: boolean[] = [];

  swiperInstance: any;
  bodytextcolour: any;

  private resizeTimeout: any;
  private lastLoopState: boolean | null = null;

  constructor(
    private ngZone: NgZone,
    public globalObject: Globalobjects,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (this.data2) {
      const d = this.data2?.data?.[0];
      if (d) {
        this.card2textcolour = d.card_text_color2;
        this.card2bgcolour = d.card_back_color2;
        // this.card1textcolour = d.card_text_color1;
        this.bodybgcolour = d.back_body_color;
        // this.card1bgcolour = d.card_background_color1;
        this.bodytextcolour = d.body_text_color;

           if(this.template_type === 'layout7' || this.template_type === 'layout8' || this.template_type === 'layout9') {
    this.card1textcolour = this.user_template?.data[0]?.card_text_color1 ? this.user_template?.data[0]?.card_text_color1 : d?.card_text_color1;
    this.card1bgcolour =  this.user_template?.data[0]?.card_background_color1 ? this.user_template?.data[0]?.card_background_color1 : d?.card_background_color1;
    } else {
      this.card1textcolour =  d?.card_text_color1;
    this.card1bgcolour =   d?.card_background_color1;
    }

      }
    }
    this.isHovered = new Array(this.data?.data?.length || 0).fill(false);
    console.log(this.data)
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.initBootstrapCarousel();

    setTimeout(() => {
      this.checkOverflow();
      this.initSwiper();
    }, 500);
  }

  // 🔥 LOOP CONTROL (MAIN FIX)
  shouldEnableLoop(): boolean {
    if (!this.data?.data) return false;

    const totalSlides = this.data.data.length;

    let slidesPerView = 1;

    if (window.innerWidth >= 1150) {
      slidesPerView = 3;
    } else if (window.innerWidth >= 800) {
      slidesPerView = 2;
    }

    return totalSlides > slidesPerView;
  }

  // -------- SWIPER ---------
  initSwiper() {
    if (!isPlatformBrowser(this.platformId)) return;

    const swiperElement = document.querySelector('.latest-update-swiper-new');
    if (!(swiperElement instanceof HTMLElement)) return;

    Swiper.use([Autoplay, Navigation, Pagination]);

    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }

    const loopState = this.shouldEnableLoop();
    this.lastLoopState = loopState;

    this.swiperInstance = new Swiper(swiperElement, {
      observer: false,
      observeParents: false,

      slidesPerView: 1,
      spaceBetween: 0,
      grabCursor: true,

      loop: loopState, // ✅ FIXED

      watchOverflow: true,

      autoplay: loopState ? {
        delay: 6000,
        disableOnInteraction: false,
      } : false,

      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },

      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 20 },
        800: { slidesPerView: 2, spaceBetween: 20 },
        992: { slidesPerView: 2, spaceBetween: 0 },
        1150: { slidesPerView: 3, spaceBetween: 0 },
      },

      on: {
        init: (swiper: any) => {
          this.handleSwiperState(swiper);
          this.centerIfFewSlides(swiper);
        },
        breakpoint: (swiper: any) => {
          this.centerIfFewSlides(swiper);
        }
      }
    });

    this.swiperInstance.update();
  }

  // -------- CENTER LOGIC ---------
  centerIfFewSlides(swiper: any) {
    if (!swiper?.wrapperEl) return;

    const totalSlides = swiper.slides.length;

    let slidesPerView = swiper.params.slidesPerView;

    if (typeof slidesPerView !== 'number') {
      slidesPerView = swiper.currentBreakpoint
        ? swiper.params.breakpoints[swiper.currentBreakpoint]?.slidesPerView
        : 1;
    }

    const shouldCenter = totalSlides <= slidesPerView;

    const currentJustify = swiper.wrapperEl.style.justifyContent;

    if (shouldCenter && currentJustify !== 'center') {
      swiper.wrapperEl.style.display = 'flex';
      swiper.wrapperEl.style.justifyContent = 'center';
    } 
    else if (!shouldCenter && currentJustify !== '') {
      swiper.wrapperEl.style.justifyContent = '';
    }
  }

  // -------- CONTROL VISIBILITY ---------
  handleSwiperState(swiper: any) {
    const isLocked = swiper.isLocked;

    const next = document.querySelector('.swiper-button-next') as HTMLElement;
    const prev = document.querySelector('.swiper-button-prev') as HTMLElement;
    const pagination = document.querySelector('.swiper-pagination') as HTMLElement;

    if (isLocked) {
      if (next) next.style.display = 'none';
      if (prev) prev.style.display = 'none';
      if (pagination) pagination.style.display = 'none';

      swiper.autoplay?.stop();
    } else {
      if (next) next.style.display = 'flex';
      if (prev) prev.style.display = 'flex';
      if (pagination) pagination.style.display = 'block';

      swiper.autoplay?.start();
    }
  }

  private initBootstrapCarousel(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const carousels = document.querySelectorAll('.common-carousel');
    if (!carousels.length || typeof bootstrap === 'undefined') return;

    carousels.forEach((carouselEl: Element) => {
      const carousel = new bootstrap.Carousel(carouselEl, {
        pause: 'hover',
        wrap: true,
        touch: true
      });

      carouselEl.addEventListener('slid.bs.carousel', () => {
        setTimeout(() => {
          this.checkOverflow();
        }, 500);
      });
    });
  }

  // -------- READ MORE LOGIC ---------
  checkOverflow(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    requestAnimationFrame(() => {
      if (!this.descRefs || this.descRefs.length === 0) return;

      this.showReadMore = [];

      this.descRefs.forEach((el, index) => {
        const element = el.nativeElement as HTMLElement;

        if (element.offsetParent === null) {
          this.showReadMore[index] = false;
          return;
        }

        const computedStyle = window.getComputedStyle(element);
        const lineHeight = parseFloat(computedStyle.lineHeight);

        const maxLines = 4;
        const maxHeight = lineHeight * maxLines;

        this.showReadMore[index] = element.scrollHeight > maxHeight + 1;
      });
    });
  }

  @HostListener('window:resize')
  onResize() {
    clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(() => {
      this.checkOverflow();

      if (!this.swiperInstance) return;

      const newLoopState = this.shouldEnableLoop();

      // 🔥 ONLY re-init when loop changes
      if (this.lastLoopState !== newLoopState) {
        this.initSwiper();
        return;
      }

      this.swiperInstance.update();

      if (this.swiperInstance.pagination) {
        this.swiperInstance.pagination.destroy();
        this.swiperInstance.pagination.init();
        this.swiperInstance.pagination.update();
      }

    }, 250);
  }

  latest_popup(data?: any) {
    if (data) {
      data.modal_type = 'old-update';
    }
    this.dataEvent.emit(data);
  }

  latest_popup_new(data?: any) {
    this.modalState.emit('open');

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = scrollbarWidth + 'px';
    }

    data.modal_type = 'Modal7';
    this.dataEvent.emit({ ...data });
  }

  pauseSwiper() {
    if (this.swiperInstance) {
      this.swiperInstance.autoplay?.stop();
      this.swiperInstance.allowTouchMove = false;
      this.swiperInstance.enabled = false;
    }
  }

  resumeSwiper() {
    if (this.swiperInstance) {
      this.swiperInstance.enabled = true;
      this.swiperInstance.update();
      this.swiperInstance.allowTouchMove = true;
      this.swiperInstance.autoplay?.start();
    }
  }

  updatepopup(data?: any) {
    this.dataEvent.emit(data);
  }
}