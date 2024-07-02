import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-add-vehicle-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule // Add ReactiveFormsModule to imports
  ],
  templateUrl: './add-vehicle-modal.component.html',
  styleUrls: ['./add-vehicle-modal.component.css']
})
export class AddVehicleModalComponent {
  addVehicleForm: FormGroup;

  vehicleControls = [
    { name: 'vehicleNumber', label: 'Vehicle Number' },
    { name: 'licensePlates', label: 'License Plates' },
    { name: 'class', label: 'Class' },
    { name: 'type', label: 'Type' },
    { name: 'brand', label: 'Brand' },
    { name: 'model', label: 'Model' },
    { name: 'year', label: 'Year' },
    { name: 'status', label: 'Initial Status' },
    { name: 'owningLocation', label: 'Owning Location' },
    { name: 'currentLocation', label: 'Current Location' },
    { name: 'purchaseCost', label: 'Purchase Cost' },
    { name: 'purchaseDate', label: 'Purchase Date' },
    { name: 'soldDate', label: 'Sold Date (optional)' },
    { name: 'soldPrice', label: 'Sold Price (optional)' }
  ];

  constructor(
    private dialogRef: MatDialogRef<AddVehicleModalComponent>,
    private fb: FormBuilder
  ) {
    this.addVehicleForm = this.fb.group({
      vehicleNumber: ['', Validators.required],
      licensePlates: ['', Validators.required],
      class: ['', Validators.required],
      type: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      status: ['', Validators.required],
      owningLocation: ['', Validators.required],
      currentLocation: ['', Validators.required],
      purchaseCost: ['', Validators.required],
      purchaseDate: ['', Validators.required],
      soldDate: [''],
      soldPrice: ['']
    });
  }

  onSubmit() {
    if (this.addVehicleForm.valid) {
      this.dialogRef.close(this.addVehicleForm.value);
    }
  }
}