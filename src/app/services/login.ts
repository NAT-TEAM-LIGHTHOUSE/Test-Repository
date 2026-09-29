import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { from, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
declare var grecaptcha: any;
@Injectable({
  providedIn: 'root',
})
export class Login {
  public baseUrl = environment.baseUrl;



  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  set_admin_pcard_usercode: any;//

  postData(requestData: any, url: string) {
    // 

    if (requestData?.wslp) {
      requestData.wslp.log_id = this.generateSixDigitNumber();

      if (this.set_admin_pcard_usercode) {
        requestData.wslp.user_code = this.set_admin_pcard_usercode;
        if (requestData.wsdp) {
          requestData.wsdp.team_code = this.set_admin_pcard_usercode;
        }
      }
    }

    return this.http.post<any>(`${this.baseUrl}/${url}`, requestData);
  }



  getWebsiteData(type: string): Observable<any> {
    // 
    return this.http.get<any>(`${this.baseUrl}/getWebsiteData`, {
      params: { type }
    });
  }



  getTestimonials(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getWebsiteData?type=testimonial`);
  }

  generateSixDigitNumber(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

 
  getKey() {
    
    return this.http.post(`${this.baseUrl}/get-key`, {}, { responseType: 'text' });
  }

  fetchPayData(paymentId: any) {
    
    return this.http.get(`${this.baseUrl}/fetch-payment/${paymentId}`);
  }

 

  getImage(imageName: string): Observable<Blob> {
    
    return this.http.get(`${this.baseUrl}/viewImage/${imageName}`, { responseType: 'blob' });
  }


 
  //----------------------------------------
  // Template API
  //----------------------------------------

  getCallTemplate(params: any, url: string) {
    console.log("In service params",params);

    // 
    return this.http.get(`${this.baseUrl}/${url}`, { params });
  }

  getTemplateData(params: any, url: string) {
    // 
    return this.http.get(`${this.baseUrl}/${url}`, { params });
  }
  uploadResume(file: File, requestData: any) {

    const formData = new FormData();

    formData.append('file', file);

    formData.append(
      'requestData',
      new Blob([JSON.stringify(requestData)], { type: 'application/json' })
    );
    
    return this.http.post(this.baseUrl + "/upload-resume", formData);
  }

  getBlogsData(): Observable<any[]> {
    // 
    return this.http.get<any[]>(this.baseUrl + "/getWebPageData?serviceType=power_stories&wid=1");
  }

  getData(params: any, url: string) {
    // console.log("In service params",params);
    // 
    return this.http.get(`${this.baseUrl}/${url}`, { params });
  }

  // getPostData(requestData: any, url: string) {
  //   // 
  //   return this.http.post<any>(`${url}`, requestData);
  // }


//  getCountries() {
    
//     return this.http.get('https://countriesnow.space/api/v0.1/countries/positions');
//   }

//   getStates(country: string) {
    
//     return this.http.post('https://countriesnow.space/api/v0.1/countries/states', { country });
//   }

//   getCities(country: string, state: string) {
    
//     return this.http.post('https://countriesnow.space/api/v0.1/countries/state/cities', { country, state });
//   }
 
  
    // getSubCategoriesByParentCategory(parentCategory: string): Observable<any[]> {
  //   
  //   return this.http.get<any[]>(`${this.baseUrl}/subcategories/${parentCategory}`);
  // }

  // getSubCategories(parentVal: string): Observable<any[]> {
  //   
  //   return this.http.get<any[]>(`${this.baseUrl}/getSubCategoriesSlider/${parentVal}`);
  // }

  // getCountryList(): Observable<any[]> {
  //   
  //   return this.http.get<any[]>(`${this.baseUrl}/getCountryName`);
  // }

  // getTempalteMsgList(): Observable<any[]> {
  //   
  //   return this.http.get<any[]>(`${this.baseUrl}/getTempalteMsgList`);
  // }

  // checkRoleExists(roleName: string): Observable<boolean> {
  //   
  //   return this.http.get<boolean>(`${this.baseUrl}/api/checkRoleExists?roleName=${encodeURIComponent(roleName)}`);
  // }
   // getWebsiteData(type: string): Observable<any> {

//   return from(this.getRecaptchaToken('getWebsiteData')).pipe(

//     switchMap(token => {

//       return this.http.get<any>(`${this.baseUrl}/getWebsiteData`, {
//         params: {
//           type,
//           token
//         }
//       });

//     })

//   );

// }

  //----------------------------------------
  // SSR-SAFE SET URL
  //----------------------------------------
  // private setUrl() {
  //   // if (isPlatformBrowser(this.platformId)) {
  //   //   const scopeUrl = sessionStorage.getItem('scope_url');
  //   //   console.log('Scope URL from sessionStorage:', scopeUrl);
  //   //   if (scopeUrl) this.baseUrl = scopeUrl;
  //   // }
  // }

  //----------------------------------------
  // SSR-SAFE TOKEN ACCESS
  //----------------------------------------
  // getToken(): string | null {
  //   if (!isPlatformBrowser(this.platformId)) return null;

  //   const platform = Capacitor.getPlatform();

  //   return platform === 'android' || platform === 'ios'
  //     ? localStorage.getItem('token')
  //     : sessionStorage.getItem('token');
  // }

  // logout(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     // localStorage.removeItem('token');
  //     sessionStorage.removeItem('token');
  //   }
  // }

  // logout(): void {
  //   if (!isPlatformBrowser(this.platformId)) return;

  //   const platform = Capacitor.getPlatform();

  //   if (platform === 'android' || platform === 'ios') {
  //     localStorage.removeItem('token');
  //   } else {
  //     sessionStorage.removeItem('token');
  //   }
  // }
  //----------------------------------------
  // API CALLS (All SSR-safe)
  //----------------------------------------

  // getAllSubCategoryDesigns(): Observable<any[]> {
  //   
  //   return this.http.get<any[]>(`${this.baseUrl}/getAllEventSubCategories`);
  // }

  // getImageBySrNo(srNo: number): Observable<Blob> {
  //   
  //   return this.http.get(`${this.baseUrl}/viewImage/${srNo}`, { responseType: 'blob' });
  // }

  // getAllDesigns(): Observable<any[]> {
  //   
  //   return this.http.get<any[]>(`${this.baseUrl}/getAllDesigns`);
  // }

  // createOrder(amount: number) {
  //   
  //   return this.http.post(`${this.baseUrl}/create-order?amount=${amount}`, {}, { responseType: 'text' });
  // }
  // getParentProfessionList(): Observable<any[]> {
    
  //   return this.http.get<any[]>(`${this.baseUrl}/getParentProfession`);
  // }


    // updateDesignStatus(id: number, status: string): Observable<any> {
    
  //   return this.http.put(`${this.baseUrl}/updateDesignStatus/${id}?status=${status}`, {});
  // }

  // deleteEventSubCategoryDesign(srNo: number): Observable<any> {
    
  //   return this.http.delete(`${this.baseUrl}/deleteEventSubCategoryDesign/${srNo}`, { responseType: 'text' });
  // }
  // getDesignById(srNo: number) {
    
  //   return this.http.get(`${this.baseUrl}/get/${srNo}`);
  // }

  // deleteDesign(srNo: number) {
    
  //   return this.http.delete(`${this.baseUrl}/delete/${srNo}`, { responseType: 'text' });
  // }



  // getTags(): Observable<any[]> {
    
  //   return this.http.get<any[]>(`${this.baseUrl}/getTags`);
  // }

  // getStatesList() {
    
  //   return this.http.get<any>(`${this.baseUrl}/states`);
  // }

  // getParentList(): Observable<any[]> {
    
  //   return this.http.get<any[]>(`${this.baseUrl}/getParentCategories`);
  // }





  // exportCommonEnquiry(obj: any, url: string): Observable<Blob> {
    
  //   return this.http.post(`${this.baseUrl}/${url}`, obj, { responseType: 'blob' });
  // }

}

