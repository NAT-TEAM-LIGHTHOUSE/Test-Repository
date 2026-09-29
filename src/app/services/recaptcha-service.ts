import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

declare var grecaptcha: any;

@Injectable({
  providedIn: 'root',
})
export class RecaptchaService {

  private loaded = false;
  private scriptLoadPromise?: Promise<void>;
  private siteKey = '6LdMnl8tAAAAAFpYpQiTXLmkmMsYYCJFwtJy8j04';
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private loadScript(): Promise<void> {
    if (!this.isBrowser) {
      return Promise.resolve();
    }

    if (this.loaded || (window as any).grecaptcha) {
      this.loaded = true;
      return Promise.resolve();
    }

    if (this.scriptLoadPromise) {
      return this.scriptLoadPromise;
    }

    this.scriptLoadPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector<HTMLScriptElement>(
        'script#recaptcha-script, script[src*="google.com/recaptcha/api.js"]'
      );

      const onLoad = () => {
        this.loaded = true;
        resolve();
      };

      const onError = (error: ErrorEvent) => {
        this.scriptLoadPromise = undefined;
        reject(error);
      };

      if (existingScript) {
        existingScript.addEventListener('load', onLoad, { once: true });
        existingScript.addEventListener('error', onError, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
      script.async = true;
      script.defer = true;
      script.id = 'recaptcha-script';
      script.addEventListener('load', onLoad, { once: true });
      script.addEventListener('error', onError, { once: true });

      document.head.appendChild(script);
    });

    return this.scriptLoadPromise;
  }

  removeCaptchaScript(): void {
    if (!this.isBrowser) {
      return;
    }

    // Keep the badge/script loaded so the widget does not flicker while the site is active.
    this.loaded = true;
  }

  private async getRecaptchaToken(action: string): Promise<string> {
    if (!this.isBrowser) {
      return '';
    }

    await this.loadScript();

    return new Promise((resolve, reject) => {
      if (!(window as any).grecaptcha) {
        reject(new Error('reCAPTCHA is not available.'));
        return;
      }

      grecaptcha.ready(() => {
        grecaptcha.execute(this.siteKey, { action })
          .then((token: string) => resolve(token))
          .catch((error: any) => reject(error));
      });
    });
  }




//   getCaptcha(){
// http://192.168.100.143:9009/lhs_pcard/setGoogleCaptcha?token=check 
//   }



  getCaptcha(action: string): Observable<any> {
  if (!this.isBrowser) {
    return this.http.get<any>(`${this.baseUrl}/setGoogleCaptcha`);
  }
// ${this.baseUrl}
  return from(this.getRecaptchaToken(action)).pipe(
    switchMap((token: string) => {
      return this.http.get<any>(`${this.baseUrl}/setGoogleCaptcha`, {
        params: {
          token: token
        }
      });
    })
  );
}
  // getWebsiteData(type: string): Observable<any> {
  //   if (!this.isBrowser) {
  //     return this.http.get<any>(`${this.baseUrl}/getWebsiteData`, {
  //       params: {
  //         type,
  //       },
  //     });
  //   }

  //   return from(this.getRecaptchaToken('getWebsiteData')).pipe(
  //     switchMap(token => {
  //       return this.http.get<any>(`${this.baseUrl}/getWebsiteData`, {
  //         params: {
  //           type,
  //           token,
  //         },
  //       });
  //     }),
  //   );
  // }

}


// import { isPlatformBrowser } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { from, Observable, switchMap } from 'rxjs';
// import { environment } from 'src/environments/environment';

// declare var grecaptcha: any;

// @Injectable({
//   providedIn: 'root',
// })
// export class RecaptchaService {

//   private loaded = false;
//   private siteKey = '6LdMnl8tAAAAAFpYpQiTXLmkmMsYYCJFwtJy8j04';
//   private baseUrl = environment.baseUrl;

//   constructor(
//     private http: HttpClient,
//     @Inject(PLATFORM_ID) private platformId: Object
//   ) {}

//   private get isBrowser(): boolean {
//     return isPlatformBrowser(this.platformId);
//   }

//   private loadScript(): Promise<void> {

//     // Skip loading script during SSR
//     if (!this.isBrowser) {
//       return Promise.resolve();
//     }

//     return new Promise((resolve, reject) => {

//       if (this.loaded || (window as any).grecaptcha) {
//         this.loaded = true;
//         resolve();
//         return;
//       }

//       const existingScript = document.getElementById('recaptcha-script');

//       if (existingScript) {
//         existingScript.addEventListener('load', () => resolve());
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
//       script.async = true;
//       script.defer = true;
//       script.id = 'recaptcha-script';

//       script.onload = () => {
//         this.loaded = true;
//         resolve();
//       };

//       script.onerror = (err) => reject(err);

//       document.body.appendChild(script);
//     });
//   }

//   removeCaptchaScript(): void {

//     // Skip during SSR
//     // if (!this.isBrowser) {
//     //   return;
//     // }

//     const script = document.getElementById('recaptcha-script');

//     if (script) {
//       script.remove();
//     }

//     this.loaded = false;

//     delete (window as any).grecaptcha;

//     const badge = document.querySelector('.grecaptcha-badge');

//     if (badge) {
//       badge.remove();
//     }
//   }

//   private async getRecaptchaToken(action: string): Promise<string> {

//     // During SSR return empty token
//     if (!this.isBrowser) {
//       return '';
//     }

//     await this.loadScript();

//     return new Promise((resolve, reject) => {

//       grecaptcha.ready(() => {

//         grecaptcha
//           .execute(this.siteKey, { action })
//           .then((token: string) => {
//             this.removeCaptchaScript();
//             resolve(token);
//           })
//           .catch((err: any) => {
//             this.removeCaptchaScript();
//             reject(err);
//           });

//       });

//     });
//   }

//   getWebsiteData(type: string): Observable<any> {

//     // SSR: Call API without recaptcha token
//     if (!this.isBrowser) {
//       return this.http.get<any>(`${this.baseUrl}/getWebsiteData`, {
//         params: {
//           type
//         }
//       });
//     }

//     // Browser: Call API with recaptcha token
//     return from(this.getRecaptchaToken('getWebsiteData')).pipe(
//       switchMap(token =>
//         this.http.get<any>(`${this.baseUrl}/getWebsiteData`, {
//           params: {
//             type,
//             token
//           }
//         })
//       )
//     );
//   }
// }