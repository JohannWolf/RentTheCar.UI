import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRatesModalComponent } from './edit-rates-modal.component';

describe('EditRatesModalComponent', () => {
  let component: EditRatesModalComponent;
  let fixture: ComponentFixture<EditRatesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRatesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
