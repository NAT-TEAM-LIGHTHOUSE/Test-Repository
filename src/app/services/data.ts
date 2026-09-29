import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Data {
public baseUrl = environment.baseUrl;


    constructor(private http:HttpClient) { }

  postData(requestData:any,url:any):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${url}`, requestData);
  }


  getKey() {
    return this.http.post(`${this.baseUrl}/get-key`, {}, { responseType: 'text' });
  }


  getImage(imageName: string): Observable<Blob> {
  return this.http.get(`${this.baseUrl}/viewImage/${imageName}`, {
    responseType: 'blob'
  });
}



  // getDesignById(srNo: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/get/${srNo}`);
  // }

  // deleteDesign(srNo: number): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/delete/${srNo}`,{ responseType: 'text' });
  // }

  // getSubCategoriesByParentCategory(parentCategory: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/subcategories/${parentCategory}`);
  // }

  
// getStatesList() {
//   return this.http.get<any>(`${this.baseUrl}/states`);
// }
  // getParentList() : Observable<any[]>{
  // return this.http.get<any[]>(`${this.baseUrl}/getParentCategories`);
  // }
//  getSubCategories(parentVal: any) : Observable<any[]>{
    
//   return this.http.get<any[]>(`${this.baseUrl}/getSubCategoriesSlider/${parentVal}`);
//   }
 
  //   getCountryList() : Observable<any[]>{
  // return this.http.get<any[]>(`${this.baseUrl}/getCountryName`);
  // }
  
//   checkRoleExists(roleName: string): Observable<boolean> {
//   return this.http.get<boolean>(`${this.baseUrl}/api/checkRoleExists?roleName=${encodeURIComponent(roleName)}`);
// }



// getEventImage(data:any){
//   return this.http.post('https://ai.lighthouseindia.com/pcard/generate-image',data);
// }
 // getCountries() {
  //   return this.http.get<any>('https://countriesnow.space/api/v0.1/countries/positions');
  // }

  // getStates(country: string) {
  //   return this.http.post<any>('https://countriesnow.space/api/v0.1/countries/states', {
  //     country
  //   });
  // }

  //  getImageBySrNo(srNo: number) {
  //   console.log("srNo.................."+srNo)
  //   return this.http.get(`${this.baseUrl}/viewImage/${srNo}`, {
  //     responseType: 'blob' 
  //   });
  // }
//   getAllSubCategoryDesigns(): Observable<any[]> {
//   return this.http.get<any[]>(`${this.baseUrl}/getAllEventSubCategories`);
// }


  // getCities(country: string, state: string) {
  //   return this.http.post<any>('https://countriesnow.space/api/v0.1/countries/state/cities', {
  //     country,
  //     state
  //   });
  // }

  // getAllDesigns(): Observable<any[]> {
  // return this.http.get<any[]>(`${this.baseUrl}/getAllDesigns`);

  // }

  ////////////////////////////payment


  
  // createOrder(amount: number) {
  //   return this.http.post(`${this.baseUrl}/create-order?amount=${amount}`, {}, { responseType: 'text' });
  // }

// createOrder(amount: number,currency:any,aid:any,package_price :any) {
//     return this.http.post(`${this.baseUrl}/create-order?amount=${amount}&currency=${currency}&aid=${aid}&pc=${package_price}`, {}, { responseType: 'text' });
//   }  

  //  fetchPayData(paymentId: any): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/fetch-payment/${paymentId}`);
  // }
///////////////////////////////////////////////////////////////////////////////////

// updateDesignStatus(id: number, status: string): Observable<any> {
//   return this.http.put(`${this.baseUrl}/updateDesignStatus/${id}?status=${status}`, {});
// }

// deleteEventSubCategoryDesign(srNo: number): Observable<any> {
//   return this.http.delete(`${this.baseUrl}/deleteEventSubCategoryDesign/${srNo}`,{ responseType: 'text' });
// }



}
