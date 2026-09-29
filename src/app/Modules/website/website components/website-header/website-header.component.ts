

import { ChangeDetectorRef, Component, HostListener, OnInit, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Login } from '../../../../services/login';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Globalobjects } from '../../../../services/globalobjects';
declare const bootstrap: any;
@Component({
  selector: 'app-website-header',
  templateUrl: './website-header.component.html',
  styleUrls: ['./website-header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class WebsiteHeaderComponent implements OnInit,OnDestroy {

  pageCategories: any = [];
  @Input() wideMode = false;
  useContainer: boolean = false;

  // isAndroid:any;


  constructor( private router: Router, public globalObject: Globalobjects, private loginService: Login, private cdr: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.loadPageCategories();

    // console.log('Header init');

// if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
//   this.isAndroid = true;
// } else {
//   this.isAndroid = false;
// }



    this.setFlag();


  }

  ngOnDestroy(): void {
  }
  setFlag() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        const url = (e.urlAfterRedirects || '').toString();
        this.useContainer = url.includes('active-template');

        // console.log('URL:', url);
        // console.log('useContainer:', this.useContainer);
        // console.log('wideMode:', this.wideMode);
      });
  }


  private loadPageCategories(): void {
    this.loginService.getWebsiteData('pagecategory').subscribe({
      next: (res: any) => {
        if (res.responseStatus && res.responseStatus.includes('success')) {
          // const body = res.responseData as any[];
          if (res.responseData) {
            this.pageCategories = (res.responseData || []).map((pc: any) => ({
              ...pc,
              route: this.normalizeRoute(pc.route)
            }));
            this.cdr.markForCheck();
          }
          // console.log(this.pageCategories);
          // alert(this.pageCategories);


          // this.pageCategories = body.map((c: any) => {
          //   console.log()
          //   const name = c.ad_mcategoryname as string;

          //   let route = '';
          //   switch (name.toLowerCase()) {
          //     case 'homes':
          //       route = 'home';
          //       break;
          //     case 'power card':
          //       route = 'power-card';
          //       break;
          //     case 'community':
          //       route = 'community';
          //       break;
          //     default:
          //       route = ''; // or map others if you add more
          //   }

          //   return { name, route };
          // }).filter(pc => pc.route); // keep only mapped ones
        }
      },
      error: (err: any) => console.error('Error fetching pagecategory: ', err),
    });
  }


  closeNavbar() {
    const navbar = document.getElementById('navbarSupportedContent');
    if (navbar) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbar) || new bootstrap.Collapse(navbar, { toggle: false });

      bsCollapse.hide();
    }
  }

  private normalizeRoute(route?: string): string {
    if (!route) {
      return '/';
    }

    return route.startsWith('/') ? route : `/${route}`;
  }

}
