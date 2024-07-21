import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-add-rates-modal',
  standalone: true,
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatDialogContent,
    MatDialogActions,
    MatNativeDateModule,
    MatDatepickerModule,],
  templateUrl: './add-rates-modal.component.html',
  styleUrl: './add-rates-modal.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AddRatesModalComponent {
  addRateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddRatesModalComponent>,
    private fb: FormBuilder
  ) {
    this.addRateForm = this.fb.group({
      name: ['', Validators.required],
      vehicleClass: ['', Validators.required],
      hourlyRate: ['', Validators.required],
      dailyRate: ['', Validators.required],
      weeklyRate: ['', Validators.required],
      monthlyRate: ['', Validators.required],
      effectiveHours: ['', Validators.required],
      effectiveDaysForWeek: ['', Validators.required],
      effectiveDaysForMonth: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      locations: this.fb.array([]) // Add logic to manage locations
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addRateForm.valid) {
      this.dialogRef.close(this.addRateForm.value);
    }
  }
}