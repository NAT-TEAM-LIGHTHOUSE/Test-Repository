import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
   {
    path: '',
    renderMode: RenderMode.Server
  },
     {
    path: ':templateId',
    renderMode: RenderMode.Server
  },
   {
    path: 'active-template',
    renderMode: RenderMode.Client
  },

  {
    path: '**',
    renderMode: RenderMode.Server
  },

];
