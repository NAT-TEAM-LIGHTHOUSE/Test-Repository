
// src/app/shared/seo.service.ts
import { Injectable, Inject, RendererFactory2, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class Seo {
    private renderer: Renderer2;
  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setTitle(t: string) { this.title.setTitle(t); }
 
  setMeta(tags: { keywords?: string; description?: string; ogTitle?: string; ogDescription?: string; ogImage?: string; ogUrl?: string; ogType?: string; robots?: string; }) {
    if (tags.description)   this.meta.updateTag({ name: 'description', content: tags.description });
    if (tags.ogType)        this.meta.updateTag({ property: 'og:type', content: tags.ogType }, "property='og:type'");
    if (tags.ogTitle)       this.meta.updateTag({ property: 'og:title', content: tags.ogTitle });
    if (tags.ogDescription) this.meta.updateTag({ property: 'og:description', content: tags.ogDescription });
    if (tags.ogImage)       this.meta.updateTag({ property: 'og:image', content: tags.ogImage });
    if (tags.ogUrl)         this.meta.updateTag({ property: 'og:url', content: tags.ogUrl });
    if (tags.robots)        this.meta.updateTag({ name: 'robots', content: tags.robots });
    // if(tags.ogTitle) this.meta.updateTag({ property: 'og:site_name', content: tags.ogTitle });
    if(tags.keywords) this.meta.updateTag({ name: 'keywords', content: tags.keywords });
    this.updateOgUpdatedTime();
  }


    updateOgUpdatedTime() {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const formatted = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear().toString().slice(-2)} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      this.meta.updateTag({ property: 'og:updated_time', content: formatted });
    }

  updateFavicon(faviconUrl: string) {
    if (!faviconUrl) return;

    const selector = "link#dynamic-favicon, link[rel='icon'], link[rel='shortcut icon'], link[rel='apple-touch-icon'], link[rel*='icon']";
    const links = Array.from(this.doc.querySelectorAll<HTMLLinkElement>(selector));

    if (links.length > 0) {
      links.forEach((link) => {
        link.href = faviconUrl;
      });
      return;
    }

    const link = this.doc.createElement('link');
    link.id = 'dynamic-favicon';
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = faviconUrl;
    this.renderer.appendChild(this.doc.head, link);
  }
  setCanonical(absUrl: string) {
    let link = this.doc.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) { link = this.doc.createElement('link'); link.rel = 'canonical'; this.doc.head.appendChild(link); }
    link.href = absUrl;
  }
  setJsonLd(obj: unknown, id = 'jsonld') {
    const prev = this.doc.getElementById(id); if (prev) prev.remove();
    const script = this.doc.createElement('script'); script.type = 'application/ld+json'; script.id = id;
    script.text = JSON.stringify(obj);
    this.doc.head.appendChild(script);
  }
}
