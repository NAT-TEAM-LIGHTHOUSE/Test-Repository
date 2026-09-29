import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessDevelopmentInternComponent } from './business-development-intern.component';

describe('BusinessDevelopmentInternComponent', () => {
  let component: BusinessDevelopmentInternComponent;
  let fixture: ComponentFixture<BusinessDevelopmentInternComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDevelopmentInternComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessDevelopmentInternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
