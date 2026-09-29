import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterEvent, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { WebsitePage } from './website.page';
import { RecaptchaService } from '../../../services/recaptcha-service';

describe('WebsitePage', () => {
  let component: WebsitePage;
  let fixture: ComponentFixture<WebsitePage>;
  let recaptchaService: jasmine.SpyObj<RecaptchaService>;
  let router: Router;

  beforeEach(() => {
    recaptchaService = jasmine.createSpyObj('RecaptchaService', ['getCaptcha']);
    recaptchaService.getCaptcha.and.returnValue(of({ responseStatus: 'success' }));

    TestBed.configureTestingModule({
      imports: [WebsitePage],
      providers: [
        provideRouter([]),
        { provide: RecaptchaService, useValue: recaptchaService }
      ]
    });

    fixture = TestBed.createComponent(WebsitePage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger captcha when the website route changes', () => {
    const navigationEndEvent = {
      urlAfterRedirects: '/digital/community'
    } as RouterEvent;

    spyOn(router.events, 'pipe').and.callThrough();
    spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

    component.ngOnInit();
    (router.events as any).next?.(navigationEndEvent);

    expect(recaptchaService.getCaptcha).toHaveBeenCalledWith('website_digital_community');
  });
});
