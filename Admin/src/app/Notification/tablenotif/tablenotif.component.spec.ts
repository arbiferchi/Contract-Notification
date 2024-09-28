import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablenotifComponent } from './tablenotif.component';

describe('TablenotifComponent', () => {
  let component: TablenotifComponent;
  let fixture: ComponentFixture<TablenotifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablenotifComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablenotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
