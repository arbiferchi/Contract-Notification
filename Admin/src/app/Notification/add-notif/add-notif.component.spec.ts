import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotifComponent } from './add-notif.component';

describe('AddNotifComponent', () => {
  let component: AddNotifComponent;
  let fixture: ComponentFixture<AddNotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNotifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
