import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContratComponent } from './view-contrat.component';

describe('ViewContratComponent', () => {
  let component: ViewContratComponent;
  let fixture: ComponentFixture<ViewContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewContratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
