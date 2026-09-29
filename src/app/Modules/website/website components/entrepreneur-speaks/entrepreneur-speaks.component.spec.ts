import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntrepreneurSpeaksComponent } from './entrepreneur-speaks.component';

describe('EntrepreneurSpeaksComponent', () => {
  let component: EntrepreneurSpeaksComponent;
  let fixture: ComponentFixture<EntrepreneurSpeaksComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrepreneurSpeaksComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntrepreneurSpeaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
