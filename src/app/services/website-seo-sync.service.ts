import { Injectable } from '@angular/core';
import { Seo } from './seo';
import { HttpClient } from '@angular/common/http';
import { Login } from './login';

@Injectable({ providedIn: 'root' })
export class WebsiteSeoSyncService {
  constructor(
    private seo: Seo,
    private http : HttpClient,private loginService: Login
  ) {}

  // Call this from each component ngOnInit when that component is opened
  applySeoByPageName(pageName: string): void {
    const cleanPageName = (pageName || '').trim() || 'Home';
    // const cleanPath = (routePath || '/').split('?')[0].split('#')[0] || '/';

    // Payload for backend SEO API
    const reqData: any = {
      wsdp: {
        Page_name: cleanPageName
      }
    };

    // Dynamic URL (current behavior)
    this.loginService.postData(reqData, 'getSeoByPage').subscribe({
    // Testing URL (use this during local testing if needed):
   // this.http.post('http://192.168.101.179:9009/lhs_pcard/getSeoByPage', reqData).subscribe({
      next: (res: any) => {
        // Guard: update meta only when API returns success with data
        if (res?.responseStatus !== 'success' || !res?.responseData) {
          console.warn('SEO API did not return success payload:', res);
          return;
        }

        const seoData = res.responseData;
        const title = seoData.ad_seoname || cleanPageName;
        const description = seoData.seo_desc || '';
        const keywords = seoData.ad_keyword || '';

        this.seo.setTitle(title);

        // Update description/keywords + OG tags
        this.seo.setMeta({
          description,
          keywords,
          ogType: 'website',
          ogTitle: title,
          ogDescription: description
        });
      },
      error: (err) => {
        console.error('SEO API error:', err);
      }
    });
  }

  // Optional helper: if needed, derive page_name from route URL
  getPageNameFromUrl(url: string): string {
    if (!url || url === '/') return 'Home';
    const parts = url.split('/').filter(Boolean);
    const last = parts[parts.length - 1] || 'Home';
    return last.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
