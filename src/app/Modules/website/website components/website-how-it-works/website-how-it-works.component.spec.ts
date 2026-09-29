import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebsiteHowItWorksComponent } from './website-how-it-works.component';

describe('WebsiteHowItWorksComponent', () => {
  let component: WebsiteHowItWorksComponent;
  let fixture: ComponentFixture<WebsiteHowItWorksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteHowItWorksComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebsiteHowItWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
