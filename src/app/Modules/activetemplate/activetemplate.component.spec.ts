import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivetemplateComponent } from './activetemplate.component';

describe('ActivetemplateComponent', () => {
  let component: ActivetemplateComponent;
  let fixture: ComponentFixture<ActivetemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ActivetemplateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivetemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
