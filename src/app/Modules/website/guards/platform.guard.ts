import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Globalobjects } from '../../../services/globalobjects';


@Injectable({
  providedIn: 'root'
})
export class PlatformGuard implements CanActivate {
  constructor(private router: Router,private globalObject: Globalobjects) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const platform = Capacitor.getPlatform();
    let user: any = null;
    try {
      user = this.globalObject.getLocallData('appDetails');
      if (user) user = JSON.parse(user);
    } catch (e) { }
    const fromActiveTemplate = route.queryParamMap.get(' fromActiveTemplate ') === '1';
    if (state.url.includes('/active-template') || fromActiveTemplate) {

      this.globalObject.clearLocalData();
      return true;
    }
    else {
      if (user?.user_catg === 'pcard_admin') {
        this.router.navigate(['/admin/dashboard']);
        return false;
      }
    }
    // If admin user, redirect to admin dashboard
    // if (user?.user_catg === 'pcard_admin') {
    //   this.router.navigate(['/admin/dashboard']);
    //   return false;
    // }
    if (user?.user_catg === 'pcard_user') {
      // Client user, allow access
      this.router.navigate(['/client/home']);
      return false;
    }

    // if (platform === 'web') {
    //   return true;
    // }
    this.router.navigate(['/login']);
    return false;
  }
}
