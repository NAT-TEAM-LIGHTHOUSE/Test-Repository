import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KnowledgeCenterReadMoreBlogComponent } from './knowledge-center-read-more-blog.component';

describe('KnowledgeCenterReadMoreBlogComponent', () => {
  let component: KnowledgeCenterReadMoreBlogComponent;
  let fixture: ComponentFixture<KnowledgeCenterReadMoreBlogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowledgeCenterReadMoreBlogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KnowledgeCenterReadMoreBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
