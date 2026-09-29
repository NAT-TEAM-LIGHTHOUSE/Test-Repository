import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of, switchMap, map } from 'rxjs';
import { Login } from '../../../services/login';
import { Globalobjects } from '../../../services/globalobjects';


export const templateDataResolver: ResolveFn<any> = (route) => {
  const login = inject(Login);
  const globalObject = inject(Globalobjects);

  const slug = route.paramMap.get('slug');
  const suffix = route.paramMap.get('suffix');

  if (!slug) {
    return of(null);
  }

  const isPreview = suffix === 'preview';

  const wsdp: any = {
    template_id: slug
  };

  if (suffix && !isPreview) {
    wsdp.selected_templ_id = suffix;
  }

  return login.getCallTemplate(wsdp, 'callTemplate').pipe(

    switchMap((callResponse: any) => {

      if (
        !callResponse?.responseStatus?.includes('success') ||
        !callResponse.responseData?.[0]
      ) {
        return of({
          callResponse,
          detailResponse: null
        });
      }

      const templateParams = {
        ...callResponse.responseData[0]
      };


      // --------------------------------
      // Currency
      // --------------------------------

      const curSymbol = templateParams.cur_symbol;

      let curSymbolSign = '';

      if (curSymbol === 'INR') {
        curSymbolSign = '₹';
      } else if (
        curSymbol === 'usd' ||
        curSymbol === 'USD'
      ) {
        curSymbolSign = '$';
      } else if (
        curSymbol === 'CAD' ||
        curSymbol === 'cad'
      ) {
        curSymbolSign = 'C$';
      } else {
        curSymbolSign = '₹';
      }

      globalObject.setDataLocally(
        'cur_symbol_sign',
        curSymbolSign
      );


      // --------------------------------
      // tempDetails
      // --------------------------------

      const wslpvalue: any = {
        user_code: templateParams.user_code,
        user_name: templateParams.user_name
      };

      globalObject.setDataLocally(
        'tempDetails',
        JSON.stringify(wslpvalue)
      );


      // --------------------------------
      // DO NOT INCREMENT FOR PREVIEW
      // --------------------------------

      if (!isPreview) {
        login.getCallTemplate(
          {
            user_code: templateParams.user_code
          },
          'updateCount'
        ).subscribe();
      }


      // --------------------------------
      // Remove currency before
      // getTemplateStyledata
      // --------------------------------

      delete templateParams.cur_symbol;


      // --------------------------------
      // Get template details
      // --------------------------------

      return login
        .getTemplateData(
          templateParams,
          'getTemplateStyledata'
        )
        .pipe(
          map((detailResponse: any) => ({
            callResponse,
            detailResponse
          }))
        );
    })
  );
};