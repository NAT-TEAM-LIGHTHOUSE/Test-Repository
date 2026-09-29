import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareMultiplePcardProfileTutorialsComponent } from './share-multiple-pcard-profile-tutorials.component';

describe('ShareMultiplePcardProfileTutorialsComponent', () => {
  let component: ShareMultiplePcardProfileTutorialsComponent;
  let fixture: ComponentFixture<ShareMultiplePcardProfileTutorialsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareMultiplePcardProfileTutorialsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareMultiplePcardProfileTutorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
