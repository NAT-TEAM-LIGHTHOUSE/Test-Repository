// canonical.service.ts
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setCanonicalURL(url: string) {
    let link: HTMLLinkElement =
      this.document.querySelector("link[rel='canonical']") ||
      this.document.createElement('link');

    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);

    if (!link.parentNode) {
      this.document.head.appendChild(link);
    }
  }
}
