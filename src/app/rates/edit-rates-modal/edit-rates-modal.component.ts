import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-rates-modal',
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
    MatDatepickerModule,
  ],
  templateUrl: './edit-rates-modal.component.html',
  styleUrls: ['./edit-rates-modal.component.css']
})
export class EditRateModalComponent {
  editRateForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditRateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    const rate = data.rate;
    this.editRateForm = this.fb.group({
      name: [rate.name, Validators.required],
      vehicleClass: [rate.vehicleClass, Validators.required],
      hourlyRate: [rate.hourlyRate, Validators.required],
      dailyRate: [rate.dailyRate, Validators.required],
      weeklyRate: [rate.weeklyRate, Validators.required],
      monthlyRate: [rate.monthlyRate, Validators.required],
      effectiveHours: [rate.effectiveHours, Validators.required],
      effectiveDaysForWeek: [rate.effectiveDaysForWeek, Validators.required],
      effectiveDaysForMonth: [rate.effectiveDaysForMonth, Validators.required],
      startDate: [rate.startDate, Validators.required],
      endDate: [rate.endDate, Validators.required],
      locations: this.fb.array(rate.locations) // Manage locations as needed
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.editRateForm.valid) {
      this.dialogRef.close(this.editRateForm.value);
    }
  }

  onDelete(): void {
    // Handle deletion logic here
    this.dialogRef.close({ delete: true });
  }
}