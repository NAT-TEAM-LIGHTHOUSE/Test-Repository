import { Routes } from '@angular/router';
import { WebsitePage } from './Modules/website/website/website.page';
import { WebsiteHomeComponent } from './Modules/website/website components/website-home/website-home.component';
import { slugMatcher } from './slug/slug.matcher';
import { TemplatePage } from './Modules/template/template/template.page';
import { templateDataResolver } from './Modules/template/template/template.resolver';

export const routes: Routes = [
   {
    matcher: slugMatcher,
    component: TemplatePage,
    resolve: { templateData: templateDataResolver },
  },
  {
        path: '',
    component: WebsitePage,
    children: [
      {
        path: '',
        component: WebsiteHomeComponent
      },


      {
        path: 'digital/power-card',
        loadComponent: () => import('./Modules/website/website components/website-power-card/website-power-card.component').then(m => m.WebsitePowerCardComponent)
      },
      {
        path: 'digital/community',
        loadComponent: () => import('./Modules/website/website components/website-community/website-community.component').then(m => m.WebsiteCommunityComponent)
      },
      {
        path: 'digital/digital-business-card',
        loadComponent: () => import('./Modules/website/website components/website-digital-business-card/website-digital-business-card.component').then(m => m.WebsiteDigitalBusinessCardComponent)
      },
      {
        path: 'digital/mini-website',
        loadComponent: () => import('./Modules/website/website components/mini-website/mini-website.component').then(m => m.MiniWebsiteComponent)
      },
      {
        path: 'digital/social-media-post',
        loadComponent: () => import('./Modules/website/website components/website-social-media-post/website-social-media-post.component').then(m => m.WebsiteSocialMediaPostComponent)
      },
      {
        path: 'digital/how-it-works',
        loadComponent: () => import('./Modules/website/website components/website-how-it-works/website-how-it-works.component').then(m => m.WebsiteHowItWorksComponent)
      },
      {
        path: 'digital/faq',
        loadComponent: () => import('./Modules/website/website components/website-faq/website-faq.component').then(m => m.WebsiteFaqComponent)
      },
      {
        path: 'digital/join-our-team',
        loadComponent: () => import('./Modules/website/website components/join-our-team/join-our-team.component').then(m => m.JoinOurTeamComponent)
      },
      {
        path: 'digital/power-ambassador',
        loadComponent: () => import('./Modules/website/website components/power-ambassador/power-ambassador.component').then(m => m.PowerAmbassadorComponent)
      },
      {
        path: 'digital/nfc-compatible-devices',
        loadComponent: () => import('./Modules/website/website components/nfc-compatibility/nfc-compatibility.component').then(m => m.NfcCompatibilityComponent)
      },
      {
        path: 'digital/price',
        loadComponent: () => import('./Modules/website/website components/price/price.component').then(m => m.PriceComponent)
      },
      {
        path: 'digital/contact',
        loadComponent: () => import('./Modules/website/website components/contact-us/contact-us.component').then(m => m.ContactUsComponent)
      },
      {
        path: 'digital/privacy-policy',
        loadComponent: () => import('./Modules/website/website components/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
      },
      {
        path: 'digital/terms-of-use',
        loadComponent: () => import('./Modules/website/website components/terms-of-use/terms-of-use.component').then(m => m.TermsOfUseComponent)
      },
      {
        path: 'digital/edit-profile-tutorials',
        loadComponent: () => import('./Modules/website/website components/edit-profile-tutorials/edit-profile-tutorials.component').then(m => m.EditProfileTutorialsComponent)
      },
      {
        path: 'digital/multiple-ways-to-share-your-pcards-profiles',
        loadComponent: () => import('./Modules/website/website components/share-multiple-pcard-profile-tutorials/share-multiple-pcard-profile-tutorials.component').then(m => m.ShareMultiplePcardProfileTutorialsComponent)
      },
      {
        path: 'digital/sales-executive',
        loadComponent: () => import('./Modules/website/website components/sales-executive/sales-executive.component').then(m => m.SalesExecutiveComponent)
      },
      {
        path: 'digital/sales-intern',
        loadComponent: () => import('./Modules/website/website components/sales-intern/sales-intern.component').then(m => m.SalesInternComponent)
      },
      {
        path: 'digital/hr-executive',
        loadComponent: () => import('./Modules/website/website components/hr-executive/hr-executive.component').then(m => m.HrExecutiveComponent)
      },
      {
        path: 'digital/video-editor',
        loadComponent: () => import('./Modules/website/website components/video-editor/video-editor.component').then(m => m.VideoEditorComponent)
      },
      {
        path: 'digital/graphics-designer',
        loadComponent: () => import('./Modules/website/website components/graphics-designer/graphics-designer.component').then(m => m.GraphicsDesignerComponent)
      },
      {
        path: 'digital/business-development-intern',
        loadComponent: () => import('./Modules/website/website components/business-development-intern/business-development-intern.component').then(m => m.BusinessDevelopmentInternComponent)
      },
      {
        path: 'digital/business-development-executive',
        loadComponent: () => import('./Modules/website/website components/business-development-executive/business-development-executive.component').then(m => m.BusinessDevelopmentExecutiveComponent)
      },
      {
        path: 'digital/drop-your-resume',
        loadComponent: () => import('./Modules/website/website components/drop-your-resume/drop-your-resume.component').then(m => m.DropYourResumeComponent)
      },
      {
        path: 'digital/blogs-details',
        loadComponent: () => import('./Modules/website/website components/blog-details/blog-details.component').then(m => m.BlogDetailsComponent)
      },

      {
        path: 'blogs/Knowledge-Center-Read-More-Blog/:slug',
        loadComponent: () => import('./Modules/website/website components/knowledge-center-read-more-blog/knowledge-center-read-more-blog.component').then(m => m.KnowledgeCenterReadMoreBlogComponent)
      },

      {
        path: 'blogs/Knowledge-Center',
        loadComponent: () => import('./Modules/website/website components/knowledge-center/knowledge-center.component').then(m => m.KnowledgeCenterComponent)
      },

      {
        path: 'blogs/entrepreneur-speaks',
        loadComponent: () => import('./Modules/website/website components/entrepreneur-speaks/entrepreneur-speaks.component').then(m => m.EntrepreneurSpeaksComponent)
      },

      {
        path: 'blogs/business-and-brands',
        loadComponent: () => import('./Modules/website/website components/business-and-brands/business-and-brands.component').then(m => m.BusinessAndBrandsComponent)
      },

      {
        path: 'blogs/startup-stories',
        loadComponent: () => import('./Modules/website/website components/startup-stories/startup-stories.component').then(m => m.StartupStoriesComponent)
      },

      {
        path: 'digital/about-us',
        loadComponent: () => import('./Modules/website/website components/about-us/about-us.component').then(m => m.AboutUsComponent)
      },




    ],
    
  },
  //  {
  //   matcher: slugMatcher,
  //   // loadComponent: () => import('./Modules/template/template/template.page').then(m => m.TemplatePage),
  //   component : TemplatePage,

  // },
  // {
  //   matcher: slugMatcher,
  //   // loadComponent: () => import('./Modules/template/template/template.page').then(m => m.TemplatePage),
  //   component : TemplatePage,
  //   resolve: { templateData: templateDataResolver },

  // },
  {
    path: 'active-template',
    loadComponent: () => import('./Modules/activetemplate/activetemplate.component').then(m => m.ActivetemplateComponent)
  
  },
  {
    path: '404',
    loadComponent: () => import('./pages/pagenotfound/pagenotfound.page').then( m => m.PagenotfoundPage)
  },
{
  path: '**',
  loadComponent: () =>
    import('./pages/pagenotfound/pagenotfound.page')
      .then(m => m.PagenotfoundPage)
}
];
