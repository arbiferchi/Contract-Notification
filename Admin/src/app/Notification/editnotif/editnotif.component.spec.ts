import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnotifComponent } from './editnotif.component';

describe('EditnotifComponent', () => {
  let component: EditnotifComponent;
  let fixture: ComponentFixture<EditnotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditnotifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditnotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
