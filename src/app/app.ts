import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from '../environments/environment';
import { CanonicalService } from './services/canonical';
import { Globalobjects } from './services/globalobjects';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('website');

     constructor(
    private router: Router, private canonical: CanonicalService,
  ) {

    
       
    // alert(this.globalObject.websiteUrl);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const canonicalUrl =   environment.assetUrl + event.urlAfterRedirects;

        this.canonical.setCanonicalURL(canonicalUrl);

      
      });
  }
  
}
