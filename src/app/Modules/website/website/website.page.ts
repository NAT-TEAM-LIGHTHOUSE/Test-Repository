import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  AfterViewInit
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { WebsiteHeaderComponent } from '../website components/website-header/website-header.component';
import { WebsiteFooterComponent } from '../website components/website-footer/website-footer.component';
import { WebsiteFooter2Component } from '../website components/website-footer2/website-footer2.component';
import { RecaptchaService } from '../../../services/recaptcha-service';


@Component({
  selector: 'app-website',
  templateUrl: './website.page.html',
  styleUrls: ['./website.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    WebsiteFooter2Component,
    RouterOutlet,
    WebsiteHeaderComponent,
    WebsiteFooterComponent
  ]
})
export class WebsitePage implements OnInit, AfterViewInit, OnDestroy {

  isScrolled = false;

  private isBrowser = false;
  private routerSub!: Subscription;
  private captchaTimer?: number;

  showFooter2 = false;
  footerStyleA = false;
  headerWidth = false;
  headerRouteMatch = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private recaptchaService: RecaptchaService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.scheduleCaptchaForRoute(event.urlAfterRedirects || '/');

        const container = document.getElementById('website-container');

        if (container) {
          container.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }

        const allowedRoutes = [
          '/digital/power-card',
          '/digital/digital-business-card',
          '/digital/mini-website',
          '/digital/social-media-post',
          '/digital/faq',
          '/digital/price'
        ];

        this.showFooter2 = allowedRoutes.includes(event.urlAfterRedirects);

        const styledRoutes = [
          '/digital/how-it-works'
        ];

        this.footerStyleA = styledRoutes.includes(event.urlAfterRedirects);

        const headerRoutes = [
          '/digital/power-card',
          '/digital/digital-business-card',
          '/digital/mini-website',
          '/digital/social-media-post',
          '/digital/faq',
          '/digital/price'
        ];

        this.headerRouteMatch = headerRoutes.includes(event.urlAfterRedirects);

        this.updateHeaderWidth();

        // Wait for rendering, then update scroll state
        requestAnimationFrame(() => {
          this.updateScrollState();
        });
      });

    // The initial navigation can finish before the NavigationEnd subscription is attached.
    this.scheduleCaptchaForRoute(this.router.url || '/');
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    requestAnimationFrame(() => {
      this.updateScrollState();
    });
  }

  /**
   * Single source of truth for header scroll state
   */
  private updateScrollState(): void {
    if (!this.isBrowser) return;

    const container = document.getElementById('website-container');

    if (!container) {
      this.isScrolled = false;
      this.cdr.markForCheck();
      return;
    }

    const scrolled = container.scrollTop > 50;

    if (this.isScrolled !== scrolled) {
      this.isScrolled = scrolled;
      this.cdr.markForCheck();
    }
  }

  triggerCaptchaForRoute(url: string): void {
    if (!this.isBrowser) return;

    const action = this.getCaptchaActionName(url);

    this.recaptchaService.getCaptcha(action).subscribe({
      next: () => {},
      error: (err: any) => console.warn('Captcha load failed for website route:', err)
    });
  }

  /**
   * reCAPTCHA is not needed to paint a page. Delaying it keeps its network and
   * JavaScript work out of the mobile FCP/LCP critical path.
   */
  private scheduleCaptchaForRoute(url: string): void {
    window.clearTimeout(this.captchaTimer);
    this.captchaTimer = window.setTimeout(() => this.triggerCaptchaForRoute(url), 3000);
  }

  private getCaptchaActionName(url: string): string {
    const cleanUrl = (url || '/').replace(/^\//, '').trim();
    const routeValue = cleanUrl || 'home';

    return `website_${routeValue.replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '')}`;
  }

  updateHeaderWidth(): void {
    if (!this.isBrowser) return;

    if (window.innerWidth <= 768) {
      this.headerWidth = false;
    } else {
      this.headerWidth = this.headerRouteMatch;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateHeaderWidth();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollState();
  }

  onContainerScroll(event: Event): void {
    if (!this.isBrowser) return;

    const target = event.target as HTMLElement;

    const scrolled = target.scrollTop > 50;

    if (this.isScrolled !== scrolled) {
      this.isScrolled = scrolled;
      this.cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    window.clearTimeout(this.captchaTimer);
  }
}
