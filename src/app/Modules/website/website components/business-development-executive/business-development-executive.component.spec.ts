import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessDevelopmentExecutiveComponent } from './business-development-executive.component';

describe('BusinessDevelopmentExecutiveComponent', () => {
  let component: BusinessDevelopmentExecutiveComponent;
  let fixture: ComponentFixture<BusinessDevelopmentExecutiveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDevelopmentExecutiveComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessDevelopmentExecutiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
