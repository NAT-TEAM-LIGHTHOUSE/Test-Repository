import { AfterViewInit, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { RouterLink } from '@angular/router';
import { WebsiteSeoSyncService } from '../../../../services/website-seo-sync.service';
import { Globalobjects } from '../../../../services/globalobjects';
import { Login } from '../../../../services/login';
@Component({
  selector: 'app-website-community',
  templateUrl: './website-community.component.html',
  styleUrls: ['./website-community.component.scss'],
  standalone: true,
  imports: [CommonModule , RouterLink]
})
export class WebsiteCommunityComponent implements OnInit, AfterViewInit,OnDestroy {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private loginService: Login, private websiteSeoSyncService: WebsiteSeoSyncService,private globalObject : Globalobjects) { }
websiteUrl :any
  ngOnInit() {
    this.websiteUrl = this.globalObject.websiteUrl;
    this.loadBlogcategory();
    this.websiteSeoSyncService.applySeoByPageName('community');
    
  }

  ngAfterViewInit() {
      if (!isPlatformBrowser(this.platformId)) {
    return;
  }
    // Open default tab after view is loaded
    const defaultTab = document.getElementById('defaultOpen');
    defaultTab?.dispatchEvent(new Event('click'));
  }


  ngOnDestroy(): void {
  }
  openCity(event: Event, cityName: string) {
    // Hide all tabs
    const tabcontent = document.querySelectorAll<HTMLElement>('.tabcontent');
    tabcontent.forEach(tab => (tab.style.display = 'none'));

    // Remove active class from all links
    const tablinks = document.querySelectorAll<HTMLElement>('.tablinks');
    tablinks.forEach(link => link.classList.remove('active'));

    // Show selected tab
    const tab = document.getElementById(cityName);
    if (tab) tab.style.display = 'block';

    // Add active to clicked tab button
    const target = event.currentTarget as HTMLElement;
    target?.classList.add('active');
  }


















  blogs: any[] = [];




loadBlogcategory(): void {
  this.loginService.getWebsiteData('blogcategory').subscribe({
    next: (res: any) => {
      console.log('blogs res: ', res);

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
          slug: b.slug_name
        }));
      }
    },
    error: (err) => {
      console.error('Error fetching blogs: ', err);
    }
  });
}

navigateToLogin() {
  window.location.href = this.globalObject.urlNew + '/login';
}

}
