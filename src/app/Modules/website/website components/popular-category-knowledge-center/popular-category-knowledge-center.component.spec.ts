import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopularCategoryKnowledgeCenterComponent } from './popular-category-knowledge-center.component';

describe('PopularCategoryKnowledgeCenterComponent', () => {
  let component: PopularCategoryKnowledgeCenterComponent;
  let fixture: ComponentFixture<PopularCategoryKnowledgeCenterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularCategoryKnowledgeCenterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopularCategoryKnowledgeCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
