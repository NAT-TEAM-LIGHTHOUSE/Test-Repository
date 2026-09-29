import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebsiteDigitalBusinessCardComponent } from './website-digital-business-card.component';

describe('WebsiteDigitalBusinessCardComponent', () => {
  let component: WebsiteDigitalBusinessCardComponent;
  let fixture: ComponentFixture<WebsiteDigitalBusinessCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteDigitalBusinessCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebsiteDigitalBusinessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
