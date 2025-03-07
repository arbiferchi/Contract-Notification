import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContratComponent } from './list-contrat.component';

describe('ListContratComponent', () => {
  let component: ListContratComponent;
  let fixture: ComponentFixture<ListContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListContratComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
