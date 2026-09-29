import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebsiteSocialMediaPostComponent } from './website-social-media-post.component';

describe('WebsiteSocialMediaPostComponent', () => {
  let component: WebsiteSocialMediaPostComponent;
  let fixture: ComponentFixture<WebsiteSocialMediaPostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteSocialMediaPostComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebsiteSocialMediaPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
