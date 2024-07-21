import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRatesModalComponent } from './add-rates-modal.component';

describe('AddRatesModalComponent', () => {
  let component: AddRatesModalComponent;
  let fixture: ComponentFixture<AddRatesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRatesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
