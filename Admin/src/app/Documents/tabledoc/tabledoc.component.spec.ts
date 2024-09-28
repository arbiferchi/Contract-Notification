import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabledocComponent } from './tabledoc.component';

describe('TabledocComponent', () => {
  let component: TabledocComponent;
  let fixture: ComponentFixture<TabledocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabledocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabledocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
